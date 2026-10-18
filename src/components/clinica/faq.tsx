type Pergunta = {
  readonly pergunta: string;
  readonly resposta: string;
  readonly link?: { readonly label: string; readonly href: string };
};

type FaqProps = {
  titulo: string;
  itens: readonly Pergunta[];
};

export function Faq({ titulo, itens }: FaqProps) {
  return (
    <section id="perguntas" aria-labelledby="perguntas-title" className="vagar-faq">
      <h2 id="perguntas-title" className="vagar-faq__title reveal">
        {titulo}
      </h2>
      <div className="vagar-faq__list">
        {itens.map((item) => (
          <details key={item.pergunta} className="vagar-faq__item">
            <summary>{item.pergunta}</summary>
            <p>
              {item.resposta}
              {item.link ? (
                <>
                  {" "}
                  <a href={item.link.href} className="vagar-link">
                    {item.link.label}
                  </a>
                </>
              ) : null}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
