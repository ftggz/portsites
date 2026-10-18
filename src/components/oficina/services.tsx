import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { formatPrice } from "@/lib/format";

type Item = { readonly nome: string; readonly detalhe?: string; readonly preco: number; readonly extra?: string };
type Categoria = { readonly nome: string; readonly itens: readonly Item[] };

type ServicesProps = {
  palavra: string;
  nota: string;
  categorias: readonly Categoria[];
  ajuda: { readonly texto: string; readonly cta: string };
  moeda: string;
  avisoId: string;
};

export function Services({ palavra, nota, categorias, ajuda, moeda, avisoId }: ServicesProps) {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="claras-services">
      <div className="claras-services__word on-field-1">
        <h2 id="servicos-title" className="claras-word">
          {palavra}
        </h2>
        <p className="claras-services__note">{nota}</p>
      </div>
      <div className="claras-bars">
        {categorias.map((categoria, index) => (
          <details key={categoria.nome} className="claras-bar" open={index === 0}>
            <summary>
              {categoria.nome}
              <span className="claras-plus" aria-hidden="true" />
            </summary>
            <ul className="claras-bar__items">
              {categoria.itens.map((item) => (
                <li key={item.nome}>
                  <span>
                    {item.nome}
                    {item.detalhe ? <span className="claras-bar__detail">{item.detalhe}</span> : null}
                  </span>
                  <span className="claras-bar__price">
                    <span className="tabular">{formatPrice(item.preco, moeda)}</span>
                    {item.extra ? <span className="claras-bar__extra">{item.extra}</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </details>
        ))}
        <div className="claras-services__help on-field-2">
          <p>{ajuda.texto}</p>
          <DemoWhatsApp id={avisoId} withNotice={false} label={ajuda.cta} className="claras-inverse-button" />
        </div>
      </div>
    </section>
  );
}
