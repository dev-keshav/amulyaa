import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t border-border bg-secondary/50 mt-20">
    <div className="container py-16">
      <div className="grid gap-12 md:grid-cols-4">
        <div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Atelier</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Original handmade paintings crafted with passion. Each piece tells a unique story.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground transition-colors">All Paintings</Link></li>
            <li><Link to="/shop?style=abstract" className="hover:text-foreground transition-colors">Abstract</Link></li>
            <li><Link to="/shop?style=landscape" className="hover:text-foreground transition-colors">Landscape</Link></li>
            <li><Link to="/shop?style=portrait" className="hover:text-foreground transition-colors">Portrait</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shipping-returns" className="hover:text-foreground transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Atelier. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
