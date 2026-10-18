import { fillTemplate } from "@/lib/contato";
import { formatPrice } from "@/lib/format";

type Bairro = { readonly nome: string; readonly taxa: number; readonly tempo: number };

type DeliveryProps = {
  titulo: string;
  texto: string;
  colunas: { readonly bairro: string; readonly taxa: string; readonly tempo: string };
  minutos: string;
  bairros: readonly Bairro[];
  retirada: { readonly texto: string };
  moeda: string;
};

export function Delivery({ titulo, texto, colunas, minutos, bairros, retirada, moeda }: DeliveryProps) {
  return (
    <section id="entrega" data-palco="entrega" aria-labelledby="entrega-titulo" className="forno-delivery">
      <h2 id="entrega-titulo" className="forno-heading">
        {titulo}
      </h2>
      <p className="forno-delivery__text">{texto}</p>
      <table className="forno-table">
        <caption className="sr-only">{titulo}</caption>
        <thead>
          <tr>
            <th scope="col">{colunas.bairro}</th>
            <th scope="col">{colunas.taxa}</th>
            <th scope="col">{colunas.tempo}</th>
          </tr>
        </thead>
        <tbody>
          {bairros.map((bairro) => (
            <tr key={bairro.nome}>
              <th scope="row">{bairro.nome}</th>
              <td className="tabular">{formatPrice(bairro.taxa, moeda)}</td>
              <td className="tabular">{fillTemplate(minutos, { min: String(bairro.tempo) })}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="forno-delivery__pickup">{retirada.texto}</p>
    </section>
  );
}
