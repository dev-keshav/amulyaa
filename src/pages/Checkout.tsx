import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageHero from '@/components/layout/PageHero';
import Reveal from '@/components/animation/Reveal';
import { useCartStore } from '@/stores/cartStore';
import { calculateShipping, SHIPPING_THRESHOLD } from '@/lib/cart';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email address'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  notes: z.string().max(400, 'Keep notes under 400 characters').optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { items, subtotal, clearCart } = useCartStore();
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      notes: '',
    },
  });

  const sub = subtotal();
  const shipping = calculateShipping(sub);
  const total = sub + shipping;

  if (items.length === 0) {
    return (
      <PageHero
        compact
        centered
        eyebrow="Checkout"
        title="There are no items ready for checkout."
        description="Add a painting to your cart first, then return here to complete the order details."
        actions={(
          <Button asChild>
            <Link to="/shop">Browse paintings</Link>
          </Button>
        )}
      />
    );
  }

  const onSubmit = async (_values: CheckoutValues) => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));

    const orderRef =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID().replace(/-/g, '').slice(0, 10)
        : `${Date.now()}`.slice(-10);

    clearCart();
    toast.success('Order confirmed. Confirmation details are on the next screen.');
    navigate(`/checkout/success?session_id=${orderRef}`);
  };

  return (
    <>
      <PageHero
        compact
        eyebrow="Checkout"
        title="Complete your order details."
        description="This flow captures delivery information and confirms the current cart locally."
        stats={[
          { label: 'Pieces', value: `${items.length}` },
          { label: 'Subtotal', value: `$${sub.toFixed(0)}` },
          { label: 'Shipping', value: shipping === 0 ? 'Free' : `$${shipping}` },
        ]}
      />

      <section className="container px-4 pb-16">
        <div className="grid gap-8 xl:grid-cols-[1.04fr_0.96fr] xl:items-start">
          <Reveal>
            <div className="surface-panel p-6 md:p-8">
              <div>
                <p className="section-kicker">Delivery details</p>
                <h2 className="mt-4 font-serif text-5xl text-foreground">Shipping information</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                  Add the name and address for delivery. You can include handling notes for building access or preferred drop-off instructions.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery notes</FormLabel>
                        <FormControl>
                          <Textarea rows={4} placeholder="Optional delivery or access instructions" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-accent text-accent-foreground hover:bg-accent/92"
                    >
                      {submitting ? 'Confirming...' : 'Confirm order'}
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/cart">Back to cart</Link>
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="xl:sticky xl:top-28">
            <div className="space-y-5">
              <div className="surface-panel p-6">
                <h2 className="font-serif text-4xl text-foreground">Order summary</h2>
                <div className="mt-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="surface-panel-muted p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-foreground">{item.title}</p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            {item.size} - Qty {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
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
              </div>

              <div className="surface-panel-muted p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Shipping note
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {shipping === 0
                    ? `This order already qualifies for free shipping over $${SHIPPING_THRESHOLD}.`
                    : `Orders under $${SHIPPING_THRESHOLD} include a flat $${shipping} shipping fee.`}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Checkout;
