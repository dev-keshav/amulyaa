import fs from 'node:fs';
import path from 'node:path';

const size = 64;
const pixels = new Uint8ClampedArray(size * size * 4);

const background = [45, 27, 15, 255];
const border = [178, 122, 80, 255];
const goldLight = [246, 232, 201, 255];
const goldMid = [224, 190, 145, 255];
const goldDark = [204, 132, 84, 255];
const strokeColor = [205, 125, 82, 185];

const setPixel = (x, y, rgba) => {
  if (x < 0 || y < 0 || x >= size || y >= size) return;
  const index = (y * size + x) * 4;
  pixels[index] = rgba[0];
  pixels[index + 1] = rgba[1];
  pixels[index + 2] = rgba[2];
  pixels[index + 3] = rgba[3];
};

const blendPixel = (x, y, rgba) => {
  if (x < 0 || y < 0 || x >= size || y >= size) return;
  const index = (y * size + x) * 4;
  const srcAlpha = rgba[3] / 255;
  const dstAlpha = pixels[index + 3] / 255;
  const outAlpha = srcAlpha + dstAlpha * (1 - srcAlpha);

  if (outAlpha <= 0) return;

  pixels[index] = Math.round(
    (rgba[0] * srcAlpha + pixels[index] * dstAlpha * (1 - srcAlpha)) / outAlpha,
  );
  pixels[index + 1] = Math.round(
    (rgba[1] * srcAlpha + pixels[index + 1] * dstAlpha * (1 - srcAlpha)) / outAlpha,
  );
  pixels[index + 2] = Math.round(
    (rgba[2] * srcAlpha + pixels[index + 2] * dstAlpha * (1 - srcAlpha)) / outAlpha,
  );
  pixels[index + 3] = Math.round(outAlpha * 255);
};

const lerp = (a, b, t) => a + (b - a) * t;

const mixColor = (a, b, t) => [
  Math.round(lerp(a[0], b[0], t)),
  Math.round(lerp(a[1], b[1], t)),
  Math.round(lerp(a[2], b[2], t)),
  Math.round(lerp(a[3], b[3], t)),
];

const fillBackground = () => {
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const diagonal = (x + y) / ((size - 1) * 2);
      const vignetteX = (x - size / 2) / (size / 2);
      const vignetteY = (y - size / 2) / (size / 2);
      const vignette = Math.min(1, Math.sqrt(vignetteX ** 2 + vignetteY ** 2));
      const warm = mixColor(background, [66, 39, 23, 255], Math.max(0, 0.38 - vignette * 0.24));
      const tone = mixColor(warm, [31, 17, 10, 255], diagonal * 0.32);
      setPixel(x, y, tone);
    }
  }
};

const drawBorder = () => {
  for (let i = 0; i < size; i += 1) {
    setPixel(i, 0, border);
    setPixel(i, size - 1, border);
    setPixel(0, i, border);
    setPixel(size - 1, i, border);
  }
};

const edge = (ax, ay, bx, by, cx, cy) => (cx - ax) * (by - ay) - (cy - ay) * (bx - ax);

const fillTriangle = (a, b, c, colorFn) => {
  const minX = Math.max(0, Math.floor(Math.min(a.x, b.x, c.x)));
  const maxX = Math.min(size - 1, Math.ceil(Math.max(a.x, b.x, c.x)));
  const minY = Math.max(0, Math.floor(Math.min(a.y, b.y, c.y)));
  const maxY = Math.min(size - 1, Math.ceil(Math.max(a.y, b.y, c.y)));
  const area = edge(a.x, a.y, b.x, b.y, c.x, c.y);

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const px = x + 0.5;
      const py = y + 0.5;
      const w0 = edge(b.x, b.y, c.x, c.y, px, py);
      const w1 = edge(c.x, c.y, a.x, a.y, px, py);
      const w2 = edge(a.x, a.y, b.x, b.y, px, py);

      const inside = area < 0 ? w0 <= 0 && w1 <= 0 && w2 <= 0 : w0 >= 0 && w1 >= 0 && w2 >= 0;
      if (!inside) continue;

      const l0 = w0 / area;
      const l1 = w1 / area;
      const l2 = w2 / area;
      setPixel(x, y, colorFn({ x: px, y: py, l0, l1, l2 }));
    }
  }
};

const fillRect = (x, y, width, height, colorFn) => {
  for (let py = y; py < y + height; py += 1) {
    for (let px = x; px < x + width; px += 1) {
      setPixel(px, py, colorFn(px, py));
    }
  }
};

const drawMonogram = () => {
  fillTriangle(
    { x: 30, y: 8 },
    { x: 18, y: 54 },
    { x: 10, y: 54 },
    ({ x }) => {
      const t = Math.min(1, Math.max(0, (x - 10) / 20));
      return mixColor(goldLight, goldDark, t * 0.9);
    },
  );

  fillTriangle(
    { x: 30, y: 8 },
    { x: 42, y: 54 },
    { x: 50, y: 54 },
    ({ x }) => {
      const t = Math.min(1, Math.max(0, (x - 30) / 20));
      return mixColor(goldLight, goldDark, t);
    },
  );

  fillRect(20, 31, 20, 5, (x) => {
    const t = Math.min(1, Math.max(0, (x - 20) / 20));
    return mixColor(goldLight, goldMid, t * 0.75);
  });
};

const drawUnderline = () => {
  for (let x = 8; x <= 56; x += 1) {
    const normalized = (x - 8) / 48;
    const y = 56 - Math.sin(normalized * Math.PI) * 2.2;
    for (let offset = -1; offset <= 1; offset += 1) {
      blendPixel(x, Math.round(y + offset), [
        strokeColor[0],
        strokeColor[1],
        strokeColor[2],
        offset === 0 ? strokeColor[3] : 110,
      ]);
    }
  }
};

const createIco = () => {
  fillBackground();
  drawBorder();
  drawMonogram();
  drawUnderline();

  const dibHeaderSize = 40;
  const xorBitmapSize = size * size * 4;
  const andMaskRowSize = Math.ceil(size / 32) * 4;
  const andMaskSize = andMaskRowSize * size;
  const imageSize = dibHeaderSize + xorBitmapSize + andMaskSize;

  const iconDir = Buffer.alloc(6);
  iconDir.writeUInt16LE(0, 0);
  iconDir.writeUInt16LE(1, 2);
  iconDir.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(imageSize, 8);
  entry.writeUInt32LE(6 + 16, 12);

  const dibHeader = Buffer.alloc(dibHeaderSize);
  dibHeader.writeUInt32LE(dibHeaderSize, 0);
  dibHeader.writeInt32LE(size, 4);
  dibHeader.writeInt32LE(size * 2, 8);
  dibHeader.writeUInt16LE(1, 12);
  dibHeader.writeUInt16LE(32, 14);
  dibHeader.writeUInt32LE(0, 16);
  dibHeader.writeUInt32LE(xorBitmapSize, 20);
  dibHeader.writeInt32LE(0, 24);
  dibHeader.writeInt32LE(0, 28);
  dibHeader.writeUInt32LE(0, 32);
  dibHeader.writeUInt32LE(0, 36);

  const xorBitmap = Buffer.alloc(xorBitmapSize);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const srcIndex = ((size - 1 - y) * size + x) * 4;
      const dstIndex = (y * size + x) * 4;
      xorBitmap[dstIndex] = pixels[srcIndex + 2];
      xorBitmap[dstIndex + 1] = pixels[srcIndex + 1];
      xorBitmap[dstIndex + 2] = pixels[srcIndex];
      xorBitmap[dstIndex + 3] = pixels[srcIndex + 3];
    }
  }

  const andMask = Buffer.alloc(andMaskSize);
  return Buffer.concat([iconDir, entry, dibHeader, xorBitmap, andMask]);
};

const outputPath = path.join(process.cwd(), 'public', 'favicon.ico');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, createIco());
console.log(`Wrote ${outputPath}`);
