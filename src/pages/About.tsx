const About = () => (
  <div className="container py-16 px-4 max-w-3xl">
    <h1 className="font-serif text-4xl font-bold text-foreground mb-6">About Atelier</h1>
    <div className="aspect-video overflow-hidden rounded-lg mb-10">
      <img
        src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80"
        alt="Artist studio"
        className="h-full w-full object-cover"
      />
    </div>
    <div className="prose prose-lg text-muted-foreground space-y-6">
      <p>
        Atelier was born from a passion for preserving the tradition of handmade art in a digital world.
        Every painting in our collection is created by hand — no prints, no reproductions, no shortcuts.
      </p>
      <p>
        Our studio is nestled in a sunlit loft where creativity flows freely. We work with premium pigments,
        hand-stretched canvases, and time-honored techniques passed down through generations of artists.
      </p>
      <p>
        We believe art should be accessible, personal, and enduring. Each piece comes with a certificate of
        authenticity and is gallery-framed, ready to become the centerpiece of your space.
      </p>
      <h2 className="font-serif text-2xl font-semibold text-foreground mt-10 mb-4">Our Mission</h2>
      <p>
        To bring original, handcrafted art into homes worldwide — bridging the gap between artist and collector
        through a curated, gallery-quality experience.
      </p>
    </div>
  </div>
);

export default About;
