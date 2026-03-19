import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Frame, Paintbrush, Palette, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import CloudinaryImage from '@/components/media/CloudinaryImage';
import Reveal from '@/components/animation/Reveal';
import { products } from '@/data/products';
import { sketches as sketchPieces } from '@/data/sketches';
import { cn } from '@/lib/utils';
import SEOMeta from '@/components/SEOMeta';

const MotionLink = motion(Link);

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'The painting transformed our living room. The layering and finish feel even better in person.',
    rating: 5,
  },
  {
    name: 'James K.',
    text: 'Everything from the packaging to the framing felt thoughtful. It arrived ready to hang and immediately set the tone of the room.',
    rating: 5,
  },
  {
    name: 'Elena R.',
    text: 'There is real depth in the brushwork. It feels like a collector piece, not a decorative filler.',
    rating: 5,
  },
];

const processSteps = [
  {
    icon: Paintbrush,
    title: 'Concept and sketch',
    description: 'Each work begins with studies focused on movement, scale, and emotional temperature.',
  },
  {
    icon: Palette,
    title: 'Palette building',
    description: 'Pigments are layered deliberately so the final piece holds nuance from every angle.',
  },
  {
    icon: Frame,
    title: 'Studio finishing',
    description: 'Every original is sealed, signed, and prepared for clean, gallery-ready installation.',
  },
];

const studioStats = [
  { value: `${products.length}+`, label: 'Works on view' },
  { value: '100%', label: 'Original hand-painted' },
  { value: 'Worldwide', label: 'Collector shipping' },
];

const Index = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const featuredProducts = products.filter((product) => product.featured).slice(0, 6);
  const heroPrimary = featuredProducts[0];
  const heroSecondary = featuredProducts[1] ?? featuredProducts[0];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Welcome to the Amulyaa collectors list.');
    setEmail('');
    setSubscribing(false);
  };

  return (
    <>
      <SEOMeta
        title="Original Hand-Painted Art for Intentional Interiors"
        description="Amulyaa is a Brooklyn-based studio creating original hand-painted works — expressive, tactile, gallery-ready paintings for homes and hospitality spaces worldwide."
        canonical="/"
        ogType="website"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Amulyaa',
          url: 'https://www.amulyaa.art',
          description: 'Original hand-painted art for intentional interiors.',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.amulyaa.art/shop?search={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <motion.section
        className="container px-4 pb-16 pt-10 md:pb-20 md:pt-14"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-10 md:px-10 md:py-14 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
          style={{
            background: 'linear-gradient(148deg, hsl(18 28% 14%) 0%, hsl(20 32% 19%) 55%, hsl(22 30% 22%) 100%)',
            boxShadow: '0 8px 32px -8px rgba(14,8,4,0.5), 0 50px 100px -50px rgba(14,8,4,0.7)',
          }}
        >
          {/* Background decorative orbs */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 55% 45% at 0% 0%, rgba(255,180,100,0.13), transparent 55%),
                radial-gradient(ellipse 40% 40% at 100% 100%, rgba(226,138,88,0.2), transparent 48%),
                radial-gradient(ellipse 30% 30% at 60% 50%, rgba(147,100,60,0.08), transparent 40%)
              `,
            }}
          />

          {/* Left content */}
          <div className="relative z-10 max-w-2xl">
            <p
              className="text-[0.68rem] font-semibold uppercase tracking-[0.38em]"
              style={{ color: 'rgba(240,210,180,0.62)' }}
            >
              Collected originals for intentional interiors
            </p>

            <h1
              className="mt-6 font-serif font-semibold tracking-[-0.05em] gradient-text"
              style={{ fontSize: 'clamp(3.2rem, 7vw, 5.6rem)', lineHeight: 0.92 }}
            >
              Paintings with studio depth and a gallery finish.
            </h1>

            <p
              className="mt-7 max-w-xl text-base leading-[1.85] md:text-lg"
              style={{ color: 'rgba(240,215,190,0.72)' }}
            >
              Amulyaa pairs expressive mark-making with restrained palettes, creating originals that feel tactile, warm, and quietly striking in a room.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="btn-glow relative overflow-hidden font-semibold"
                style={{
                  background: 'linear-gradient(135deg, hsl(22 82% 50%) 0%, hsl(28 90% 58%) 100%)',
                  color: 'hsl(36 38% 97%)',
                  border: 'none',
                  boxShadow: '0 8px 24px -8px hsl(22 82% 50% / 0.6), 0 2px 4px rgba(0,0,0,0.15)',
                }}
              >
                <Link to="/shop">
                  Explore the collection <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                style={{
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'rgba(240,215,190,0.9)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Link to="/about">Enter the studio</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-11 grid gap-3 sm:grid-cols-3">
              {studioStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.75rem] p-4 backdrop-blur-sm"
                  style={{
                    border: '1px solid rgba(255,255,255,0.10)',
                    background: 'rgba(255,255,255,0.06)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                >
                  <p
                    className="text-[0.66rem] font-semibold uppercase tracking-[0.28em]"
                    style={{ color: 'rgba(240,210,180,0.55)' }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="mt-3 font-serif text-3xl font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, hsl(36 38% 92%) 0%, hsl(28 80% 78%) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating info cards */}
          <div className="relative mt-12 min-h-[28rem] lg:mt-0 lg:min-h-[36rem]">
            {/* Large decorative glow orb */}
            <div
              className="absolute right-[5%] top-[5%] h-64 w-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(226,138,88,0.35), transparent 70%)' }}
            />
            <div
              className="absolute bottom-[5%] left-[10%] h-40 w-40 rounded-full blur-2xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(147,180,155,0.25), transparent 70%)' }}
            />

            {/* Primary card */}
            <motion.div
              className="absolute right-0 top-0 w-[86%] rounded-[2.2rem] p-8 backdrop-blur-xl"
              style={{
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'linear-gradient(148deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.07) 100%)',
                boxShadow: '0 32px 72px -32px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
              initial={false}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <div
                className="flex items-center justify-between gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'rgba(240,210,180,0.62)' }}
              >
                <span>Current highlight</span>
                <span>{heroPrimary?.style ?? 'Featured'}</span>
              </div>
              <p
                className="mt-10 max-w-sm font-serif font-semibold"
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.2rem)',
                  lineHeight: 0.93,
                  color: 'hsl(36 38% 94%)',
                }}
              >
                {heroPrimary?.title ?? 'Celestial Dusk'}
              </p>
              <p
                className="mt-5 max-w-md text-sm leading-[1.75]"
                style={{ color: 'rgba(240,215,190,0.72)' }}
              >
                {heroPrimary?.description ?? 'Layered, atmospheric originals designed to give a room an anchor rather than just more decoration.'}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-5 py-2 text-sm font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, hsl(22 82% 50% / 0.85) 0%, hsl(28 90% 58% / 0.8) 100%)',
                    color: 'hsl(36 38% 97%)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 6px 18px -6px hsl(22 82% 50% / 0.6)',
                  }}
                >
                  ${heroPrimary?.price ?? 2400}
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'rgba(240,210,180,0.55)' }}
                >
                  Original work, ready to collect
                </span>
              </div>
            </motion.div>

            {/* Secondary card */}
            <motion.div
              className="absolute bottom-0 left-0 w-[60%] rounded-[2rem] p-6 backdrop-blur-xl"
              style={{
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.09)',
                boxShadow: '0 28px 64px -28px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
              initial={false}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.9, delay: 0.38 }}
            >
              <p
                className="text-[0.68rem] font-semibold uppercase tracking-[0.28em]"
                style={{ color: 'rgba(240,210,180,0.6)' }}
              >
                Collector cue
              </p>
              <p
                className="mt-4 font-serif text-3xl font-semibold"
                style={{ color: 'hsl(36 38% 94%)' }}
              >
                {heroSecondary?.title ?? 'Golden Horizon'}
              </p>
              <div
                className="mt-5 grid gap-3 text-sm"
                style={{ color: 'rgba(240,215,190,0.72)' }}
              >
                {[
                  { label: 'Style', value: heroSecondary?.style ?? 'Landscape' },
                  { label: 'Scale', value: heroSecondary?.size ?? 'Medium' },
                  { label: 'From', value: `$${heroSecondary?.price ?? 1450}` },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 border-b pb-3 last:border-b-0 last:pb-0"
                    style={{ borderColor: 'rgba(255,255,255,0.10)' }}
                  >
                    <span>{label}</span>
                    <span className="font-semibold" style={{ color: 'hsl(36 38% 92%)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── Featured Collection ── */}
      <section className="container px-4 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Featured collection</p>
              <h2 className="section-heading mt-5">Current pieces from the studio wall.</h2>
              <p className="section-copy mt-4">
                A rotating selection of originals chosen for their range of palette, mood, and scale.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link to="/shop">View all originals</Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-11 grid gap-5 lg:grid-cols-12">
          {featuredProducts.map((product, index) => (
            <MotionLink
              key={product.id}
              to={`/shop/${product.slug}`}
              className={cn(
                'surface-panel card-hover group block p-2.5',
                index === 0 ? 'lg:col-span-3' : 'lg:col-span-3',
              )}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className={cn('overflow-hidden rounded-[1.5rem]', index === 0 ? 'aspect-[5/4]' : 'aspect-[4/4.7]')}>
                <CloudinaryImage
                  publicId={product.images[0]}
                  width={900}
                  height={1100}
                  alt={product.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </div>

              <div className="mt-4 flex items-start justify-between gap-3 px-2 pb-2">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    {product.style}
                  </p>
                  <h3 className="mt-2 font-serif text-[1.85rem] font-semibold text-foreground leading-tight">
                    {product.title}
                  </h3>
                  <p className="mt-2.5 max-w-sm text-sm leading-[1.7] text-muted-foreground">
                    {product.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span
                    className="inline-block rounded-full px-3 py-1.5 text-xs font-semibold"
                    style={{
                      background: 'linear-gradient(135deg, hsl(22 82% 50% / 0.12) 0%, hsl(28 90% 58% / 0.10) 100%)',
                      border: '1px solid hsl(22 82% 50% / 0.25)',
                      color: 'hsl(22 70% 40%)',
                    }}
                  >
                    ${product.price}
                  </span>
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </section>

      {/* ── Studio Process ── */}
      <section className="container deferred-section px-4 py-10 md:py-16">
        <div className="surface-panel px-6 py-10 md:px-10 md:py-14">
          <Reveal>
            <div className="max-w-2xl">
              <p className="section-kicker">Studio process</p>
              <h2 className="section-heading mt-5">Built by hand, layered with intention.</h2>
              <p className="section-copy mt-4">
                The collection is designed like a slow editorial series, where sketches, pigment studies, and final canvases all inform one another.
              </p>
            </div>
          </Reveal>

          <div className="mt-11 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.1}>
                <div className="surface-panel-muted group h-full p-7 transition-all duration-300 hover:shadow-lg">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, hsl(22 82% 50% / 0.15) 0%, hsl(28 90% 58% / 0.10) 100%)',
                      border: '1px solid hsl(22 82% 50% / 0.2)',
                      boxShadow: '0 0 0 0 hsl(22 82% 50% / 0)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 4px hsl(22 82% 50% / 0.12), 0 8px 24px -8px hsl(22 82% 50% / 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 0 hsl(22 82% 50% / 0)';
                    }}
                  >
                    <step.icon className="h-6 w-6" style={{ color: 'hsl(22 82% 50%)' }} />
                  </div>
                  <h3 className="mt-7 font-serif text-3xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-4 text-sm leading-[1.8] text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sketchbook ── */}
      <section className="container deferred-section px-4 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Inside the sketchbook</p>
              <h2 className="section-heading mt-5">Studies that shape the finished work.</h2>
              <p className="section-copy mt-4">
                Texture rehearsals, palette notes, and compositional tests from the drafting table.
              </p>
            </div>
            <div className="info-chip shrink-0">Fresh studio observations</div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {sketchPieces.map((piece, index) => (
            <Reveal key={`${piece.id}-${piece.title}`} delay={index * 0.07}>
              <figure className="surface-panel card-hover group p-3">
                <div className="aspect-[3/4] overflow-hidden rounded-[1.6rem]">
                  <CloudinaryImage
                    publicId={piece.publicId}
                    width={900}
                    height={1100}
                    alt={`${piece.title} sketch ${index + 1}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-2 pb-2 pt-5">
                  <p className="font-serif text-3xl font-semibold text-foreground">{piece.title}</p>
                  <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    {piece.medium}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="container deferred-section px-4 py-16 md:py-20">
        <Reveal>
          <div className="text-center">
            <p className="section-kicker justify-center">Collector feedback</p>
            <h2 className="section-heading mt-5">What arrives in the room matters.</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1}>
              <div
                className="surface-panel h-full p-8"
                style={{
                  background: index === 1
                    ? 'linear-gradient(148deg, hsl(22 30% 18% / 0.97) 0%, hsl(18 28% 22% / 0.95) 100%)'
                    : undefined,
                }}
              >
                {index === 1 && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[2rem]"
                    style={{
                      background: 'radial-gradient(ellipse 60% 50% at 50% 0%, hsl(22 82% 50% / 0.15), transparent 55%)',
                    }}
                  />
                )}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-4 w-4"
                      style={{ fill: 'hsl(22 82% 50%)', color: 'hsl(22 82% 50%)' }}
                    />
                  ))}
                </div>
                <p
                  className="mt-6 text-lg leading-[1.8]"
                  style={{ color: index === 1 ? 'hsl(36 30% 90%)' : undefined }}
                >
                  "{testimonial.text}"
                </p>
                <p
                  className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                  style={{ color: index === 1 ? 'hsl(30 20% 65%)' : undefined }}
                >
                  {testimonial.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="container deferred-section px-4 pb-10 pt-8 md:pb-14">
        <Reveal>
          <div
            className="surface-panel relative overflow-hidden px-6 py-10 md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:px-10 md:py-12"
          >
            {/* Decorative accent strip */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, hsl(22 82% 50% / 0.6) 25%, hsl(28 90% 62% / 0.8) 50%, hsl(22 82% 50% / 0.6) 75%, transparent 100%)',
              }}
            />
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, hsl(22 82% 50% / 0.10), transparent)' }}
            />

            <div className="relative">
              <p className="section-kicker">Collectors list</p>
              <h2 className="section-heading mt-5">Get first access to new releases and studio notes.</h2>
              <p className="section-copy mt-4">
                Occasional updates only. Expect previews, process images, and first access to new originals.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="relative mt-8 flex flex-col gap-4 md:mt-0 md:self-center">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-border/70 bg-background/70 px-4 text-base focus:border-accent focus:ring-accent/25"
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="submit"
                  disabled={subscribing}
                  className="btn-glow h-12 rounded-xl px-8 text-base font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, hsl(22 82% 50%) 0%, hsl(28 90% 58%) 100%)',
                    color: 'hsl(36 38% 97%)',
                    border: 'none',
                  }}
                >
                  {subscribing ? 'Subscribing...' : 'Join the list'}
                </Button>
                <div className="info-chip justify-center text-center text-xs">
                  Studio dispatches & new collection drops
                </div>
              </div>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Index;
