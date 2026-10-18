type SkipLinkProps = {
  label: string;
  target?: string;
  // Fora de um site (antes do aviso dos projetos conceito) o link usa as cores neutras do aviso.
  neutral?: boolean;
};

export function SkipLink({ label, target = "#conteudo", neutral = false }: SkipLinkProps) {
  return (
    <a
      href={target}
      className={
        neutral
          ? "concept-skip sr-only-focusable"
          : "sr-only-focusable fixed top-3 left-3 z-[70] bg-primary px-4 py-3 text-small text-primary-foreground no-underline"
      }
    >
      {label}
    </a>
  );
}
