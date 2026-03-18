import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-24 px-4 pb-8 pt-4">
    <div className="container">
      <div className="surface-panel px-6 py-10 md:px-10 md:py-12">
        <div className="grid gap-10 border-b border-border/70 pb-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="section-kicker">Studio journal</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold text-foreground sm:text-6xl">
              Art that feels collected, not mass produced.
            </h2>
            <p className="section-copy mt-5 max-w-xl">
              Amulyaa creates original works for homes, hospitality spaces, and private collections with a slower, more tactile point of view.
            </p>
          </div>
          <div className="surface-panel-muted p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Visit or enquire
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Brooklyn studio appointments by request.
              <br />
              hello@amulyaa.art
            </p>
          </div>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-4">
          <div>
            <h3 className="font-serif text-3xl font-semibold text-foreground">Amulyaa</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Original handmade paintings, studies, and curated commissions shaped for intentional interiors.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">Shop</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground">All paintings</Link></li>
              <li><Link to="/shop?style=abstract" className="hover:text-foreground">Abstract</Link></li>
              <li><Link to="/shop?style=landscape" className="hover:text-foreground">Landscape</Link></li>
              <li><Link to="/shop?style=portrait" className="hover:text-foreground">Portrait</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-foreground">Policies</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><Link to="/shipping-returns" className="hover:text-foreground">Shipping & returns</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground">Privacy policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground">Terms of service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>(c) {new Date().getFullYear()} Amulyaa. All rights reserved.</p>
          <p>Originals, commissions, and shipping support worldwide.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
