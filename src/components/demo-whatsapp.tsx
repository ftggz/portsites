import { buttonVariants } from "@/components/ui/button";
import { conceito } from "@/content/landing";
import { cn } from "@/lib/utils";

type DemoWhatsAppProps = {
  id: string;
  label: string;
  className?: string;
  // Vários botões da mesma página podem abrir um único aviso; só um deles precisa renderizá-lo.
  withNotice?: boolean;
};

// Nos sites conceito o WhatsApp fica desligado; o botão abre um aviso nativo (popover), sem JavaScript.
export function DemoWhatsApp({ id, label, className, withNotice = true }: DemoWhatsAppProps) {
  const titleId = `${id}-titulo`;
  return (
    <>
      <button type="button" popoverTarget={id} className={className}>
        {label}
      </button>
      {withNotice ? (
        <div id={id} popover="auto" role="dialog" aria-labelledby={titleId} className="demo-popover">
          <p id={titleId} className="m-0 font-display text-lead leading-tight">
            {conceito.demo.titulo}
          </p>
          <p className="mt-s2 mb-0">{conceito.demo.texto}</p>
          {/* O popover nativo põe o foco no elemento com autofocus quando abre; sem isso o leitor de tela
              só anuncia o aviso no Tab seguinte. Não age no carregamento da página, porque o aviso nasce fechado. */}
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            className={cn(buttonVariants({ size: "sm" }), "mt-s4")}
          >
            {conceito.demo.fechar}
          </button>
        </div>
      ) : null}
    </>
  );
}
