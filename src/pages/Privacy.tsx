const Privacy = () => (
  <div className="container py-16 px-4 max-w-3xl">
    <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
    <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
      <p>Last updated: February 2026</p>
      <section>
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2">Information We Collect</h2>
        <p>We collect information you provide directly, including your name, email address, shipping address, and payment information when you make a purchase or subscribe to our newsletter.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2">How We Use Your Information</h2>
        <p>We use your information to process orders, send order updates, improve our services, and send promotional communications (with your consent).</p>
      </section>
      <section>
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2">Data Security</h2>
        <p>We implement industry-standard security measures to protect your personal information. Payment processing is handled securely through Stripe.</p>
      </section>
      <section>
        <h2 className="font-serif text-lg font-semibold text-foreground mb-2">Contact</h2>
        <p>For privacy-related questions, contact us at privacy@atelier-art.com.</p>
      </section>
    </div>
  </div>
);

export default Privacy;
