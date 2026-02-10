

# 🎨 Handmade Paintings E-Commerce — Implementation Plan

## Overview
A premium art gallery e-commerce site built with React + Vite + TypeScript + Tailwind CSS, backed by Lovable Cloud (Supabase) for the database and Stripe for payments. Elegant, minimal design with large imagery and refined typography.

---

## 1. Design System & Foundation
- **Color palette**: Dark charcoal, warm whites, gold accents — high-contrast, gallery-inspired
- **Typography**: Elegant serif headings (Playfair Display), clean sans-serif body (Inter)
- **Spacing & layout**: Generous whitespace, large image areas, max-width containers
- **Animations**: Subtle fade-ins on scroll, smooth hover transitions on product cards
- **Accessibility**: Semantic HTML, focus-visible outlines, ARIA labels, contrast-friendly colors

---

## 2. Pages & Features

### 🏠 Landing Page
- **Hero section**: Full-width painting image with headline and "Shop Originals" CTA button
- **Featured collection**: Curated grid of 4–6 highlighted paintings
- **"How It's Made"**: Artist process section with step-by-step visuals
- **Testimonials**: Customer quotes in an elegant carousel/grid
- **Newsletter signup**: Email input with Zod validation

### 🛍️ Shop Page
- Product grid with card previews (image, title, price, style tag)
- **Filters**: Price range slider, style (abstract, landscape, portrait, etc.), size, availability toggle
- **Sort**: Price low/high, newest, popularity
- **Search**: Text search by title/description
- Pagination or infinite scroll

### 🖼️ Product Detail Page
- Multi-image gallery with thumbnail navigation and zoom on hover/click
- Full details: title, price, description, materials, dimensions, style, stock status
- Shipping info snippet
- "Add to Cart" button with quantity selector
- Related paintings section

### 🛒 Cart Page
- List of cart items with image, title, price, quantity editor, remove button
- Promo code input placeholder
- Subtotal, estimated shipping, and total
- "Proceed to Checkout" CTA

### 💳 Checkout Flow (Stripe)
- Stripe Checkout session created via Supabase Edge Function
- Redirect to Stripe's hosted checkout page
- **Success page**: Order confirmation with summary, order ID, and status
- **Cancel page**: Friendly message with link back to cart
- Stripe webhook edge function to update order status on payment confirmation

### 👤 Account-Lite
- Guest checkout (no login required)
- Order lookup by email + order ID on a simple "Track Order" page

### ℹ️ About Page
- Artist story, studio photos, brand mission

### 📬 Contact Page
- Contact form with name, email, subject, message — validated with Zod
- Studio location/hours info

### 💼 Career Page
- Data-driven job listings pulled from the database
- Apply form with name, email, resume link, cover letter — validated with Zod

### 📜 Legal Pages
- Shipping & Returns policy
- Privacy Policy
- Terms of Service

---

## 3. Database (Lovable Cloud / Supabase)

### Tables
- **products**: id, title, slug, price, images (array), tags, size, style, stock, description, materials, dimensions, featured, created_at
- **orders**: id, items (JSON), total, currency, stripe_session_id, customer_email, customer_name, status, shipping_address, created_at
- **job_listings**: id, title, department, location, type, description, requirements, is_active, created_at
- **job_applications**: id, job_id, name, email, resume_url, cover_letter, created_at
- **newsletter_subscribers**: id, email, created_at

### Seed Data
- 12–15 sample paintings with placeholder images, varied styles/sizes/prices

---

## 4. Cart & State Management
- Zustand store for cart state, persisted to localStorage
- Add/remove/update quantity actions
- Cart item count in the navigation header

---

## 5. Stripe Payment Integration
- Enable Lovable's built-in Stripe integration
- Edge function to create Stripe Checkout sessions with line items from cart
- Webhook edge function to handle `checkout.session.completed` events and update order status
- Order record created in database upon successful payment

---

## 6. Navigation & Layout
- Sticky header with logo, nav links (Shop, About, Contact, Careers), cart icon with badge
- Mobile hamburger menu
- Footer with links to legal pages, social icons, newsletter signup

---

## 7. SEO & Performance
- Page titles and meta descriptions on every route
- Open Graph tags for social sharing
- JSON-LD structured data on product pages
- Lazy loading for images
- Optimized image sizing with responsive `srcSet` where possible

---

## 8. Implementation Order
1. Design system, layout shell, and navigation
2. Database setup — tables + seed data
3. Landing page (all sections)
4. Shop page with filters, sort, and search
5. Product detail page
6. Cart (Zustand store + cart page)
7. Stripe integration + checkout flow + webhook
8. Order confirmation & tracking
9. About, Contact, Career pages
10. Legal pages
11. Polish — animations, responsive tweaks, empty/loading/error states

