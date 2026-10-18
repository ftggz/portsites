import { QuoteForm } from "@/components/oficina/quote-form";

type Campo = { readonly label: string; readonly exemplo: string };

type ContactProps = {
  titulo: string;
  campos: { readonly carro: Campo; readonly problema: Campo };
  enviar: string;
  mensagem: { readonly comCarro: string; readonly semCarro: string };
  mensagemRotulo: string;
  nota: string;
  local: string;
  resposta: string;
  horarios: { readonly titulo: string; readonly linhas: readonly string[] };
  aviso: { readonly titulo: string; readonly texto: string; readonly fechar: string };
};

export function Contact({
  titulo,
  campos,
  enviar,
  mensagem,
  mensagemRotulo,
  nota,
  local,
  resposta,
  horarios,
  aviso,
}: ContactProps) {
  return (
    <section id="contato" aria-labelledby="contato-title" className="claras-contact on-field-2">
      <h2 id="contato-title" className="claras-contact__title">
        {titulo}
      </h2>
      <QuoteForm
        campos={campos}
        enviar={enviar}
        mensagem={mensagem}
        mensagemRotulo={mensagemRotulo}
        nota={nota}
        aviso={aviso}
      />
      <div className="claras-contact__info">
        <p>{local}</p>
        <div>
          <h3>{horarios.titulo}</h3>
          <ul>
            {horarios.linhas.map((linha) => (
              <li key={linha}>{linha}</li>
            ))}
          </ul>
        </div>
        <p>{resposta}</p>
      </div>
    </section>
  );
}
