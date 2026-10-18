import { Brands } from "@/components/oficina/brands";
import { Contact } from "@/components/oficina/contact";
import { Faq } from "@/components/oficina/faq";
import { FollowService } from "@/components/oficina/follow-service";
import { OficinaFooter } from "@/components/oficina/footer";
import { Gallery } from "@/components/oficina/gallery";
import { OficinaHeader } from "@/components/oficina/header";
import { OficinaHero } from "@/components/oficina/hero";
import { Services } from "@/components/oficina/services";
import { Steps } from "@/components/oficina/steps";
import { Transparency } from "@/components/oficina/transparency";
import { conceito } from "@/content/landing";
import { oficina } from "@/content/oficina";
import { creditsFor, type ImageKey } from "@/lib/images";

// O aviso de demonstração do WhatsApp vive no topo; os outros botões de WhatsApp abrem o mesmo aviso.
const AVISO = "aviso-oficina";

const IMAGENS: readonly ImageKey[] = [
  oficina.hero.imagens.elevador.key,
  oficina.hero.imagens.maos.key,
  oficina.transparencia.imagem.paisagem,
  ...oficina.comoFunciona.passos.map((passo) => passo.imagem.key),
  ...oficina.acompanhe.mensagens.flatMap((mensagem) => ("imagem" in mensagem ? [mensagem.imagem.key] : [])),
  ...oficina.galeria.fotos.map((foto) => foto.key),
];

export default function OficinaPage() {
  const { hero, servicos, transparencia, acompanhe, galeria, contato } = oficina;
  return (
    <div id="topo" className="claras-page">
      <OficinaHeader
        brand={oficina.marca}
        navLabel={oficina.navLabel}
        menu={oficina.menu}
        nav={oficina.nav}
        cta={hero.cta}
        avisoId={AVISO}
      />
      <main id="conteudo" className="claras-board">
        <OficinaHero
          titleLines={hero.titleLines}
          descritor={oficina.marca.descritor}
          frase={hero.frase}
          destaque={hero.destaque}
          cta={hero.cta}
          images={hero.imagens}
          avisoId={AVISO}
        />
        <Services
          palavra={servicos.palavra}
          nota={servicos.nota}
          categorias={servicos.categorias}
          ajuda={servicos.ajuda}
          moeda={oficina.moeda}
          avisoId={AVISO}
        />
        <Transparency
          titulo={transparencia.titulo}
          descricao={transparencia.descricao}
          fatos={transparencia.fatos}
          cta={transparencia.cta}
          imagem={transparencia.imagem}
          avisoId={AVISO}
        />
        <Steps titulo={oficina.comoFunciona.titulo} passos={oficina.comoFunciona.passos} />
        <FollowService
          titulo={acompanhe.titulo}
          intro={acompanhe.intro}
          servico={acompanhe.servico}
          oficina={acompanhe.oficina}
          voce={acompanhe.voce}
          foto={acompanhe.foto}
          legenda={acompanhe.legenda}
          cta={acompanhe.cta}
          mensagens={acompanhe.mensagens}
          avisoId={AVISO}
        />
        <Brands titulo={oficina.marcas.titulo} lista={oficina.marcas.lista} nota={oficina.marcas.nota} />
        <Gallery titulo={galeria.titulo} contagem={galeria.contagem} fotos={galeria.fotos} />
        <Faq titulo={oficina.perguntas.titulo} itens={oficina.perguntas.itens} />
        <Contact
          titulo={contato.titulo}
          campos={contato.campos}
          enviar={contato.enviar}
          mensagem={contato.mensagem}
          mensagemRotulo={contato.mensagemRotulo}
          nota={contato.nota}
          local={contato.local}
          resposta={contato.resposta}
          horarios={oficina.horarios}
          aviso={conceito.demo}
        />
      </main>
      <OficinaFooter
        marca={oficina.marca.nome}
        nav={oficina.nav}
        rodape={oficina.rodape}
        credits={creditsFor(IMAGENS)}
        avisoId={AVISO}
      />
    </div>
  );
}
