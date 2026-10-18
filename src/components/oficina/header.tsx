import { DemoWhatsApp } from "@/components/demo-whatsapp";
import { MobileMenu } from "@/components/oficina/mobile-menu";

type NavItem = { readonly label: string; readonly href: string };

type OficinaHeaderProps = {
  brand: { readonly nome: string; readonly sigla: string };
  navLabel: string;
  menu: string;
  nav: readonly NavItem[];
  cta: string;
  avisoId: string;
};

export function OficinaHeader({ brand, navLabel, menu, nav, cta, avisoId }: OficinaHeaderProps) {
  return (
    <header className="claras-top">
      <a href="#topo" aria-label={brand.nome} className="claras-top__mark">
        {brand.sigla}
      </a>
      <nav aria-label={navLabel} className="claras-top__nav">
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <MobileMenu label={menu} navLabel={navLabel} nav={nav} />
      <DemoWhatsApp id={avisoId} label={cta} className="claras-top__cta" />
    </header>
  );
}
