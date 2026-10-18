type Item = { readonly nome: string; readonly texto: string };

type FeaturesProps = {
  titulo: string;
  itens: readonly Item[];
};

const nameClass = "m-0 text-head leading-none font-normal tracking-(--tracking-display)";

export function Features({ titulo, itens }: FeaturesProps) {
  return (
    <section id="diferenciais" aria-labelledby="diferenciais-title" className="features px-margin py-[20vh]">
      <h2 id="diferenciais-title" className={`reveal ${nameClass} pb-[0.35em] text-muted-foreground`}>
        {titulo}
      </h2>
      <ul className="m-0 grid list-none gap-y-s6 p-0 md:gap-y-[0.35em]">
        {itens.map((item) => (
          <li
            key={item.nome}
            className="features__row reveal grid gap-y-s2 md:grid-cols-12 md:items-baseline md:gap-x-gutter"
          >
            <h3 className={`features__name ${nameClass} md:col-span-8`}>{item.nome}</h3>
            <p className="m-0 max-w-[36ch] pl-margin md:col-span-4 md:col-start-9 md:pl-0">{item.texto}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
