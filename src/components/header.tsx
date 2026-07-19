import { BookOpenText, Heart, Home, Info } from "lucide-react";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site";
import { ThemeToggle } from "@/components/theme-toggle";

const navigation = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/favoritas", label: "Favoritas", icon: Heart },
  { href: "/acerca-de", label: "Acerca de", icon: Info },
];

export function Header() {
  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Link href="/" className="brand" aria-label={`${SITE_CONFIG.name}, ir al inicio`}>
            <span className="brand-mark"><BookOpenText aria-hidden="true" size={21} /></span>
            <span>{SITE_CONFIG.name}</span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map(({ href, label }) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <nav className="mobile-nav" aria-label="Navegación móvil">
        {navigation.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}><Icon aria-hidden="true" size={20} /><span>{label}</span></Link>
        ))}
      </nav>
    </>
  );
}
