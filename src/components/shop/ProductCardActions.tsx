import { Heart, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import type { Product } from '@/data/products';
import { buildCloudinaryUrl } from '@/lib/cloudinary';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { useFavoritesStore } from '@/stores/favoritesStore';

type ProductCardActionsProps = {
  product: Product;
  className?: string;
};

const actionButtonClassName =
  'flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-background/95 text-foreground shadow-[0_18px_40px_-20px_rgba(20,10,6,0.75)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent disabled:cursor-not-allowed disabled:opacity-45';

const ProductCardActions = ({ product, className }: ProductCardActionsProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const addFavorite = useFavoritesStore((state) => state.addItem);
  const removeFavorite = useFavoritesStore((state) => state.removeItem);
  const isFavorite = useFavoritesStore((state) =>
    state.items.some((item) => item.id === product.id),
  );
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    if (!inStock) {
      toast.info('This piece is currently sold out.');
      return;
    }

    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: buildCloudinaryUrl(product.images[0], { width: 800, height: 800 }),
      size: product.size,
    });

    toast.success(`Added "${product.title}" to cart`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(product.id);
      toast.success(`Removed "${product.title}" from favorites`);
      return;
    }

    addFavorite({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: product.size,
      style: product.style,
      description: product.description,
      stock: product.stock,
    });

    toast.success(`Saved "${product.title}" to favorites`);
  };

  return (
    <div className={cn('pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-end p-5', className)}>
      <div className="pointer-events-auto flex gap-2 md:translate-y-2 md:opacity-0 md:transition-all md:duration-300 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!inStock}
          className={actionButtonClassName}
          aria-label={inStock ? `Add ${product.title} to cart` : `${product.title} is sold out`}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={cn(
            actionButtonClassName,
            isFavorite && 'border-accent/60 bg-accent text-accent-foreground hover:text-accent-foreground',
          )}
          aria-label={isFavorite ? `Remove ${product.title} from favorites` : `Save ${product.title} to favorites`}
          aria-pressed={isFavorite}
        >
          <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
        </button>
      </div>
    </div>
  );
};

export default ProductCardActions;
