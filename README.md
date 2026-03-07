# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- Express (for the optional lightweight backend API)
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Cloudinary (media CDN + transformations)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Cloudinary media

Image assets are delivered through Cloudinary so the UI can render optimized derivatives without hitting the local API. Set the cloud name in `.env` (or your hosting provider) before running `npm run dev` or deploying:

```env
VITE_CLOUDINARY_CLOUD_NAME=dqe88bfds
```

If you upload assets to a different account, update the value accordingly. Components use `AdvancedImage` from `@cloudinary/react`, so transformations (auto crop, quality, etc.) happen at the edge.

## Backend API (optional)

A minimal Express server still ships with the repo in case you want to serve dynamic data later on.

### Run the API locally

```sh
npm run server
```

The server listens on port `4000` by default and exposes the following JSON endpoints:

- `GET /api/health` - quick readiness probe
- `GET /api/sketches` - browse the sketchbook preview pieces
- `GET /api/products` - list paintings with filters (`q`, `style`, `size`, `minPrice`, `maxPrice`, `featured`, `sort`, `limit`, `offset`)
- `GET /api/products/:slug` & `/related` - detailed record plus related recommendations
- `POST /api/orders` - create an order; stocks are decremented in the local JSON data store
- `GET /api/orders/:id` - fetch an order confirmation
- `GET /api/job-listings` - list open roles (use `?active=true` to hide closed postings)
- `POST /api/job-applications` - submit an application payload (validated with Zod)
- `POST /api/newsletter` - capture newsletter signups with duplicate detection

Static media from `public/` is also exposed under `/media` so product images can be referenced directly from the backend if desired.

## Deploying API on Google Cloud Run

1. **Build & push the container**
   ```sh
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   gcloud builds submit --file server/Dockerfile --tag gcr.io/YOUR_PROJECT_ID/atelier-api
   ```
2. **Deploy to Cloud Run**
   ```sh
   gcloud run deploy atelier-api \
     --image gcr.io/YOUR_PROJECT_ID/atelier-api \
     --platform managed \
     --region YOUR_REGION \
     --allow-unauthenticated \
     --set-env-vars NODE_ENV=production,ALLOWED_ORIGINS=https://your-frontend.vercel.app,MEDIA_ROOT=/app/public
   ```
   Note the URL Cloud Run prints (e.g. `https://atelier-api-abc123-uc.a.run.app`).
3. **Environment variables**
   - `ALLOWED_ORIGINS`: comma-separated list of fully-qualified origins that should be allowed via CORS (include your Vercel production + preview domains).
   - `MEDIA_ROOT` (optional): absolute path to the folder that holds the `sketchs` imagery; defaults to `/app/public`.
   - `PORT`: provided automatically by Cloud Run.

## Deploying frontend on Vercel

1. Set the build command to `npm run build` and the output directory to `dist`.
2. Define `VITE_CLOUDINARY_CLOUD_NAME` under Production + Preview.
3. Deploy. The site reads local JSON data and pulls artwork from Cloudinary, so no additional API origin is required unless you extend the backend.
