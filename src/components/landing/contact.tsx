import { ContactForm } from "@/components/landing/contact-form";
import { landing, site } from "@/content/landing";
import { whatsappNumber, whatsappUrl } from "@/lib/contato";

export function Contact() {
  const { contato } = landing;
  const numero = whatsappNumber(site.whatsapp);
  const direto = numero ? whatsappUrl(numero, contato.diretoTexto) : null;

  return (
    <section id="contato" aria-labelledby="contato-title" className="px-margin py-[7.5rem]">
      <div className="reveal md:mx-[8.333%]">
        <ContactForm
          titulo={contato.titulo}
          frase={contato.frase}
          previa={contato.previa}
          campos={contato.campos}
          erros={contato.erros}
          modelo={contato.modelo}
          enviar={contato.enviar}
          sucesso={contato.sucesso}
          sucessoLink={contato.sucessoLink}
          semNumero={contato.semNumero}
          whatsapp={numero}
        />
        <p className="m-0 mt-s5">
          {contato.direto}{" "}
          {direto ? (
            <a href={direto} target="_blank" rel="noopener noreferrer" className="underline">
              {contato.diretoLink}
            </a>
          ) : (
            <span>
              {contato.diretoLink} {site.whatsapp}
            </span>
          )}
        </p>
      </div>
    </section>
  );
}
