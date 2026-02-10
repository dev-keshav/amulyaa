import { Link } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 25;

const Cart = () => {
  const { items, updateQuantity, removeItem, subtotal } = useCartStore();
  const sub = subtotal();
  const shipping = sub >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = sub + shipping;

  if (items.length === 0) {
    return (
      <div className="container py-24 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40 mb-6" />
        <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Discover original paintings in our collection.</p>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/shop">Browse Paintings</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12 px-4">
      <h1 className="font-serif text-3xl font-bold text-foreground mb-10">Your Cart</h1>
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 border-b border-border pb-6">
              <img src={item.image} alt={item.title} className="h-28 w-28 rounded object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg font-semibold text-foreground truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground capitalize">{item.size}</p>
                <p className="font-medium text-foreground mt-1">${item.price}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-border rounded">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5"><Minus className="h-3 w-3" /></button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="font-medium text-foreground shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-card p-6 sticky top-24">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">${sub.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6">
              <Input placeholder="Promo code" className="mb-3" />
            </div>
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 mt-4">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4">Free shipping on orders over ${SHIPPING_THRESHOLD}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
