type BrandsProps = {
  titulo: string;
  lista: readonly string[];
  nota: string;
};

export function Brands({ titulo, lista, nota }: BrandsProps) {
  return (
    <section id="marcas" aria-labelledby="marcas-title" className="claras-brands">
      <div className="claras-brands__head">
        <h2 id="marcas-title">{titulo}</h2>
        <p>{nota}</p>
      </div>
      <ul className="claras-brands__list on-field-1">
        {lista.map((marca) => (
          <li key={marca}>{marca}</li>
        ))}
      </ul>
    </section>
  );
}
