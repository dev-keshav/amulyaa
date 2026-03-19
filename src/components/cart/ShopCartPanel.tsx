import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { calculateShipping, SHIPPING_THRESHOLD } from '@/lib/cart';

const ShopCartPanel = () => {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCartStore();

  if (items.length === 0) {
    return null;
  }

  const sub = subtotal();
  const shipping = calculateShipping(sub);
  const total = sub + shipping;
  const progress = Math.min(100, (sub / SHIPPING_THRESHOLD) * 100);
  const selectedPieces = totalItems();

  return (
    <aside className="surface-panel p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/12">
          <ShoppingBag className="h-5 w-5 text-accent" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Cart preview</p>
          <p className="text-sm text-muted-foreground">
            {selectedPieces} piece{selectedPieces !== 1 ? 's' : ''} ready to review.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="surface-panel-muted p-4">
            <div className="flex gap-3">
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 rounded-[1.1rem] object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {item.size}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-2 py-1">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded-full p-2 hover:bg-secondary/70"
                      aria-label={`Decrease quantity for ${item.title}`}
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="min-w-7 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded-full p-2 hover:bg-secondary/70"
                      aria-label={`Increase quantity for ${item.title}`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground hover:bg-background/70 hover:text-destructive"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="surface-panel-muted mt-6 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Shipping progress
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-background/70">
          <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {shipping === 0
            ? 'Your order qualifies for free shipping.'
            : `Add $${(SHIPPING_THRESHOLD - sub).toFixed(2)} more to unlock free shipping.`}
        </p>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold text-foreground">${sub.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-semibold text-foreground">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="border-t border-border/70 pt-3">
          <div className="flex items-center justify-between text-base">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/92">
          <Link to="/checkout">Proceed to checkout</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link to="/cart">Open full cart</Link>
        </Button>
      </div>
    </aside>
  );
};

export default ShopCartPanel;
