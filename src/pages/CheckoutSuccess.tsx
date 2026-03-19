import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/layout/PageHero';

const CheckoutSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');

  return (
    <>
      <PageHero
        compact
        centered
        eyebrow="Order confirmed"
        title="Thank you. Your order is now being prepared."
        description="A confirmation reference is shown below for your records."
        actions={(
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/92">
            <Link to="/shop">Continue shopping</Link>
          </Button>
        )}
      />

      <section className="container px-2 pb-16 md:px-3">
        <div className="mx-auto max-w-xl surface-panel p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/12">
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Reference
          </p>
          <p className="mt-3 font-serif text-4xl text-foreground">
            {sessionId ? sessionId.slice(-8).toUpperCase() : 'PENDING'}
          </p>
        </div>
      </section>
    </>
  );
};

export default CheckoutSuccess;
