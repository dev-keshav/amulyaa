import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Truck } from 'lucide-react';
import { toast } from 'sonner';
import CloudinaryImage from '@/components/media/CloudinaryImage';
import { buildCloudinaryUrl } from '@/lib/cloudinary';
import { getProductBySlug, getRelatedProducts, products } from '@/data/products';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const product = slug ? getProductBySlug(slug) : undefined;
  const related = product ? getRelatedProducts(product, 3) : products.slice(0, 3);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-serif text-3xl text-foreground mb-4">Painting not found</h1>
        <Button asChild variant="outline"><Link to="/shop">Back to Shop</Link></Button>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ['cld-sample-5'];
  const availableStock = typeof product.stock === 'number' ? product.stock : 1;
  const inStock = availableStock > 0;

  const handleAddToCart = () => {
    if (!inStock) {
      toast.info('This piece is currently sold out.');
      return;
    }

    const units = Math.min(quantity, availableStock);
    for (let i = 0; i < units; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: buildCloudinaryUrl(images[0], { width: 800, height: 800 }),
        size: product.size || '',
      });
    }
    toast.success(`Added ${units} x "${product.title}" to cart`);
  };

  return (
    <div className="container py-12 px-4">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="aspect-square overflow-hidden rounded-lg border border-border mb-4">
            <CloudinaryImage
              publicId={images[selectedImage]}
              width={1200}
              height={1200}
              alt={product.title}
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(i)}
                  className={`h-20 w-20 overflow-hidden rounded border-2 transition-colors ${
                    i === selectedImage ? 'border-accent' : 'border-border'
                  }`}
                >
                  <CloudinaryImage
                    publicId={img}
                    width={200}
                    height={200}
                    alt=""
                    className="h-full w-full object-cover"
                  />
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
            <div><span className="text-muted-foreground">Stock:</span> <span className="text-foreground">{inStock ? `${availableStock} available` : 'Sold out'}</span></div>
          </div>

          {inStock && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2"><Minus className="h-4 w-4" /></button>
                <span className="px-4 text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(availableStock, quantity + 1))} className="p-2"><Plus className="h-4 w-4" /></button>
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
                  <CloudinaryImage
                    publicId={p.images[0]}
                    width={600}
                    height={750}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
