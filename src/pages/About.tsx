import PageHero from '@/components/layout/PageHero';
import Reveal from '@/components/animation/Reveal';

const values = [
  {
    title: 'Original-first',
    description: 'Every piece is painted by hand. No reproductions, print runs, or decorative duplicates.',
  },
  {
    title: 'Material depth',
    description: 'Pigments, grounds, and supports are selected for permanence and quiet visual richness.',
  },
  {
    title: 'Collected feel',
    description: 'The goal is not visual noise. Each painting is designed to hold space with restraint.',
  },
];

const About = () => (
  <>
    <PageHero
      eyebrow="About the studio"
      title="A slower art practice built for lived-in spaces."
      description="Amulyaa was shaped around the idea that original art should feel tactile, considered, and deeply at home in the rooms people actually live with every day."
      stats={[
        { label: 'Process', value: 'Handmade' },
        { label: 'Finish', value: 'Gallery ready' },
        { label: 'Approach', value: 'Collected' },
      ]}
      aside={(
        <div className="surface-panel p-3">
          <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem]">
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80"
              alt="Artist studio"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
    />

    <section className="container px-2 pb-16 md:px-3">
      <Reveal>
        <div className="surface-panel px-6 py-8 md:px-10 md:py-10">
          <div className="max-w-3xl content-rich">
            <p>
              Amulyaa grew from a desire to preserve the intimacy of handmade painting in a market that often rewards speed and sameness. The studio works across layered abstracts, restrained landscapes, and figure-led studies, always with attention to what happens when a piece is seen repeatedly in the same room.
            </p>
            <p>
              Every canvas begins with sketches and material trials. Those studies help determine not just the image, but also how matte or luminous a surface should feel, how a frame should sit against the wall, and how the final work should read in morning light versus evening light.
            </p>
            <h2>Mission</h2>
            <p>
              To create original works that feel grounded, personal, and enduring, while making the experience of collecting art clearer and more human.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {values.map((value, index) => (
          <Reveal key={value.title} delay={index * 0.08}>
            <div className="surface-panel-muted h-full p-6">
              <h3 className="font-serif text-3xl text-foreground">{value.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{value.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  </>
);

export default About;
