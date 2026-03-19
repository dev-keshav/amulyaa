import PageHero from '@/components/layout/PageHero';

const Privacy = () => (
  <>
    <PageHero
      compact
      centered
      eyebrow="Policies"
      title="Privacy policy"
      description="How Amulyaa collects, uses, and protects customer information."
    />

    <section className="container px-2 pb-16 md:px-3">
      <div className="surface-panel px-6 py-8 md:px-10 md:py-10">
        <div className="max-w-3xl content-rich">
          <p>Last updated: March 2026</p>

          <h2>Information we collect</h2>
          <p>
            We collect the information you provide directly, including your name, email address, shipping address, and payment details when you purchase artwork or subscribe to updates.
          </p>

          <h2>How we use your information</h2>
          <p>
            Information is used to process orders, send updates, improve the site experience, and share occasional studio communications when you have opted in.
          </p>

          <h2>Data security</h2>
          <p>
            We use reasonable security measures to protect personal information. Payment processing is handled through secure third-party services.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy-related questions, contact <strong>privacy@amulyaa.art</strong>.
          </p>
        </div>
      </div>
    </section>
  </>
);

export default Privacy;
