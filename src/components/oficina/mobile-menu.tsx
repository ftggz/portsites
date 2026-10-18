"use client";

import { useEffect, useRef } from "react";

type NavItem = { readonly label: string; readonly href: string };

type MobileMenuProps = {
  label: string;
  navLabel: string;
  nav: readonly NavItem[];
};

// O menu abre sem JavaScript (details); o script só fecha o painel ao escolher um link, apertar Esc
// ou tocar fora dele.
export function MobileMenu({ label, navLabel, nav }: MobileMenuProps) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const menu = ref.current;
    if (!menu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !menu.open) return;
      menu.open = false;
      menu.querySelector("summary")?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (menu.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
    };
    menu.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      menu.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  function close() {
    if (ref.current) ref.current.open = false;
  }

  return (
    <details ref={ref} className="claras-menu">
      <summary>
        {label}
        <span className="claras-plus" aria-hidden="true" />
      </summary>
      <nav aria-label={navLabel} className="claras-menu__panel">
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={close}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
