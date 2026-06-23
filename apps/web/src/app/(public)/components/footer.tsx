import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const navGroups = [
  {
    group: "Navegação",
    links: [
      { label: "Início", href: "/" },
      { label: "Planos", href: "/plans" },
      { label: "Eventos", href: "/events" },
    ],
  },
  {
    group: "Loja",
    links: [{ label: "JM Store", href: "/store" }],
  },
  {
    group: "Acesso",
    links: [
      { label: "Área do Aluno", href: "/login" },
      { label: "Cadastro", href: "/register" },
    ],
  },
];

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const socialLinks = [
  { icon: IconFacebook, href: "#", label: "Facebook" },
  { icon: IconInstagram, href: "#", label: "Instagram" },
  { icon: IconX, href: "#", label: "X (Twitter)" },
  { icon: IconMail, href: "#", label: "E-mail" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-primary-foreground mt-10 -mx-5">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center">
        <Link href="/">
          <Image
            src="/icons/adaptive-icon.png"
            alt="JM Fitness Studio"
            width={80}
            height={80}
            className="h-20 w-auto"
          />
        </Link>

        <Separator className="my-8 bg-white/20 w-full" />

        <p className="text-sm font-semibold mb-5 tracking-wide uppercase">
          Siga a JM Fitness Studio
        </p>
        <div className="flex gap-3">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="rounded-full border border-white/30 p-2.5 hover:bg-white/10 transition-colors"
            >
              <Icon />
            </a>
          ))}
        </div>

        <Separator className="my-8 bg-white/20 w-full" />

        <div className="flex flex-wrap justify-center gap-x-20 gap-y-8 w-full">
          {navGroups.map(({ group, links }) => (
            <div key={group}>
              <h3 className="font-semibold mb-4 text-secondary text-sm uppercase tracking-wider">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/20 w-full" />

        <p className="text-xs text-primary-foreground/50 text-center">
          © {new Date().getFullYear()} JM Fitness Studio. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
