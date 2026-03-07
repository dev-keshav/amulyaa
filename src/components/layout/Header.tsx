import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import CloudinaryImage from '@/components/media/CloudinaryImage';

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="container flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-3 text-foreground" aria-label="Atelier home">
          <div className="h-16 w-32 shrink-0">
            <CloudinaryImage
              publicId="logo"
              width={1500}
              height={800}
              alt="Atelier logo"
              className="h-full w-full object-contain"
              wrapperClassName="h-full w-full bg-transparent"
              skeletonClassName="bg-transparent"
              loading="eager"
            />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight hidden sm:inline">
            Amulyaa
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative" aria-label={`Cart with ${totalItems} items`}>
            <ShoppingBag className="h-5 w-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border md:hidden animate-fade-in">
          <ul className="container flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="block text-lg font-medium text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
