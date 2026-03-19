import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-24 px-2 pb-8 pt-4 md:px-3">
    <div className="container">
      <div
        className="relative overflow-hidden rounded-[2rem] px-6 py-10 md:px-10 md:py-12"
        style={{
          background: 'linear-gradient(148deg, hsl(18 28% 12%) 0%, hsl(20 30% 16%) 55%, hsl(22 26% 18%) 100%)',
          boxShadow: '0 8px 32px -8px rgba(14,8,4,0.45), 0 50px 90px -50px rgba(14,8,4,0.55)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Background ambient glows */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 0% 0%, rgba(226,138,88,0.12), transparent 50%),
              radial-gradient(ellipse 40% 35% at 100% 100%, rgba(147,100,60,0.10), transparent 45%)
            `,
          }}
        />

        {/* Decorative watermark "A" */}
        <div
          className="pointer-events-none absolute right-8 top-0 select-none font-serif opacity-[0.025]"
          style={{
            fontSize: 'clamp(12rem, 22vw, 22rem)',
            lineHeight: 1,
            color: 'hsl(36 38% 94%)',
            letterSpacing: '-0.05em',
          }}
          aria-hidden="true"
        >
          A
        </div>

        {/* Thin accent top stripe */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] rounded-t-[2rem]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, hsl(22 82% 50% / 0.5) 30%, hsl(28 90% 60% / 0.7) 50%, hsl(22 82% 50% / 0.5) 70%, transparent 100%)',
          }}
        />

        <div className="relative">
          {/* Top section */}
          <div
            className="grid gap-10 border-b pb-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div>
              <p
                className="text-[0.68rem] font-semibold uppercase tracking-[0.36em]"
                style={{ color: 'rgba(240,210,180,0.5)' }}
              >
                Studio journal
              </p>
              <h2
                className="mt-4 font-serif font-semibold"
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                  lineHeight: 0.93,
                  background: 'linear-gradient(120deg, hsl(36 38% 92%) 0%, hsl(30 50% 82%) 50%, hsl(22 70% 74%) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Art that feels collected, not mass produced.
              </h2>
              <p
                className="mt-5 max-w-xl text-base leading-[1.8] md:text-lg"
                style={{ color: 'rgba(240,215,190,0.58)' }}
              >
                Amulyaa creates original works for homes, hospitality spaces, and private collections with a slower, more tactile point of view.
              </p>
            </div>
            <div
              className="rounded-[1.75rem] p-6"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              <p
                className="text-sm font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'rgba(240,210,180,0.5)' }}
              >
                Visit or enquire
              </p>
              <p
                className="mt-4 text-sm leading-[1.8]"
                style={{ color: 'rgba(240,215,190,0.65)' }}
              >
                Brooklyn studio appointments by request.
                <br />
                <a
                  href="mailto:hello@amulyaa.art"
                  className="transition-colors"
                  style={{ color: 'hsl(22 70% 65%)', textDecoration: 'none' }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'hsl(22 82% 72%)')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'hsl(22 70% 65%)')}
                >
                  hello@amulyaa.art
                </a>
              </p>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid gap-10 pt-10 md:grid-cols-4">
            <div>
              <h3 className="font-serif text-3xl font-semibold" style={{ color: 'hsl(36 38% 92%)' }}>
                Amulyaa
              </h3>
              <p
                className="mt-4 text-sm leading-[1.8]"
                style={{ color: 'rgba(240,215,190,0.55)' }}
              >
                Original handmade paintings, studies, and curated commissions shaped for intentional interiors.
              </p>
            </div>

            {[
              {
                heading: 'Shop',
                links: [
                  { to: '/shop', label: 'All paintings' },
                  { to: '/favorites', label: 'Favorites' },
                  { to: '/shop?style=abstract', label: 'Abstract' },
                  { to: '/shop?style=landscape', label: 'Landscape' },
                  { to: '/shop?style=portrait', label: 'Portrait' },
                ],
              },
              {
                heading: 'Company',
                links: [
                  { to: '/about', label: 'About' },
                  { to: '/contact', label: 'Contact' },
                  { to: '/careers', label: 'Careers' },
                ],
              },
              {
                heading: 'Policies',
                links: [
                  { to: '/shipping-returns', label: 'Shipping & returns' },
                  { to: '/privacy', label: 'Privacy policy' },
                  { to: '/terms', label: 'Terms of service' },
                ],
              },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <h4
                  className="text-sm font-semibold uppercase tracking-[0.28em]"
                  style={{ color: 'rgba(240,210,180,0.6)' }}
                >
                  {heading}
                </h4>
                <ul className="mt-4 space-y-3 text-sm">
                  {links.map(({ to, label }) => (
                    <li key={to}>
                      <Link
                        to={to}
                        className="group inline-flex items-center gap-1 transition-colors"
                        style={{ color: 'rgba(240,215,190,0.48)' }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'hsl(36 38% 88%)')}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(240,215,190,0.48)')}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between"
            style={{ borderColor: 'rgba(255,255,255,0.07)', color: 'rgba(240,215,190,0.38)' }}
          >
            <p>© {new Date().getFullYear()} Amulyaa. All rights reserved.</p>
            <p>Originals, commissions, and shipping support worldwide.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
