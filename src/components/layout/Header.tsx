import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/NavLink';
import AmulyaaLogo from '@/components/AmulyaaLogo';

const navLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/careers', label: 'Careers' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:pt-5">
      {/* Thin accent gradient top bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] z-10"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(22 82% 50% / 0.7) 30%, hsl(22 82% 62% / 0.9) 50%, hsl(22 82% 50% / 0.7) 70%, transparent 100%)',
        }}
      />

      <nav className="container" aria-label="Main navigation">
        <div
          className="surface-panel border-white/10 px-3 py-3 md:px-4"
          style={{
            background: 'linear-gradient(145deg, rgba(30, 19, 14, 0.95) 0%, rgba(52, 31, 20, 0.92) 100%)',
            color: 'hsl(36 38% 94%)',
            boxShadow: scrolled
              ? '0 8px 32px -8px rgba(18, 10, 6, 0.7), 0 40px 80px -40px rgba(18, 10, 6, 0.5), inset 0 1px 0 rgba(255,255,255,0.10)'
              : '0 4px 20px -8px rgba(18, 10, 6, 0.5), 0 30px 70px -36px rgba(28, 18, 14, 0.65), inset 0 1px 0 rgba(255,255,255,0.10)',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          <div className="flex flex-wrap items-center gap-3">
            {/* Logo */}
            <Link to="/" className="flex min-w-0 items-center" aria-label="Amulyaa home">
              {/* Full logo on md+ screens */}
              <span className="hidden sm:block">
                <AmulyaaLogo width={172} />
              </span>
              {/* Icon-only on small screens */}
              <span className="sm:hidden">
                <AmulyaaLogo iconOnly />
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <div className="ml-auto flex items-center gap-2 md:ml-0">
              <Button
                variant="outline"
                size="icon"
                className="border-white/10 bg-white/10 hover:bg-white/18 md:hidden"
                style={{ color: 'hsl(36 38% 94%)' }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

            {/* Desktop nav pill */}
            <div className="order-3 hidden w-full justify-center md:flex lg:order-none lg:flex-1">
              <div
                className="inline-flex items-center gap-1 rounded-full p-1.5 backdrop-blur-md"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
                }}
              >
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="rounded-full px-5 py-2.5 text-sm font-semibold transition-all"
                    style={{ color: 'rgba(240,220,200,0.62)' }}
                    activeClassName="text-accent-foreground"
                    activeStyle={{
                      background: 'linear-gradient(135deg, hsl(22 82% 50%) 0%, hsl(28 90% 58%) 100%)',
                      color: 'hsl(36 38% 97%)',
                      boxShadow: '0 8px 24px -8px hsl(22 82% 50% / 0.8), 0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="group flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-semibold backdrop-blur-md transition-all hover:bg-white/18"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.08)',
                color: 'hsl(36 38% 94%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                opacity: totalItems > 0 ? 1 : 0.55,
              }}
              aria-label={`Cart with ${totalItems} items`}
            >
              <ShoppingBag className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span
                  className="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold"
                  style={{
                    background: 'linear-gradient(135deg, hsl(22 82% 50%) 0%, hsl(28 90% 58%) 100%)',
                    color: 'hsl(36 38% 97%)',
                    boxShadow: '0 4px 12px -4px hsl(22 82% 50% / 0.7)',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="container mt-3 md:hidden">
          <div
            className="surface-panel animate-fade-in px-5 py-5"
            style={{
              background: 'linear-gradient(145deg, rgba(30, 19, 14, 0.97) 0%, rgba(52, 31, 20, 0.95) 100%)',
              color: 'hsl(36 38% 94%)',
              border: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                className="rounded-[1.45rem] p-4"
                style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.07)' }}
              >
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.28em]" style={{ color: 'rgba(240,220,200,0.5)' }}>
                  Studio
                </p>
                <p className="mt-3 font-serif text-3xl" style={{ color: 'hsl(36 38% 94%)' }}>Brooklyn</p>
              </div>
              <div
                className="rounded-[1.45rem] p-4"
                style={{ border: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.07)' }}
              >
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.28em]" style={{ color: 'rgba(240,220,200,0.5)' }}>
                  Shipping
                </p>
                <p className="mt-3 font-serif text-3xl" style={{ color: 'hsl(36 38% 94%)' }}>Worldwide</p>
              </div>
            </div>

            <p className="mt-6 text-[0.66rem] font-semibold uppercase tracking-[0.34em]" style={{ color: 'rgba(240,220,200,0.46)' }}>
              Navigation
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="block rounded-[1.2rem] px-4 py-3 text-base font-semibold transition-all"
                    style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.06)', color: 'rgba(240,220,200,0.82)' }}
                    activeClassName=""
                    activeStyle={{
                      background: 'linear-gradient(135deg, hsl(22 82% 50% / 0.9) 0%, hsl(28 90% 58% / 0.85) 100%)',
                      color: 'hsl(36 38% 97%)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
