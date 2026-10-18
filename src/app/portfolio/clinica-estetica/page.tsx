import { Contact } from "@/components/clinica/contact";
import { Faq } from "@/components/clinica/faq";
import { ClinicaFooter } from "@/components/clinica/footer";
import { Gallery } from "@/components/clinica/gallery";
import { ClinicaHeader } from "@/components/clinica/header";
import { ClinicaHero } from "@/components/clinica/hero";
import { Procedures } from "@/components/clinica/procedures";
import { Steps } from "@/components/clinica/steps";
import { clinica } from "@/content/clinica";
import { conceito } from "@/content/landing";
import { creditsFor, type ImageKey } from "@/lib/images";

// O aviso de demonstração do WhatsApp vive no topo; os botões do contato e do rodapé abrem o mesmo aviso.
const AVISO = "aviso-clinica";

const IMAGENS: readonly ImageKey[] = [
  clinica.hero.imagem.desktop,
  clinica.hero.imagem.mobile,
  ...clinica.galeria.fotos.map((foto) => foto.imagem),
  ...clinica.comoFunciona.passos.map((passo) => passo.imagem),
  clinica.contato.imagem.chave,
];

export default function ClinicaPage() {
  const { procedimentos, comoFunciona } = clinica;
  return (
    <div className="relative">
      <ClinicaHeader brand={clinica.marca} navLabel={clinica.navLabel} nav={clinica.nav} />
      <main id="conteudo">
        <ClinicaHero
          titleLines={clinica.hero.titleLines}
          lead={clinica.hero.lead}
          cta={clinica.hero.cta}
          image={clinica.hero.imagem}
          avisoId={AVISO}
        />
        <Procedures
          titulo={procedimentos.titulo}
          intro={procedimentos.intro}
          grupos={procedimentos.grupos}
          nota={procedimentos.nota}
          escolhaLabel={procedimentos.escolhaLabel}
          cuidados={procedimentos.cuidados}
          antes={procedimentos.antes}
          depois={procedimentos.depois}
          visita={procedimentos.visita}
          aviso={conceito.demo}
          unidades={clinica.duracao}
          moeda={clinica.moeda}
        />
        <Gallery label={clinica.galeria.label} fotos={clinica.galeria.fotos} />
        <Steps
          titulo={comoFunciona.titulo}
          faixaLabel={comoFunciona.faixaLabel}
          anterior={comoFunciona.anterior}
          proximo={comoFunciona.proximo}
          passos={comoFunciona.passos}
        />
        <Faq titulo={clinica.perguntas.titulo} itens={clinica.perguntas.itens} />
        <Contact {...clinica.contato} horarios={clinica.horarios} avisoId={AVISO} />
      </main>
      <ClinicaFooter
        marca={clinica.marca.nome}
        nav={clinica.nav}
        rodape={clinica.rodape}
        credits={creditsFor(IMAGENS)}
        avisoId={AVISO}
      />
    </div>
  );
}
