import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Preco =
  | { readonly tipo: "projecao"; readonly texto: string; readonly nota: string }
  | { readonly tipo: "fixo"; readonly moeda: string; readonly valor: string; readonly periodo: string };

type Plano = {
  readonly nome: string;
  readonly publico: string;
  readonly preco: Preco;
  readonly inclui: string;
};

type PlansProps = {
  titulo: string;
  lista: readonly Plano[];
  cta: { readonly label: string; readonly href: string };
  foraTitulo: string;
  fora: readonly string[];
};

function Price({ preco }: { preco: Preco }) {
  if (preco.tipo === "projecao") {
    // A frase da projeção ocupa o lugar do preço e fica em duas linhas equilibradas.
    return (
      <p className="m-0 grid gap-s2">
        <span className="max-w-[9em] font-display text-lead leading-tight font-light text-balance">{preco.texto}</span>
        <span className="max-w-[34ch] text-small">{preco.nota}</span>
      </p>
    );
  }
  return (
    <p className="m-0 leading-none">
      <span className="font-display text-lead font-light">{preco.moeda}</span>{" "}
      <span className="font-display text-display leading-[0.85] font-light tracking-(--tracking-display) tabular">
        {preco.valor}
      </span>{" "}
      <span className="block pt-s3">{preco.periodo}</span>
    </p>
  );
}

// As duas etapas são uma oferta só; o botão fica na primeira, que é por onde todo cliente começa.
export function Plans({ titulo, lista, cta, foraTitulo, fora }: PlansProps) {
  return (
    <section id="planos" aria-labelledby="planos-title">
      <h2 id="planos-title" className="sr-only">
        {titulo}
      </h2>
      <div className="grid md:grid-cols-12">
        {lista.map((plano, index) => {
          const emphasis = index === lista.length - 1;
          return (
            <article
              key={plano.nome}
              className={cn(
                "flex min-h-[70svh] flex-col justify-between gap-s7 px-margin py-s7 md:min-h-[90svh] md:p-10",
                emphasis ? "on-field-1 md:col-span-7" : "bg-background md:col-span-5",
              )}
            >
              <div className="grid gap-s4">
                <h3 className="m-0 text-head leading-none font-light tracking-(--tracking-display)">{plano.nome}</h3>
                <p className="m-0 max-w-[30ch]">{plano.publico}</p>
                <p className="m-0 max-w-[42ch]">{plano.inclui}</p>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-s5">
                <Price preco={plano.preco} />
                {index === 0 ? (
                  <a href={cta.href} className={buttonVariants({ size: "lg" })}>
                    {cta.label}
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
      <div className="grid gap-s4 bg-surface px-margin py-s8 md:grid-cols-12 md:gap-x-gutter">
        <h3 className="m-0 text-lead leading-tight font-normal md:col-span-4">{foraTitulo}</h3>
        <ul className="m-0 grid list-none gap-s2 p-0 md:col-span-7 md:col-start-6">
          {fora.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
