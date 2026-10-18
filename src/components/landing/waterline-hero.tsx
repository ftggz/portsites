import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = { readonly label: string; readonly href: string };

type WaterlineHeroProps = {
  titleLines: readonly [string, string];
  lead: string;
  primary: Action;
  secondary: Action;
};

// O título aparece duas vezes no mesmo lugar, cada cópia recortada pelo seu campo de cor.
// Só a cópia de cima fica dentro do h1. A de baixo é decorativa e desenha o texto pelo CSS
// (data-text), para o título não aparecer duplicado no texto da página.
function TitleCopy({ lines, variant }: { lines: readonly string[]; variant: "upper" | "lower" }) {
  const upper = variant === "upper";
  return (
    <span
      className={cn("waterline__copy", upper ? "waterline__copy--upper" : "waterline__copy--lower")}
      aria-hidden={upper ? undefined : true}
    >
      <span className="waterline__lines">
        {lines.map((line, index) => (
          <span key={line} className="waterline__line">
            {upper && index > 0 ? " " : null}
            {upper ? <span>{line}</span> : <span data-text={line} />}
          </span>
        ))}
      </span>
    </span>
  );
}

export function WaterlineHero({ titleLines, lead, primary, secondary }: WaterlineHeroProps) {
  return (
    <section aria-labelledby="hero-title" className="waterline">
      <div className="waterline__field" aria-hidden="true" />
      <h1 id="hero-title" className="m-0">
        <TitleCopy lines={titleLines} variant="upper" />
      </h1>
      <TitleCopy lines={titleLines} variant="lower" />
      <div className="waterline__after rise-in on-field-1 absolute inset-x-margin bottom-s7 flex flex-col gap-s5 bg-transparent md:bottom-s6 md:flex-row md:items-end md:justify-between">
        <p className="m-0 max-w-[34ch] leading-snug">{lead}</p>
        <div className="flex flex-wrap items-center gap-x-s6 gap-y-s4">
          <a href={primary.href} className={buttonVariants({ variant: "inverse", size: "lg" })}>
            {primary.label}
          </a>
          <a href={secondary.href} className="underline decoration-[0.07em] underline-offset-[0.18em]">
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
