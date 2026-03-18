import PageHero from '@/components/layout/PageHero';

const ShippingReturns = () => (
  <>
    <PageHero
      compact
      centered
      eyebrow="Policies"
      title="Shipping and returns"
      description="How Amulyaa handles packing, delivery timing, and return requests for original works."
    />

    <section className="container px-4 pb-16">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="surface-panel-muted p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Standard</p>
          <p className="mt-3 font-serif text-3xl text-foreground">Free over $500</p>
        </div>
        <div className="surface-panel-muted p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Lead time</p>
          <p className="mt-3 font-serif text-3xl text-foreground">2-3 business days</p>
        </div>
        <div className="surface-panel-muted p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Return window</p>
          <p className="mt-3 font-serif text-3xl text-foreground">30 days</p>
        </div>
      </div>

      <div className="surface-panel mt-6 px-6 py-8 md:px-10 md:py-10">
        <div className="max-w-3xl content-rich">
          <h2>Shipping</h2>
          <p>
            All paintings are packed with protective materials and custom support so they arrive ready for display. Orders are typically prepared within 2 to 3 business days before dispatch.
          </p>
          <ul>
            <li>Free standard shipping on orders over $500.</li>
            <li>Standard shipping, 5 to 7 business days: $25.</li>
            <li>Express shipping, 2 to 3 business days: $50.</li>
            <li>International shipping is available on request.</li>
          </ul>

          <h2>Returns</h2>
          <p>
            If the work is not right for your space, you may return it within 30 days of delivery for a full refund. The piece must be returned in its original condition and packaging.
          </p>
          <p>
            To start a return, email <strong>hello@amulyaa.art</strong> with your order reference and the painting title.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default ShippingReturns;
