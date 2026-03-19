import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Sparkles, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import CloudinaryImage from '@/components/media/CloudinaryImage';
import { buildCloudinaryUrl } from '@/lib/cloudinary';
import { getProductBySlug, getRelatedProducts, products } from '@/data/products';
import Reveal from '@/components/animation/Reveal';
import PageHero from '@/components/layout/PageHero';
import SEOMeta from '@/components/SEOMeta';

const MotionLink = motion(Link);

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const product = slug ? getProductBySlug(slug) : undefined;
  const related = product ? getRelatedProducts(product, 3) : products.slice(0, 3);

  if (!product) {
    return (
      <PageHero
        compact
        centered
        eyebrow="Collection archive"
        title="That painting is no longer on display."
        description="The piece may have been collected or the link may be out of date. Browse the current wall of originals instead."
        actions={(
          <Button asChild>
            <Link to="/shop">Back to shop</Link>
          </Button>
        )}
      />
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

    for (let index = 0; index < units; index += 1) {
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
    <>
      <section className="container px-4 pb-16 pt-8">
      <SEOMeta
        title={`${product.title} — Original ${product.style} Painting`}
        description={product.description ?? `${product.title} is an original ${product.style?.toLowerCase()} painting by Amulyaa. ${product.size} format, hand-painted and gallery-ready. Ships worldwide.`}
        canonical={`/shop/${product.slug}`}
        ogType="product"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
          description: product.description,
          image: buildCloudinaryUrl(product.images?.[0] ?? '', { width: 1200, height: 1200 }),
          brand: { '@type': 'Brand', name: 'Amulyaa' },
          category: product.style,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'USD',
            availability: (product.stock ?? 0) > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/SoldOut',
            url: `https://www.amulyaa.art/shop/${product.slug}`,
            seller: { '@type': 'Organization', name: 'Amulyaa' },
          },
        }}
      />
      <div className="mb-8">
        <Link
          to="/shop"
          className="info-chip hover:border-border hover:bg-background/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to collection
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.04fr_0.96fr] xl:items-start">
        <Reveal className="space-y-4">
          <div className="surface-panel p-4">
            <div className="aspect-square overflow-hidden rounded-[1.8rem]">
              <CloudinaryImage
                publicId={images[selectedImage]}
                width={1400}
                height={1400}
                alt={product.title}
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1280px) 100vw, 52vw"
              />
            </div>
          </div>

          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, index) => (
                <motion.button
                  key={image}
                  onClick={() => setSelectedImage(index)}
                  className={`surface-panel p-2 ${index === selectedImage ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''
                    }`}
                  whileHover={{ translateY: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-square overflow-hidden rounded-[1.2rem]">
                    <CloudinaryImage
                      publicId={image}
                      width={240}
                      height={240}
                      alt=""
                      sizes="(max-width: 1280px) 20vw, 10vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.08} className="xl:sticky xl:top-28">
          <div className="surface-panel p-8">
            <div className="flex flex-wrap gap-2">
              <span className="info-chip">{product.style}</span>
              <span className="info-chip">{product.size}</span>
              <span className="info-chip">{inStock ? `${availableStock} available` : 'Sold out'}</span>
            </div>

            <h1 className="mt-6 font-serif text-5xl text-foreground md:text-6xl">{product.title}</h1>
            <p className="mt-4 text-2xl font-semibold text-foreground">${product.price}</p>
            <p className="mt-6 text-base leading-8 text-muted-foreground">{product.description}</p>

            <div className="surface-panel-muted mt-8 grid gap-4 p-5 sm:grid-cols-2">
              {product.materials && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Materials</p>
                  <p className="mt-2 text-sm text-foreground">{product.materials}</p>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Dimensions</p>
                  <p className="mt-2 text-sm text-foreground">{product.dimensions}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Availability</p>
                <p className="mt-2 text-sm text-foreground">
                  {inStock ? `Ready to ship in 3-5 business days` : 'Currently archived'}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Framing</p>
                <p className="mt-2 text-sm text-foreground">Finished and prepared for display.</p>
              </div>
            </div>

            {inStock && (
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="surface-panel-muted flex items-center justify-between gap-4 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full p-2 text-foreground transition-colors hover:bg-background/80"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                    className="rounded-full p-2 text-foreground transition-colors hover:bg-background/80"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-accent text-accent-foreground hover:bg-accent/92"
                >
                  Add to cart
                </Button>
              </div>
            )}

            <div className="surface-panel-muted mt-8 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-accent/12">
                  <Truck className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Shipping and care</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Free shipping on orders over $500. Pieces are professionally packed and insured for transit.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              Original only. No prints or reproductions.
            </div>
          </div>
        </Reveal>
      </div>
      </section>

      {related.length > 0 && (
        <section className="container px-4 pb-16 pt-8">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-kicker">Related works</p>
                <h2 className="section-heading mt-4">More pieces with a similar mood.</h2>
              </div>
              <Button asChild variant="outline">
                <Link to="/shop">Browse all works</Link>
              </Button>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((item, index) => (
              <MotionLink
                key={item.id}
                to={`/shop/${item.slug}`}
                className="surface-panel group block p-3"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ translateY: -6 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                  <CloudinaryImage
                    publicId={item.images[0]}
                    width={800}
                    height={1000}
                    alt={item.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="px-2 pb-2 pt-5">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {item.style}
                  </p>
                  <h3 className="mt-3 font-serif text-3xl text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm text-foreground">${item.price}</p>
                </div>
              </MotionLink>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetail;
