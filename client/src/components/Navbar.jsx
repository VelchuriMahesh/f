import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { contactLinks, navLinks } from '../data/content';

function navLinkClass({ isActive }) {
  return [
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive ? 'bg-ink text-white shadow-soft' : 'text-stone-600 hover:bg-white/80 hover:text-ink'
  ].join(' ');
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-linen/80 backdrop-blur-xl">
      <div className="section-shell flex min-h-[84px] items-center justify-between gap-4">
        <NavLink className="min-w-0" to="/">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-heading text-lg text-white">
              S
            </div>
            <div>
              <p className="font-heading text-xl text-ink sm:text-2xl">Shrusara</p>
              <p className="text-xs uppercase tracking-[0.28em] text-cocoa">Fashion Boutique</p>
            </div>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} className={navLinkClass} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a className="button-secondary" href={contactLinks.call}>
            {contactLinks.phoneDisplay}
          </a>
          <a className="button-primary" href={contactLinks.whatsapp}>
            Book on WhatsApp
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            {open ? (
              <path d="M6 6 18 18M18 6 6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div className="section-shell pb-5 lg:hidden">
          <div className="glass-panel space-y-2 p-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium ${
                    isActive ? 'bg-ink text-white' : 'text-stone-700'
                  }`
                }
                to={link.to}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="grid gap-2 pt-2 sm:grid-cols-2">
              <a className="button-secondary" href={contactLinks.call}>
                Call
              </a>
              <a className="button-primary" href={contactLinks.whatsapp}>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

