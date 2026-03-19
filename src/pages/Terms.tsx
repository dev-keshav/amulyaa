import PageHero from '@/components/layout/PageHero';

const Terms = () => (
  <>
    <PageHero
      compact
      centered
      eyebrow="Policies"
      title="Terms of service"
      description="Core terms for browsing, purchasing, and collecting work from Amulyaa."
    />

    <section className="container px-2 pb-16 md:px-3">
      <div className="surface-panel px-6 py-8 md:px-10 md:py-10">
        <div className="max-w-3xl content-rich">
          <p>Last updated: March 2026</p>

          <h2>Agreement</h2>
          <p>
            By accessing and using Amulyaa, you agree to these Terms of Service. If you do not agree, please do not use the website or place orders through it.
          </p>

          <h2>Purchases</h2>
          <p>
            All sales are subject to product availability. Prices are listed in USD and may change without prior notice. Payment is processed at the time of purchase.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All paintings, imagery, and written content on the site remain the property of Amulyaa. Purchasing an original artwork transfers ownership of the physical piece only, not reproduction rights.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            Amulyaa is not liable for indirect, incidental, or consequential damages arising from the use of the site or from purchased products.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default Terms;
