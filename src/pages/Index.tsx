import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Frame, Paintbrush, Palette, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import CloudinaryImage from '@/components/media/CloudinaryImage';
import Reveal from '@/components/animation/Reveal';
import { products } from '@/data/products';
import { sketches as sketchPieces } from '@/data/sketches';
import { cn } from '@/lib/utils';

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
      <motion.section
        className="container px-4 pb-16 pt-10 md:pb-20 md:pt-14"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative overflow-hidden rounded-[2.25rem] bg-primary px-6 py-8 text-primary-foreground shadow-[0_40px_90px_-45px_rgba(40,25,18,0.9)] md:px-10 md:py-12 lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(226,138,88,0.18),transparent_28%)]" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary-foreground/70">
              Collected originals for intentional interiors
            </p>
            <h1 className="mt-6 font-serif text-6xl font-semibold tracking-[-0.05em] text-primary-foreground sm:text-7xl lg:text-[5.4rem]">
              Paintings with studio depth and a gallery finish.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-primary-foreground/76 md:text-lg">
              Amulyaa pairs expressive mark-making with restrained palettes, creating originals that feel tactile, warm, and quietly striking in a room.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/92">
                <Link to="/shop">
                  Explore the collection <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 bg-white/10 text-primary-foreground hover:bg-white/18"
              >
                <Link to="/about">Enter the studio</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {studioStats.map((stat) => (
                <div key={stat.label} className="rounded-[1.6rem] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary-foreground/64">
                    {stat.label}
                  </p>
                  <p className="mt-3 font-serif text-3xl text-primary-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-12 min-h-[28rem] lg:mt-0 lg:min-h-[34rem]">
            <div
              aria-hidden="true"
              className="absolute right-[8%] top-[2%] h-40 w-40 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-[8%] right-[16%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(226,138,88,0.4),transparent_70%)] blur-xl"
            />

            <motion.div
              className="absolute right-0 top-0 w-[84%] rounded-[2rem] border border-white/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] p-8 shadow-[0_28px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md"
              initial={{ opacity: 0, x: 24, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center justify-between gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-primary-foreground/68">
                <span>Current highlight</span>
                <span>{heroPrimary?.style ?? 'Featured'}</span>
              </div>
              <p className="mt-10 max-w-sm font-serif text-5xl leading-[0.95] text-primary-foreground sm:text-6xl">
                {heroPrimary?.title ?? 'Celestial Dusk'}
              </p>
              <p className="mt-5 max-w-md text-sm leading-7 text-primary-foreground/78">
                {heroPrimary?.description ??
                  'Layered, atmospheric originals designed to give a room an anchor rather than just more decoration.'}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-semibold text-primary-foreground">
                  ${heroPrimary?.price ?? 2400}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/62">
                  Original work, ready to collect
                </span>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 w-[58%] rounded-[1.8rem] border border-white/12 bg-[rgba(255,255,255,0.08)] p-6 shadow-[0_24px_56px_-30px_rgba(0,0,0,0.55)] backdrop-blur-md"
              initial={{ opacity: 0, x: -28, y: 24 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-primary-foreground/68">
                Collector cue
              </p>
              <p className="mt-4 font-serif text-3xl text-primary-foreground">
                {heroSecondary?.title ?? 'Golden Horizon'}
              </p>
              <div className="mt-5 grid gap-3 text-sm text-primary-foreground/78">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <span>Style</span>
                  <span className="font-semibold text-primary-foreground">
                    {heroSecondary?.style ?? 'Landscape'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <span>Scale</span>
                  <span className="font-semibold text-primary-foreground">
                    {heroSecondary?.size ?? 'Medium'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>From</span>
                  <span className="font-semibold text-primary-foreground">
                    ${heroSecondary?.price ?? 1450}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* <motion.div
              className="absolute left-[12%] top-[12%] max-w-[16rem] rounded-[1.5rem] border border-white/12 bg-[rgba(255,255,255,0.12)] p-5 backdrop-blur-md"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-primary-foreground/70">
                <Sparkles className="h-3.5 w-3.5" />
                Studio note
              </div>
              <p className="mt-3 text-sm leading-7 text-primary-foreground/82">
                Built for spaces that need an anchor piece rather than background decoration.
              </p>
            </motion.div> */}
          </div>
        </div>
      </motion.section>

      <section className="container px-4 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Featured collection</p>
              <h2 className="section-heading mt-4">Current pieces from the studio wall.</h2>
              <p className="section-copy mt-4">
                A rotating selection of originals chosen for their range of palette, mood, and scale.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/shop">View all originals</Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {featuredProducts.map((product, index) => (
            <MotionLink
              key={product.id}
              to={`/shop/${product.slug}`}
              className={cn(
                'surface-panel group block p-2.5',
                index === 0
                  ? 'lg:col-span-3'
                  : index === 1
                    ? 'lg:col-span-3'
                    : 'lg:col-span-3',
              )}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ translateY: -6 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div
                className={cn(
                  'overflow-hidden rounded-[1.45rem]',
                  index === 0 ? 'aspect-[5/4]' : 'aspect-[4/4.7]',
                )}
              >
                <CloudinaryImage
                  publicId={product.images[0]}
                  width={900}
                  height={1100}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="mt-4 flex items-start justify-between gap-3 px-2 pb-2">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {product.style}
                  </p>
                  <h3 className="mt-2 font-serif text-[1.9rem] text-foreground">{product.title}</h3>
                  <p className="mt-2.5 max-w-sm text-sm leading-6 text-muted-foreground">
                    {product.description}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="info-chip px-3 py-1.5 text-xs">${product.price}</span>
                </div>
              </div>
            </MotionLink>
          ))}
        </div>
      </section>

      <section className="container px-4 py-10 md:py-16">
        <div className="surface-panel px-6 py-8 md:px-10 md:py-12">
          <Reveal>
            <div className="max-w-2xl">
              <p className="section-kicker">Studio process</p>
              <h2 className="section-heading mt-4">Built by hand, layered with intention.</h2>
              <p className="section-copy mt-4">
                The collection is designed like a slow editorial series, where sketches, pigment studies, and final canvases all inform one another.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <div className="surface-panel-muted h-full p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/12">
                    <step.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mt-6 font-serif text-3xl text-foreground">{step.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container px-4 py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Inside the sketchbook</p>
              <h2 className="section-heading mt-4">Studies that shape the finished work.</h2>
              <p className="section-copy mt-4">
                Texture rehearsals, palette notes, and compositional tests from the drafting table.
              </p>
            </div>
            <div className="info-chip">Fresh studio observations</div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {sketchPieces.map((piece, index) => (
            <Reveal key={`${piece.id}-${piece.title}`} delay={index * 0.06}>
              <figure className="surface-panel group p-3">
                <div className="aspect-[3/4] overflow-hidden rounded-[1.6rem]">
                  <CloudinaryImage
                    publicId={piece.publicId}
                    width={900}
                    height={1100}
                    alt={`${piece.title} sketch ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-2 pb-2 pt-5">
                  <p className="font-serif text-3xl text-foreground">{piece.title}</p>
                  <p className="mt-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    {piece.medium}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container px-4 py-16 md:py-20">
        <Reveal>
          <div className="text-center">
            <p className="section-kicker">Collector feedback</p>
            <h2 className="section-heading mt-4">What arrives in the room matters.</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <div className="surface-panel h-full p-8">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-6 text-lg leading-8 text-foreground">"{testimonial.text}"</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {testimonial.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container px-4 pb-10 pt-8 md:pb-14">
        <Reveal>
          <div className="surface-panel px-6 py-8 md:grid md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:px-10 md:py-10">
            <div>
              <p className="section-kicker">Collectors list</p>
              <h2 className="section-heading mt-4">Get first access to new releases and studio notes.</h2>
              <p className="section-copy mt-4">
                Occasional updates only. Expect previews, process images, and first access to new originals.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-8 flex flex-col gap-4 md:mt-0 md:self-center">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="submit"
                  disabled={subscribing}
                  className="bg-accent text-accent-foreground hover:bg-accent/92"
                >
                  {subscribing ? 'Subscribing...' : 'Join the list'}
                </Button>
                <div className="info-chip justify-center text-center">
                  New collection announcements and studio dispatches
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
