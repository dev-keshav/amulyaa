export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number;
  style: string;
  size: 'Small' | 'Medium' | 'Large';
  description: string;
  materials?: string;
  dimensions?: string;
  stock: number;
  featured?: boolean;
  createdAt: string;
  images: string[];
};

export const products: Product[] = [
  {
    id: 'prod_celestial_dusk',
    slug: 'celestial-dusk',
    title: 'Celestial Dusk',
    price: 2400,
    style: 'Abstract',
    size: 'Large',
    description: 'Layered metallic washes capture the final seconds of daylight dissolving into deep indigo.',
    materials: 'Oil, interference pigments, canvas',
    dimensions: '48 x 60 in',
    stock: 2,
    featured: true,
    createdAt: '2025-02-18T15:00:00.000Z',
    images: ['five_kmr81l'],
  },
  {
    id: 'prod_golden_horizon',
    slug: 'golden-horizon',
    title: 'Golden Horizon',
    price: 1450,
    style: 'Landscape',
    size: 'Medium',
    description: 'A luminous coastal landscape painted with knife strokes that blur sea and sky.',
    materials: 'Oil on linen',
    dimensions: '30 x 40 in',
    stock: 4,
    featured: true,
    createdAt: '2025-02-08T11:00:00.000Z',
    images: ['three_q9deaq'],
  },
  {
    id: 'prod_portrait_of_light',
    slug: 'portrait-of-light',
    title: 'Portrait of Light',
    price: 1800,
    style: 'Portrait',
    size: 'Medium',
    description: 'An intimate portrait rendered with translucent glazes that evoke motion.',
    materials: 'Oil and egg tempera',
    dimensions: '28 x 36 in',
    stock: 1,
    createdAt: '2025-01-28T10:30:00.000Z',
    images: ['six_gfutgy'],
  },
  {
    id: 'prod_verdant_quietude',
    slug: 'verdant-quietude',
    title: 'Verdant Quietude',
    price: 2100,
    style: 'Landscape',
    size: 'Large',
    description: 'Quiet layers of moss greens and mineral blues inspired by forest understory.',
    materials: 'Acrylic, pumice gel',
    dimensions: '42 x 54 in',
    stock: 0,
    featured: true,
    createdAt: '2025-02-01T09:45:00.000Z',
    images: ['two_clkg9n'],
  },
  {
    id: 'prod_saffron_sonata',
    slug: 'saffron-sonata',
    title: 'Saffron Sonata',
    price: 620,
    style: 'Abstract',
    size: 'Small',
    description: 'Vibrant saffron fields collide with cobalt shadows in this energetic abstract.',
    materials: 'Acrylic on panel',
    dimensions: '16 x 20 in',
    stock: 7,
    createdAt: '2025-01-15T13:20:00.000Z',
    images: ['ten_pv7xwg'],
  },
  {
    id: 'prod_monarch_study',
    slug: 'monarch-study',
    title: 'Monarch Study',
    price: 980,
    style: 'Still Life',
    size: 'Small',
    description: 'A still life study of botanicals and monarch wings suspended mid-air.',
    materials: 'Oil on birch',
    dimensions: '18 x 18 in',
    stock: 3,
    createdAt: '2025-01-05T12:00:00.000Z',
    images: ['seven_fmupdq'],
  },
  {
    id: 'prod_nocturne_bloom',
    slug: 'nocturne-bloom',
    title: 'Nocturne Bloom',
    price: 2650,
    style: 'Modern',
    size: 'Large',
    description: 'A moody palette of indigo florals emerging from a darkened ground.',
    materials: 'Oil, cold wax',
    dimensions: '44 x 58 in',
    stock: 1,
    featured: true,
    createdAt: '2025-02-20T08:30:00.000Z',
    images: ['nine_ibjsx8'],
  },
  {
    id: 'prod_ocean_folding',
    slug: 'ocean-folding',
    title: 'Ocean Folding',
    price: 1600,
    style: 'Abstract',
    size: 'Medium',
    description: 'Gesture-driven strokes that mimic the pull and release of Atlantic tides.',
    materials: 'Oil on canvas',
    dimensions: '32 x 40 in',
    stock: 5,
    createdAt: '2025-01-22T17:15:00.000Z',
    images: ['one_dnu61t'],
  },
  {
    id: 'prod_winter_veil',
    slug: 'winter-veil',
    title: 'Winter Veil',
    price: 1320,
    style: 'Landscape',
    size: 'Medium',
    description: 'Soft mineral tints layer into a misty winter hillside.',
    materials: 'Watercolor on cotton',
    dimensions: '24 x 32 in',
    stock: 6,
    createdAt: '2025-01-10T16:00:00.000Z',
    images: ['four_m2oooi'],
  },
  {
    id: 'prod_resonant_lines',
    slug: 'resonant-lines',
    title: 'Resonant Lines',
    price: 750,
    style: 'Modern',
    size: 'Small',
    description: 'Graphite scaffolding over translucent washes exploring rhythm and pause.',
    materials: 'Graphite, gouache',
    dimensions: '18 x 24 in',
    stock: 8,
    createdAt: '2025-01-02T14:10:00.000Z',
    images: ['eight_keikqu'],
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const getRelatedProducts = (product: Product, limit = 3) =>
  products
    .filter((candidate) => candidate.id !== product.id)
    .filter((candidate) =>
      product.style ? candidate.style.toLowerCase() === product.style.toLowerCase() : true
    )
    .slice(0, limit);
