"use client";

import { useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import * as z from "zod/mini";

import { buttonVariants } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fillTemplate, whatsappUrl } from "@/lib/contato";
import { cn } from "@/lib/utils";

type FieldName = "nome" | "negocio" | "bairro" | "mensagem";
type RequiredField = Exclude<FieldName, "mensagem">;
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
type Status = { kind: "idle" } | { kind: "invalido" } | { kind: "sem-numero" } | { kind: "enviado"; url: string };

type ContactFormProps = {
  titulo: readonly [string, string];
  frase: string;
  previa: { readonly rotulo: string; readonly vazio: Readonly<Record<RequiredField, string>> };
  campos: Readonly<Record<FieldName, { readonly label: string; readonly placeholder: string }>>;
  erros: Readonly<Record<RequiredField | "longo" | "resumo", string>>;
  modelo: string;
  enviar: string;
  sucesso: string;
  sucessoLink: string;
  semNumero: string;
  whatsapp: string | null;
};

const FIELDS: readonly FieldName[] = ["nome", "negocio", "bairro", "mensagem"];
const LIMITS: Readonly<Record<FieldName, number>> = { nome: 80, negocio: 80, bairro: 60, mensagem: 1000 };
const EMPTY: Values = { nome: "", negocio: "", bairro: "", mensagem: "" };
const AUTOCOMPLETE: Partial<Record<FieldName, string>> = { nome: "name", negocio: "organization" };
const LETTER = /\p{L}/u;
const FIELD_CLASS = "border-2 border-current bg-transparent text-inherit placeholder:text-(color:--field-1-muted)";

function buildSchema(erros: ContactFormProps["erros"]) {
  const limit = (name: FieldName) =>
    z.maxLength(LIMITS[name], fillTemplate(erros.longo, { max: String(LIMITS[name]) }));
  const required = (name: RequiredField) =>
    z.string().check(z.trim(), z.minLength(2, erros[name]), z.regex(LETTER, erros[name]), limit(name));
  return z.object({
    nome: required("nome"),
    negocio: required("negocio"),
    bairro: required("bairro"),
    mensagem: z.string().check(z.trim(), limit("mensagem")),
  });
}

function issuesToErrors(issues: readonly { path: readonly PropertyKey[]; message: string }[]): Errors {
  const errors: Errors = {};
  for (const issue of issues) {
    const field = issue.path[0];
    if (typeof field === "string" && FIELDS.includes(field as FieldName) && !errors[field as FieldName]) {
      errors[field as FieldName] = issue.message;
    }
  }
  return errors;
}

function buildMessage(modelo: string, values: Values): string {
  const intro = fillTemplate(modelo, values);
  return values.mensagem ? `${intro}\n\n${values.mensagem}` : intro;
}

function previewNodes(modelo: string, values: Values, vazio: ContactFormProps["previa"]["vazio"]): ReactNode[] {
  return modelo.split(/(\{\w+\})/).map((part, index) => {
    const key = /^\{(\w+)\}$/.exec(part)?.[1] as RequiredField | undefined;
    if (!key) return part;
    const value = values[key]?.trim();
    return (
      value || (
        <span key={index} className="text-muted-foreground">
          {vazio[key]}
        </span>
      )
    );
  });
}

export function ContactForm(props: ContactFormProps) {
  const { titulo, frase, previa, campos, erros, modelo, enviar, sucesso, sucessoLink, semNumero, whatsapp } = props;
  const schema = useMemo(() => buildSchema(erros), [erros]);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const fieldRefs = useRef<Partial<Record<FieldName, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const mensagem = values.mensagem.trim();

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = event.target.name as FieldName;
    const next = { ...values, [name]: event.target.value };
    setValues(next);
    // O link de reenvio carrega o texto antigo; qualquer edição o invalida.
    if (status.kind === "enviado" || status.kind === "sem-numero") setStatus({ kind: "idle" });
    if (!errors[name]) return;
    const result = schema.safeParse(next);
    const nextErrors = { ...errors, [name]: result.success ? undefined : issuesToErrors(result.error.issues)[name] };
    setErrors(nextErrors);
    if (!FIELDS.some((field) => nextErrors[field])) setStatus({ kind: "idle" });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const next = issuesToErrors(result.error.issues);
      setErrors(next);
      setStatus({ kind: "invalido" });
      const first = FIELDS.find((name) => next[name]);
      if (first) fieldRefs.current[first]?.focus();
      return;
    }
    setErrors({});
    if (!whatsapp) {
      setStatus({ kind: "sem-numero" });
      return;
    }
    const url = whatsappUrl(whatsapp, buildMessage(modelo, result.data));
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus({ kind: "enviado", url });
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-labelledby="contato-title" className="coupon on-field-1">
      <div className="coupon__stub grid content-between gap-s6">
        <h2 id="contato-title" className="m-0 text-lead leading-[1.05] font-normal tracking-(--tracking-display)">
          {titulo[0]}
          <br />
          {titulo[1]}
        </h2>
        <figure className="m-0 grid gap-s2">
          <figcaption className="text-small">{previa.rotulo}</figcaption>
          <p className="coupon__preview m-0 bg-background p-4 whitespace-pre-line text-foreground">
            {previewNodes(modelo, values, previa.vazio)}
            {mensagem ? `\n\n${mensagem}` : null}
          </p>
        </figure>
        <p className="m-0 max-w-[36ch] text-small">{frase}</p>
      </div>

      <div className="coupon__perf" aria-hidden="true">
        <span />
      </div>

      <div className="coupon__fields grid content-start gap-s5">
        <FieldGroup>
          {FIELDS.map((name) => {
            const id = `contato-${name}`;
            const errorId = `${id}-erro`;
            const shared = {
              id,
              name,
              value: values[name],
              onChange: handleChange,
              placeholder: campos[name].placeholder,
              maxLength: LIMITS[name],
              required: name !== "mensagem",
              className: FIELD_CLASS,
              "aria-invalid": errors[name] ? true : undefined,
              "aria-describedby": errors[name] ? errorId : undefined,
            };
            return (
              <Field key={name}>
                <FieldLabel htmlFor={id}>{campos[name].label}</FieldLabel>
                {name === "mensagem" ? (
                  <Textarea
                    {...shared}
                    rows={4}
                    ref={(node) => {
                      fieldRefs.current[name] = node;
                    }}
                  />
                ) : (
                  <Input
                    {...shared}
                    type="text"
                    autoComplete={AUTOCOMPLETE[name] ?? "off"}
                    ref={(node) => {
                      fieldRefs.current[name] = node;
                    }}
                  />
                )}
                <FieldError id={errorId}>{errors[name]}</FieldError>
              </Field>
            );
          })}
        </FieldGroup>

        <div role="status" aria-live="polite" className="text-small empty:hidden">
          {status.kind === "invalido" ? erros.resumo : null}
          {status.kind === "sem-numero" ? semNumero : null}
          {status.kind === "enviado" ? (
            <>
              {sucesso}{" "}
              <a href={status.url} target="_blank" rel="noopener noreferrer" className="underline">
                {sucessoLink}
              </a>
            </>
          ) : null}
        </div>

        <button type="submit" className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "w-full")}>
          {enviar}
        </button>
      </div>
    </form>
  );
}
