import express from 'express';
import cors from 'cors';
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, 'data', 'store.json');

const loadStore = async () => {
  await mkdir(path.dirname(DATA_PATH), { recursive: true });
  const raw = await readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw);
};

let store;
try {
  store = await loadStore();
} catch (error) {
  console.error('Failed to load data store:', error);
  process.exit(1);
}

const persistStore = async () => {
  await writeFile(DATA_PATH, JSON.stringify(store, null, 2), 'utf8');
};

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const mediaRoot = process.env.MEDIA_ROOT || path.join(process.cwd(), 'public');
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsMiddleware = allowedOrigins.length
  ? cors({
      origin(origin, callback) {
        if (!origin) {
          return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
    })
  : cors();

app.use(corsMiddleware);
app.use(express.json({ limit: '1mb' }));
app.use('/media', express.static(mediaRoot));

const respondNotFound = (res, message) => res.status(404).json({ error: message });

app.get('/api/health', (req, res) => {
  res.json({ data: { status: 'ok', timestamp: new Date().toISOString() } });
});

app.get('/api/sketches', (req, res) => {
  res.json({ data: store.sketches });
});

app.get('/api/products', (req, res) => {
  const { q, style, size, featured, minPrice, maxPrice, sort = 'newest' } = req.query;
  let result = [...store.products];

  if (q) {
    const query = String(q).toLowerCase();
    result = result.filter((product) =>
      product.title.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
    );
  }
  if (style) {
    result = result.filter((product) => product.style?.toLowerCase() === String(style).toLowerCase());
  }
  if (size) {
    result = result.filter((product) => product.size?.toLowerCase() === String(size).toLowerCase());
  }
  if (featured === 'true') {
    result = result.filter((product) => product.featured);
  }

  const min = Number(minPrice);
  const max = Number(maxPrice);
  if (!Number.isNaN(min)) {
    result = result.filter((product) => product.price >= min);
  }
  if (!Number.isNaN(max)) {
    result = result.filter((product) => product.price <= max);
  }

  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
    default:
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  const total = result.length;
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  const limit = Math.max(Number(req.query.limit) || total, 0);
  const data = result.slice(offset, offset + limit);

  res.json({ data, meta: { total } });
});

app.get('/api/products/:slug', (req, res) => {
  const product = store.products.find((p) => p.slug === req.params.slug);
  if (!product) {
    return respondNotFound(res, 'Product not found');
  }
  res.json({ data: product });
});

app.get('/api/products/:slug/related', (req, res) => {
  const current = store.products.find((p) => p.slug === req.params.slug);
  if (!current) {
    return respondNotFound(res, 'Product not found');
  }
  const limit = Math.max(Number(req.query.limit) || 3, 1);
  const pool = store.products.filter((product) => product.id !== current.id);
  let related = pool.filter((product) =>
    product.style && current.style
      ? product.style.toLowerCase() === current.style.toLowerCase()
      : false
  );

  if (related.length < limit) {
    const remaining = pool.filter((product) => !related.includes(product));
    related = [...related, ...remaining];
  }

  res.json({ data: related.slice(0, limit) });
});

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
  })).min(1),
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    address: z.string().min(5),
  }).optional(),
  notes: z.string().max(1000).optional(),
});

app.post('/api/orders', async (req, res) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid order payload', details: parsed.error.flatten() });
  }

  const { items, customer = null, notes = '' } = parsed.data;
  const lineItems = [];

  for (const item of items) {
    const product = store.products.find((p) => p.id === item.productId);
    if (!product) {
      return res.status(404).json({ error: `Product ${item.productId} not found` });
    }
    if (product.stock < item.quantity) {
      return res.status(400).json({ error: `Only ${product.stock} units left for ${product.title}` });
    }
    product.stock -= item.quantity;
    lineItems.push({
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: item.quantity,
      subtotal: item.quantity * product.price,
    });
  }

  const order = {
    id: nanoid(12),
    status: 'confirmed',
    created_at: new Date().toISOString(),
    lineItems,
    total: lineItems.reduce((sum, item) => sum + item.subtotal, 0),
    customer,
    notes,
  };

  store.orders.push(order);
  await persistStore();

  res.status(201).json({ data: order });
});

app.get('/api/orders/:id', (req, res) => {
  const order = store.orders.find((o) => o.id === req.params.id);
  if (!order) {
    return respondNotFound(res, 'Order not found');
  }
  res.json({ data: order });
});

app.get('/api/job-listings', (req, res) => {
  const onlyActive = req.query.active === 'true';
  let jobs = [...store.jobListings];
  if (onlyActive) {
    jobs = jobs.filter((job) => job.isActive);
  }
  res.json({ data: jobs });
});

const jobApplicationSchema = z.object({
  jobId: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  resumeUrl: z.string().url(),
  coverLetter: z.string().min(20),
});

app.post('/api/job-applications', async (req, res) => {
  const parsed = jobApplicationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid application', details: parsed.error.flatten() });
  }
  const { jobId, name, email, resumeUrl, coverLetter } = parsed.data;
  const job = store.jobListings.find((j) => j.id === jobId && j.isActive);
  if (!job) {
    return res.status(404).json({ error: 'Job listing not found' });
  }
  const application = {
    id: nanoid(10),
    jobId,
    name,
    email,
    resumeUrl,
    coverLetter,
    submitted_at: new Date().toISOString(),
  };
  store.jobApplications.push(application);
  await persistStore();
  res.status(201).json({ data: application });
});

const newsletterSchema = z.object({ email: z.string().email() });

app.post('/api/newsletter', async (req, res) => {
  const parsed = newsletterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  const email = parsed.data.email.toLowerCase();
  const exists = store.newsletterSubscribers.some((entry) => entry.email === email);
  if (exists) {
    return res.status(409).json({ error: 'You are already subscribed.' });
  }
  const record = { email, subscribed_at: new Date().toISOString() };
  store.newsletterSubscribers.push(record);
  await persistStore();
  res.status(201).json({ data: record });
});

app.use((err, req, res, next) => {
  if (err?.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'Origin not allowed' });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
