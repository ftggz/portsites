type Item = { readonly pergunta: string; readonly resposta: string };

type FaqProps = {
  titulo: string;
  itens: readonly Item[];
};

// Todas as respostas ficam abertas, uma faixa por pergunta.
export function Faq({ titulo, itens }: FaqProps) {
  return (
    <section id="perguntas" aria-labelledby="perguntas-title" className="claras-faq">
      <h2 id="perguntas-title" className="claras-faq__title on-field-1">
        {titulo}
      </h2>
      {itens.map((item) => (
        <div key={item.pergunta} className="claras-faq__band">
          <h3>{item.pergunta}</h3>
          <p>{item.resposta}</p>
        </div>
      ))}
    </section>
  );
}
