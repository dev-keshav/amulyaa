import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const CheckoutCancel = () => (
  <div className="container py-24 text-center max-w-lg px-4">
    <XCircle className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
    <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Checkout Cancelled</h1>
    <p className="text-muted-foreground mb-8">No worries — your cart is still waiting for you.</p>
    <div className="flex gap-4 justify-center">
      <Button asChild variant="outline"><Link to="/cart">Back to Cart</Link></Button>
      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/shop">Continue Shopping</Link></Button>
    </div>
  </div>
);

export default CheckoutCancel;
