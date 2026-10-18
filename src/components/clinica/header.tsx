type NavItem = { readonly label: string; readonly href: string };

type ClinicaHeaderProps = {
  brand: { readonly nome: string; readonly descritor: string };
  navLabel: string;
  nav: readonly NavItem[];
};

// Fica por cima da foto do topo, fora do <main>, para o link de pular conteúdo passar por ele.
export function ClinicaHeader({ brand, navLabel, nav }: ClinicaHeaderProps) {
  return (
    <header className="vagar-header">
      <p className="m-0 leading-tight font-medium">
        {brand.nome}
        <br />
        {brand.descritor}
      </p>
      <nav aria-label={navLabel}>
        <ul className="vagar-header__nav">
          {nav.map((item, index) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
              {index < nav.length - 1 ? <span aria-hidden="true">,</span> : null}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
