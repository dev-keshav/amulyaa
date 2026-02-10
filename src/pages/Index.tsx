import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Paintbrush, Palette, Frame, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

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

  const { data: featured } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    setSubscribing(false);
    if (error?.code === '23505') {
      toast.info('You\'re already subscribed!');
    } else if (error) {
      toast.error('Something went wrong. Please try again.');
    } else {
      toast.success('Welcome to the Atelier family!');
      setEmail('');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1920&q=80')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 container text-center px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Original Handmade<br />Paintings
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Each piece is a one-of-a-kind creation, painted by hand with premium materials and unwavering attention to detail.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/shop">
              Shop Originals <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="container py-24 px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">Featured Collection</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Curated highlights from our latest body of work.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured?.map((product) => (
            <Link
              key={product.id}
              to={`/shop/${product.slug}`}
              className="group block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600&q=80'}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">{product.style}</p>
                <h3 className="font-serif text-lg font-semibold text-foreground">{product.title}</h3>
                <p className="mt-1 text-base font-medium text-foreground">${product.price}</p>
              </div>
            </Link>
          ))}
          {!featured?.length && (
            <p className="col-span-full text-center text-muted-foreground">Loading featured paintings…</p>
          )}
        </div>
      </section>

      {/* How It's Made */}
      <section className="bg-secondary/50 py-24 px-4">
        <div className="container">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground text-center mb-16">How It's Made</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {processSteps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <step.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-24 px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground text-center mb-16">What Collectors Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground mb-4 italic leading-relaxed">"{t.text}"</p>
              <p className="text-sm font-medium text-muted-foreground">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-20 px-4">
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
              {subscribing ? '…' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Index;
