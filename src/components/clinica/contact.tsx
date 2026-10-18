import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { SiteImage } from "@/components/site-image";
import { buttonVariants } from "@/components/ui/button";
import type { ImageKey } from "@/lib/images";

type ContactProps = {
  titulo: string;
  frase: string;
  imagem: { readonly chave: ImageKey; readonly alt: string };
  pergunta: string;
  agendar: string;
  rever: { readonly label: string; readonly href: string };
  cidade: string;
  horarios: { readonly titulo: string; readonly linhas: readonly string[] };
  avisoId: string;
};

export function Contact({ titulo, frase, imagem, pergunta, agendar, rever, cidade, horarios, avisoId }: ContactProps) {
  return (
    <section id="contato" aria-labelledby="contato-title" className="vagar-contact on-field-2">
      <h2 id="contato-title" className="sr-only">
        {titulo}
      </h2>
      <p className="vagar-contact__sentence reveal">{frase}</p>
      <SiteImage image={imagem.chave} alt={imagem.alt} sizes="(min-width: 64rem) 160px, 96px" className="vagar-contact__photo" />
      <div className="vagar-contact__links">
        <p className="vagar-contact__question">{pergunta}</p>
        <ul>
          <li>
            <DemoWhatsApp id={avisoId} withNotice={false} label={agendar} className={buttonVariants()} />
          </li>
          <li>
            <a href={rever.href} className="vagar-link">
              {rever.label}
            </a>
          </li>
        </ul>
      </div>
      <div className="vagar-contact__meta">
        <p className="m-0">{cidade}</p>
        <h3 className="vagar-contact__hours-title">{horarios.titulo}</h3>
        <ul className="vagar-contact__hours">
          {horarios.linhas.map((linha) => (
            <li key={linha}>{linha}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
