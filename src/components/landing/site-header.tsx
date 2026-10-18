import Link from "next/link";

type NavItem = { readonly label: string; readonly href: string };

type SiteHeaderProps = {
  brand: string;
  navLabel: string;
  nav: readonly NavItem[];
};

export function SiteHeader({ brand, navLabel, nav }: SiteHeaderProps) {
  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-s4 px-margin pt-s2">
      <Link href="/" className="inline-flex min-h-11 items-center font-display leading-none font-medium no-underline">
        {brand}
      </Link>
      <nav aria-label={navLabel}>
        <ul className="m-0 flex list-none gap-s3 p-0 text-small sm:gap-s5 sm:text-body">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="inline-flex min-h-11 items-center px-1 no-underline hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
