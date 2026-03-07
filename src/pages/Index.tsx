import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Paintbrush, Palette, Frame, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import CloudinaryImage from '@/components/media/CloudinaryImage';
import { products } from '@/data/products';
import { sketches as sketchPieces } from '@/data/sketches';
import { motion } from 'framer-motion';
import Reveal from '@/components/animation/Reveal';

const MotionLink = motion(Link);

const testimonials = [
  { name: 'Sarah M.', text: 'The painting transformed our living room. Absolutely stunning craftsmanship.', rating: 5 },
  { name: 'James K.', text: 'I\'ve never seen such vibrant colors in a handmade piece. Worth every penny.', rating: 5 },
  { name: 'Elena R.', text: 'The artist\'s attention to detail is remarkable. A true masterpiece.', rating: 5 },
];

const processSteps = [
  { icon: Paintbrush, title: 'Concept & Sketch', description: 'Every piece begins with a hand-drawn sketch capturing the vision and emotion.' },
  { icon: Palette, title: 'Color & Composition', description: 'Premium pigments are carefully mixed to achieve the perfect palette for each work.' },
  { icon: Frame, title: 'Finishing & Framing', description: 'Each painting is sealed, signed, and gallery-framed for lasting beauty.' },
];

const Index = () => {
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const featuredProducts = products.filter((product) => product.featured).slice(0, 6);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Welcome to the Atelier family!');
    setEmail('');
    setSubscribing(false);
  };

  return (
    <>
      {/* Hero */}
      <motion.section
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-primary"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&q=80')] bg-cover bg-center opacity-30"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="relative z-10 container text-center px-4">
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-bold text-primary-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Original Handmade<br />Paintings
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            Each piece is a one-of-a-kind creation, painted by hand with premium materials and unwavering attention to detail.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8">
              <Link to="/shop">
                Shop Originals <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Collection */}
      <section className="container py-24 px-4">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">Featured Collection</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Curated highlights from our latest body of work.</p>
          </div>
        </Reveal>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <MotionLink
              key={product.id}
              to={`/shop/${product.slug}`}
              className="group block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ translateY: -6 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <CloudinaryImage
                  publicId={product.images[0]}
                  width={600}
                  height={750}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">{product.style}</p>
                <h3 className="font-serif text-lg font-semibold text-foreground">{product.title}</h3>
                <p className="mt-1 text-base font-medium text-foreground">${product.price}</p>
              </div>
            </MotionLink>
          ))}
        </div>
      </section>

      {/* How It's Made */}
      <section className="bg-secondary/50 py-24 px-4">
        <div className="container">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground text-center mb-16">How It's Made</h2>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <step.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sketch Gallery */}
      <section className="bg-background py-24 px-4">
        <div className="container">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Inside the sketchbook</p>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mt-3">
                  Fresh Studies From The Studio
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl">
                  A peek at the explorations that inform the finished originals - texture tests, palette rehearsals, and gesture work straight from the drafting table.
                </p>
              </div>
              <Button asChild variant="outline" className="self-start md:self-auto">
                <Link to="/shop">Collect The Final Pieces</Link>
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {sketchPieces.map((piece, index) => (
              <Reveal key={`${piece.id}-${piece.title}`} delay={index * 0.08}>
                <figure className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
                  <div className="aspect-[3/4] overflow-hidden">
                    <CloudinaryImage
                      publicId={piece.publicId}
                      width={800}
                      height={900}
                      alt={`${piece.title} sketch ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-6">
                    <p className="font-serif text-2xl text-foreground">{piece.title}</p>
                    <p className="text-sm uppercase tracking-wide text-muted-foreground mt-2">{piece.medium}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-24 px-4">
        <Reveal>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground text-center mb-16">What Collectors Say</h2>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="rounded-lg border border-border bg-card p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic leading-relaxed">"{t.text}"</p>
                <p className="text-sm font-medium text-muted-foreground">- {t.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-20 px-4">
        <Reveal>
          <div className="container max-w-xl text-center">
            <h2 className="font-serif text-3xl font-semibold text-primary-foreground mb-4">Join the Atelier</h2>
            <p className="text-primary-foreground/70 mb-8">Get early access to new collections, studio updates, and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button type="submit" disabled={subscribing} className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">
                {subscribing ? '...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Index;
