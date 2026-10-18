type Fato = { readonly hora: string; readonly texto: string };

type ProblemProps = {
  titulo: string;
  nota: string;
  fatosLabel: string;
  fatos: readonly Fato[];
};

export function Problem({ titulo, nota, fatosLabel, fatos }: ProblemProps) {
  return (
    <section id="problema" aria-labelledby="problema-title" className="bg-surface px-margin py-section">
      <div className="grid gap-y-s5 md:grid-cols-12 md:items-end md:gap-x-gutter">
        <h2
          id="problema-title"
          className="reveal m-0 text-head leading-[1.02] font-light tracking-(--tracking-display) md:col-span-6"
        >
          {titulo}
        </h2>
        <p className="reveal m-0 max-w-[30ch] md:col-span-3 md:col-start-10">{nota}</p>
      </div>
      <ol
        aria-label={fatosLabel}
        className="m-0 mt-s7 grid list-none grid-cols-2 gap-x-gutter gap-y-s6 p-0 md:mt-[7.5rem] lg:grid-cols-4"
      >
        {fatos.map((fato) => (
          <li key={fato.hora} className="reveal">
            <p className="m-0 font-display text-head leading-none font-light tracking-(--tracking-display) tabular">{fato.hora}</p>
            <p className="m-0 mt-s3 max-w-[22ch] text-muted-foreground">{fato.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
