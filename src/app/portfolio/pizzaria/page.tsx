import { DemoNotice } from "@/components/demo-whatsapp";
import { ComandaProvider } from "@/components/pizzaria/comanda-context";
import { Delivery } from "@/components/pizzaria/delivery";
import { Faq } from "@/components/pizzaria/faq";
import { PizzariaFooter } from "@/components/pizzaria/footer";
import { Gallery } from "@/components/pizzaria/gallery";
import { PizzariaHero } from "@/components/pizzaria/hero";
import { Hours } from "@/components/pizzaria/hours";
import { Menu } from "@/components/pizzaria/menu";
import { Order } from "@/components/pizzaria/order";
import { Stage } from "@/components/pizzaria/stage";
import { conceito } from "@/content/landing";
import { pizzaria } from "@/content/pizzaria";
import { creditsFor, type ImageKey } from "@/lib/images";

// Um aviso de demonstração para todos os botões de WhatsApp da página; a comanda tem o seu.
const AVISO = "aviso-pizzaria";

const FOTOS_CARDAPIO: readonly ImageKey[] = pizzaria.cardapio.categorias.flatMap((categoria) =>
  categoria.itens.flatMap((item) => ("imagem" in item ? [item.imagem.key] : [])),
);

const IMAGENS: readonly ImageKey[] = [
  pizzaria.hero.imagem.key,
  ...FOTOS_CARDAPIO,
  ...Object.values(pizzaria.palco),
  ...pizzaria.galeria.fotos.map((foto) => foto.key),
  pizzaria.rodape.imagem,
];

export default function PizzariaPage() {
  const { hero, cardapio, galeria, pedido, entrega, perguntas, contato } = pizzaria;
  return (
    <div id="topo" className="forno-page">
      <ComandaProvider fotoInicial={FOTOS_CARDAPIO[0] ?? null}>
        <main id="conteudo">
          <div className="forno-split">
            <div className="forno-column">
              <PizzariaHero
                brand={pizzaria.marca}
                navLabel={pizzaria.navLabel}
                nav={pizzaria.nav}
                titleLines={hero.titleLines}
                lead={hero.lead}
                cta={hero.cta}
                mandar={pedido.mandar}
                horario={pizzaria.funcionamento}
                status={hero.status}
                image={hero.imagem}
                avisoId={AVISO}
              />
              {/* A comanda vem logo depois do cardápio, para escolher e mandar sem atravessar a página. */}
              <div className="forno-sheet">
                <Menu
                  titulo={cardapio.titulo}
                  nota={cardapio.nota}
                  indice={cardapio.indice}
                  tamanhos={cardapio.tamanhos}
                  adicionar={cardapio.adicionar}
                  noPedido={cardapio.noPedido}
                  categorias={cardapio.categorias}
                  barra={pedido.barra}
                  moeda={pizzaria.moeda}
                />
                <Order
                  titulo={pedido.titulo}
                  texto={pedido.texto}
                  comanda={pedido.comanda}
                  bairros={entrega.bairros}
                  retirada={entrega.retirada}
                  tamanhos={cardapio.tamanhos}
                  aviso={conceito.demo}
                  horario={pizzaria.funcionamento}
                  status={hero.status}
                  moeda={pizzaria.moeda}
                />
                <Delivery
                  titulo={entrega.titulo}
                  texto={entrega.texto}
                  colunas={entrega.colunas}
                  minutos={entrega.minutos}
                  bairros={entrega.bairros}
                  retirada={entrega.retirada}
                  moeda={pizzaria.moeda}
                />
                <Gallery
                  titulo={galeria.titulo}
                  lista={galeria.lista}
                  fotos={galeria.fotos}
                  proxima={galeria.proxima}
                  pausar={galeria.pausar}
                  continuar={galeria.continuar}
                />
                <Faq
                  titulo={perguntas.titulo}
                  fatos={perguntas.fatos}
                  itens={perguntas.itens}
                  botao={perguntas.botao}
                  mandar={pedido.mandar}
                  link={perguntas.link}
                  imagem={perguntas.imagem}
                  avisoId={AVISO}
                />
              </div>
            </div>
            <Stage topo={hero.imagem.key} secoes={pizzaria.palco} fotosCardapio={FOTOS_CARDAPIO} />
          </div>
          <Hours
            titulo={contato.titulo}
            linhas={contato.linhas}
            chamada={contato.chamada}
            botao={contato.botao}
            mandar={pedido.mandar}
            avisoId={AVISO}
          />
        </main>
        <PizzariaFooter
          marca={pizzaria.marca.nome}
          nav={pizzaria.nav}
          rodape={pizzaria.rodape}
          credits={creditsFor(IMAGENS)}
          avisoId={AVISO}
        />
        <DemoNotice id={AVISO} />
      </ComandaProvider>
    </div>
  );
}
