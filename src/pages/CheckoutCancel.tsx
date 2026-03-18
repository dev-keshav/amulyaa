import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/layout/PageHero';

const CheckoutCancel = () => (
  <>
    <PageHero
      compact
      centered
      eyebrow="Checkout"
      title="Checkout was cancelled."
      description="Your selected pieces are still in the cart if you want to return and finish later."
      actions={(
        <>
          <Button asChild variant="outline">
            <Link to="/cart">Back to cart</Link>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/92">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        </>
      )}
    />

    <section className="container px-4 pb-16">
      <div className="mx-auto flex max-w-xl items-center gap-4 rounded-[2rem] border border-border/70 bg-secondary/50 p-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background/80">
          <XCircle className="h-7 w-7 text-muted-foreground" />
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          No payment was captured in this demo flow. You can return to the cart at any time.
        </p>
      </div>
    </section>
  </>
);

export default CheckoutCancel;
