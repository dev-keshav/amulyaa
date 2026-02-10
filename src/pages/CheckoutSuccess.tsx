import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');

  return (
    <div className="container py-24 text-center max-w-lg px-4">
      <CheckCircle className="mx-auto h-16 w-16 text-accent mb-6" />
      <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Thank You!</h1>
      <p className="text-muted-foreground mb-2">Your order has been confirmed and is being prepared.</p>
      {sessionId && <p className="text-xs text-muted-foreground mb-8">Order ref: {sessionId.slice(-8).toUpperCase()}</p>}
      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
        <Link to="/shop">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default CheckoutSuccess;
