import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, ShoppingBag, Sparkles, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/NavLink';

const navLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/careers', label: 'Careers' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:pt-5">
      <nav className="container" aria-label="Main navigation">
        <div className="surface-panel border-white/10 bg-[linear-gradient(145deg,rgba(33,22,18,0.94),rgba(56,35,27,0.9))] px-3 py-3 text-primary-foreground shadow-[0_30px_70px_-36px_rgba(28,18,14,0.85)] md:px-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Amulyaa home">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.2rem] border border-white/12 bg-white/10 text-lg font-semibold text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                A
              </div>
              <div className="min-w-0">
                <span className="block font-serif text-3xl font-semibold tracking-[-0.05em] text-primary-foreground">
                  Amulyaa
                </span>
                <span className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-primary-foreground/58 sm:block">
                  Original paintings
                </span>
              </div>
            </Link>

            <div className="ml-auto flex items-center gap-2 md:ml-0">

              <Button
                variant="outline"
                size="icon"
                className="border-white/10 bg-white/10 text-primary-foreground hover:bg-white/14 md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
            </div>

            <div className="order-3 hidden w-full justify-center md:flex lg:order-none lg:flex-1">
              <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="rounded-full px-4 py-2.5 text-sm font-semibold text-primary-foreground/62 transition-all hover:bg-white/8 hover:text-primary-foreground"
                    activeClassName="bg-accent text-accent-foreground shadow-[0_16px_30px_-22px_rgba(226,138,88,0.95)]"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {totalItems > 0 && (
                <Link
                  to="/cart"
                  className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-all hover:bg-white/14"
                  aria-label={`Cart with ${totalItems} items`}
                >
                  <ShoppingBag className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  <span className="hidden sm:inline">Cart</span>
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-xs font-bold text-accent-foreground">
                    {totalItems}
                  </span>
                </Link>
              )}
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="container mt-3 md:hidden">
          <div className="surface-panel animate-fade-in border-white/10 bg-[linear-gradient(145deg,rgba(33,22,18,0.95),rgba(56,35,27,0.92))] px-5 py-5 text-primary-foreground shadow-[0_30px_70px_-36px_rgba(28,18,14,0.85)]">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.45rem] border border-white/10 bg-white/10 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary-foreground/56">
                  Studio
                </p>
                <p className="mt-3 font-serif text-3xl text-primary-foreground">Brooklyn</p>
              </div>
              <div className="rounded-[1.45rem] border border-white/10 bg-white/10 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary-foreground/56">
                  Shipping
                </p>
                <p className="mt-3 font-serif text-3xl text-primary-foreground">Worldwide</p>
              </div>
            </div>

            <p className="mt-6 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-primary-foreground/52">
              Navigation
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="block rounded-[1.2rem] border border-white/8 bg-white/6 px-4 py-3 text-base font-semibold text-primary-foreground/82 hover:bg-white/12"
                    activeClassName="bg-accent text-accent-foreground shadow-[0_16px_30px_-22px_rgba(226,138,88,0.95)]"
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
