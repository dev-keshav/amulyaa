const ShippingReturns = () => (
  <div className="container py-16 px-4 max-w-3xl">
    <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Shipping & Returns</h1>
    <div className="space-y-8 text-muted-foreground leading-relaxed">
      <section>
        <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Shipping</h2>
        <p>All paintings are carefully packaged in custom crating to ensure safe delivery. Orders are typically processed within 2–3 business days.</p>
        <ul className="list-disc list-inside mt-3 space-y-1">
          <li>Free standard shipping on orders over $500</li>
          <li>Standard shipping (5–7 business days): $25</li>
          <li>Express shipping (2–3 business days): $50</li>
          <li>International shipping available — contact us for a quote</li>
        </ul>
      </section>
      <section>
        <h2 className="font-serif text-xl font-semibold text-foreground mb-3">Returns</h2>
        <p>We want you to love your painting. If you're not completely satisfied, you may return your purchase within 30 days of delivery for a full refund. The painting must be in its original condition and packaging.</p>
        <p className="mt-2">To initiate a return, please email us at hello@atelier-art.com with your order number.</p>
      </section>
    </div>
  </div>
);

export default ShippingReturns;
