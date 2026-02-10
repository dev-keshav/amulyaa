const Terms = () => (
  <div className="container py-16 px-4 max-w-3xl">
    <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
    <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
      <p>Last updated: February 2026</p>
      <section>
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2">Agreement</h2>
        <p>By accessing and using Atelier, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2">Purchases</h2>
        <p>All sales are subject to product availability. Prices are listed in USD and are subject to change. Payment is processed securely through Stripe at the time of purchase.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2">Intellectual Property</h2>
        <p>All paintings, images, and content on this site are the property of Atelier and may not be reproduced without permission. Purchasing a painting grants you ownership of the physical work but not reproduction rights.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2">Limitation of Liability</h2>
        <p>Atelier is not liable for any indirect, incidental, or consequential damages arising from the use of our services or products.</p>
      </section>
    </div>
  </div>
);

export default Terms;
