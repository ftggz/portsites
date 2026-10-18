type Pergunta = { readonly pergunta: string; readonly resposta: string };

type FaqProps = {
  titulo: string;
  itens: readonly Pergunta[];
};

export function Faq({ titulo, itens }: FaqProps) {
  return (
    <section id="perguntas" aria-labelledby="perguntas-title" className="bg-surface px-margin py-section">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-gutter">
        <h2
          id="perguntas-title"
          className="reveal m-0 text-head leading-[1.02] font-light tracking-(--tracking-display) lg:col-span-4"
        >
          {titulo}
        </h2>
        <div className="mt-s7 md:columns-2 md:gap-14 lg:col-span-8 lg:col-start-5 lg:mt-0">
          {itens.map((item) => (
            <p key={item.pergunta} className="m-0 mb-5 break-inside-avoid">
              <strong className="font-medium">{item.pergunta}</strong> {item.resposta}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
