import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Truck } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const { data: related } = useQuery({
    queryKey: ['related', product?.style],
    enabled: !!product,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('style', product!.style)
        .neq('id', product!.id)
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="container py-20 px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-lg bg-muted" />
          <div className="space-y-4">
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="h-6 w-24 animate-pulse rounded bg-muted" />
            <div className="h-24 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-3xl text-foreground mb-4">Painting not found</h1>
        <Button asChild variant="outline"><Link to="/shop">Back to Shop</Link></Button>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ['https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&q=80'];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: images[0],
        size: product.size || '',
      });
    }
    toast.success(`Added ${quantity} × "${product.title}" to cart`);
  };

  return (
    <div className="container py-12 px-4">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-square overflow-hidden rounded-lg border border-border mb-4">
            <img src={images[selectedImage]} alt={product.title} className="h-full w-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`h-20 w-20 overflow-hidden rounded border-2 transition-colors ${
                    i === selectedImage ? 'border-accent' : 'border-border'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">{product.style}</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{product.title}</h1>
          <p className="text-2xl font-semibold text-foreground mb-6">${product.price}</p>

          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            {product.materials && <div><span className="text-muted-foreground">Materials:</span> <span className="text-foreground">{product.materials}</span></div>}
            {product.dimensions && <div><span className="text-muted-foreground">Dimensions:</span> <span className="text-foreground">{product.dimensions}</span></div>}
            {product.size && <div><span className="text-muted-foreground">Size:</span> <span className="text-foreground capitalize">{product.size}</span></div>}
            <div><span className="text-muted-foreground">Stock:</span> <span className="text-foreground">{product.stock > 0 ? `${product.stock} available` : 'Sold out'}</span></div>
          </div>

          {product.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2"><Minus className="h-4 w-4" /></button>
                <span className="px-4 text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-2"><Plus className="h-4 w-4" /></button>
              </div>
              <Button onClick={handleAddToCart} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                Add to Cart
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-muted-foreground border-t border-border pt-6">
            <Truck className="h-4 w-4" />
            <span>Free shipping on orders over $500. Ships within 3-5 business days.</span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related && related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-serif text-2xl font-semibold text-foreground mb-8">You May Also Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link key={p.id} to={`/shop/${p.slug}`} className="group block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600&q=80'} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 font-medium text-foreground">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
