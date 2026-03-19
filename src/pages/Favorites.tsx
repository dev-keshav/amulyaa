import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useFavoritesStore, type FavoriteItem } from '@/stores/favoritesStore';
import { useCartStore } from '@/stores/cartStore';
import { buildCloudinaryUrl } from '@/lib/cloudinary';
import { Button } from '@/components/ui/button';
import CloudinaryImage from '@/components/media/CloudinaryImage';
import Reveal from '@/components/animation/Reveal';
import PageHero from '@/components/layout/PageHero';
import SEOMeta from '@/components/SEOMeta';

const Favorites = () => {
  const { items, removeItem, totalItems } = useFavoritesStore();
  const addItem = useCartStore((state) => state.addItem);

  const savedCount = totalItems();
  const representedStyles = new Set(items.map((item) => item.style)).size;
  const averagePrice = savedCount > 0
    ? Math.round(items.reduce((sum, item) => sum + item.price, 0) / savedCount)
    : 0;

  const handleAddToCart = (item: FavoriteItem) => {
    if (item.stock <= 0) {
      toast.info('This piece is currently sold out.');
      return;
    }

    addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      image: buildCloudinaryUrl(item.image, { width: 800, height: 800 }),
      size: item.size,
    });

    toast.success(`Added "${item.title}" to cart`);
  };

  const handleRemove = (item: FavoriteItem) => {
    removeItem(item.id);
    toast.success(`Removed "${item.title}" from favorites`);
  };

  if (items.length === 0) {
    return (
      <>
        <SEOMeta
          title="Favorites"
          description="Save artworks to your favorites so you can return to them later."
          canonical="/favorites"
        />
        <PageHero
          compact
          centered
          eyebrow="Favorites"
          title="Your saved pieces will show up here."
          description="Use the heart icon on the shop cards to build a shortlist of originals you want to revisit."
          actions={(
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/92">
              <Link to="/shop">Browse paintings</Link>
            </Button>
          )}
        />
      </>
    );
  }

  return (
    <>
      <SEOMeta
        title="Favorites"
        description="Browse the original artworks you have saved to your favorites list."
        canonical="/favorites"
      />
      <PageHero
        compact
        eyebrow="Favorites"
        title="Saved works for a second look."
        description="Keep a shortlist of originals here, compare them side by side, and move the strongest picks into the cart when you are ready."
        stats={[
          { label: 'Saved works', value: `${savedCount}` },
          { label: 'Styles', value: `${representedStyles}` },
          { label: 'Average price', value: `$${averagePrice}` },
        ]}
      />

      <section className="container px-2 pb-16 md:px-3">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <article className="surface-panel card-hover p-3">
                <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                  <CloudinaryImage
                    publicId={item.image}
                    width={900}
                    height={1100}
                    alt={item.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="px-2 pb-2 pt-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="info-chip text-xs">{item.style}</span>
                    <span className="info-chip text-xs">{item.size}</span>
                    <span className="info-chip text-xs">
                      {item.stock > 0 ? `${item.stock} available` : 'Sold out'}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-serif text-3xl font-semibold leading-tight text-foreground">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm leading-[1.75] text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                      style={{
                        background:
                          'linear-gradient(135deg, hsl(22 82% 50% / 0.12) 0%, hsl(28 90% 58% / 0.09) 100%)',
                        border: '1px solid hsl(22 82% 50% / 0.2)',
                        color: 'hsl(22 68% 36%)',
                      }}
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </span>
                  </div>

                  <p className="mt-5 text-lg font-semibold text-foreground">${item.price}</p>

                  <div className="mt-6 flex flex-col gap-3">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/92"
                      disabled={item.stock <= 0}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to cart
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/shop/${item.slug}`}>View artwork</Link>
                    </Button>
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-background/80 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove from favorites
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
};

export default Favorites;
