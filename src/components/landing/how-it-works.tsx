import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Passo = { readonly frase: string; readonly pedido: string; readonly resposta: string };

type HowItWorksProps = {
  titulo: string;
  pedidoLabel: string;
  respostaLabel: string;
  passos: readonly Passo[];
  cta: { readonly label: string; readonly href: string };
};

// Como no WhatsApp, a mensagem de quem lê fica à direita e a resposta, à esquerda.
export function HowItWorks({ titulo, pedidoLabel, respostaLabel, passos, cta }: HowItWorksProps) {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="bg-surface px-margin py-section">
      <div className="md:grid md:grid-cols-12 md:gap-x-gutter">
        <div className="md:col-span-9 md:col-start-4">
          <h2
            id="como-funciona-title"
            className="reveal m-0 text-head leading-[1.02] font-light tracking-(--tracking-display)"
          >
            {titulo}
          </h2>
          <ol className="m-0 mt-s8 grid list-none gap-[5.5rem] p-0">
            {passos.map((passo, index) => {
              const last = index === passos.length - 1;
              return (
                <li key={passo.frase} className="grid gap-s4">
                  <p className="m-0 max-w-[35rem] font-medium">{passo.frase}</p>
                  <p className="reveal m-0 ml-10 max-w-[35rem] justify-self-end bg-background p-5 md:ml-0">
                    <span className="sr-only">{pedidoLabel}: </span>
                    {passo.pedido}
                  </p>
                  <p
                    className={cn(
                      "reveal-reply on-field-1 m-0 mr-10 justify-self-start p-5 md:mr-0",
                      last ? "max-w-[47.5rem]" : "max-w-[31.5rem]",
                    )}
                  >
                    <span className="sr-only">{respostaLabel}: </span>
                    {passo.resposta}
                  </p>
                </li>
              );
            })}
          </ol>
          <a href={cta.href} className={cn(buttonVariants({ size: "lg" }), "mt-s8")}>
            {cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
