type SkipLinkProps = {
  label: string;
  target?: string;
};

export function SkipLink({ label, target = "#conteudo" }: SkipLinkProps) {
  return (
    <a
      href={target}
      className="sr-only-focusable fixed top-3 left-3 z-[70] bg-primary px-4 py-3 text-small text-primary-foreground no-underline"
    >
      {label}
    </a>
  );
}
