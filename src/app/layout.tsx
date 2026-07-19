import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Header } from "@/components/header";
import { SITE_CONFIG, SITE_URL } from "@/config/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_CONFIG.name, template: `%s · ${SITE_CONFIG.name}` },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  twitter: { card: "summary", title: SITE_CONFIG.name, description: SITE_CONFIG.description },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f6f1e8" }, { media: "(prefers-color-scheme: dark)", color: "#171411" }] };

const themeScript = `(function(){try{var t=localStorage.getItem('carlota-theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'system'}catch(e){document.documentElement.dataset.theme='system'}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <Header />
        <div className="site-content">{children}</div>
        <footer className="site-footer"><div className="shell"><p>Hecho para cocinar, no para hacer scroll eternamente.</p><nav aria-label="Enlaces del pie"><Link href="/">Recetas</Link><Link href="/favoritas">Favoritas</Link><Link href="/acerca-de">Acerca de</Link></nav></div></footer>
      </body>
    </html>
  );
}
