import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageHero from '@/components/layout/PageHero';
import Reveal from '@/components/animation/Reveal';
import { calculateShipping, SHIPPING_THRESHOLD } from '@/lib/cart';

const Cart = () => {
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const sub = subtotal();
  const shipping = calculateShipping(sub);
  const total = sub + shipping;
  const progress = Math.min(100, (sub / SHIPPING_THRESHOLD) * 100);

  if (items.length === 0) {
    return (
      <PageHero
        compact
        centered
        eyebrow="Cart"
        title="Your cart is still waiting for its first piece."
        description="Browse the current collection and save originals you want to compare before checkout."
        actions={(
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/92">
            <Link to="/shop">Browse paintings</Link>
          </Button>
        )}
      />
    );
  }

  return (
    <>
      <PageHero
        compact
        eyebrow="Cart"
        title="Review your selected works before checkout."
        description="Adjust quantities, check shipping progress, and continue when the selection feels right."
        stats={[
          { label: 'Pieces selected', value: `${items.length}` },
          { label: 'Subtotal', value: `$${sub.toFixed(0)}` },
          { label: 'Shipping', value: shipping === 0 ? 'Free' : `$${shipping}` },
        ]}
      />

      <section className="container px-2 pb-16 md:px-3">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
          <Reveal className="space-y-5">
            <div className="surface-panel p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/12">
                  <ShoppingBag className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Collected works</p>
                  <p className="text-sm text-muted-foreground">Each item remains a unique original until checkout completes.</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="surface-panel-muted p-4 sm:p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-28 w-full rounded-[1.2rem] object-cover sm:w-28"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h2 className="font-serif text-3xl text-foreground">{item.title}</h2>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                              {item.size}
                            </p>
                            {/* <p className="mt-3 text-sm font-semibold text-foreground">${item.price}</p> */}
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-2 py-1">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="rounded-full p-2 hover:bg-secondary/70"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-7 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="rounded-full p-2 hover:bg-secondary/70"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted-foreground hover:bg-background/70 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="xl:sticky xl:top-28">
            <div className="space-y-5">
              <div className="surface-panel p-6">
                <h2 className="font-serif text-4xl text-foreground">Order summary</h2>

                <div className="mt-6 space-y-4 text-sm">
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
                  <div className="border-t border-border/70 pt-4">
                    <div className="flex items-center justify-between text-base">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>
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

                <div className="mt-6">
                  <Input placeholder="Promo code" />
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/92">
                    <Link to="/checkout">Proceed to checkout</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/shop">Continue shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Cart;
