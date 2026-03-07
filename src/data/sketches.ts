export type SketchPiece = {
  id: number;
  title: string;
  medium: string;
  publicId: string;
};

export const sketches: SketchPiece[] = [
  { id: 1, title: 'Gesture Study I', medium: 'Charcoal on cotton', publicId: 'samples/people/boy-snow-hoodie' },
  { id: 2, title: 'Palette Notes', medium: 'Ink and gouache', publicId: 'samples/people/boy-snow' },
  { id: 3, title: 'Botanical Lines', medium: 'Graphite', publicId: 'samples/objects/bike' },
  { id: 4, title: 'Coastal Draft', medium: 'Watercolor', publicId: 'samples/landscapes/sea-lion' },
  { id: 5, title: 'Color Blocking', medium: 'Acrylic on paper', publicId: 'samples/landscapes/nature-mountains' },
  { id: 6, title: 'Night Bloom', medium: 'Soft pastel', publicId: 'samples/landscapes/girl-urban-view' },
];
