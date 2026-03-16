# M&M Auto Solutions | M² Solutions Platform

Production-grade platform for automotive services and asset-backed financing in Jamaica.

## Tech Stack
- **Frontend:** React, Tailwind CSS v4, Framer Motion, Lucide Icons
- **Backend:** Express.js (Node.js)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Validation:** Zod + React Hook Form

## Local Setup

1. **Clone and Install:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file based on `.env.example`:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `GEMINI_API_KEY`: (Optional) For AI features

3. **Database Setup:**
   Run the SQL provided in `supabase/schema.sql` in your Supabase SQL Editor.

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## Deployment (Cloud Run)

The platform is dockerized and ready for Google Cloud Run.
1. Build the production image.
2. Deploy to Cloud Run with environment variables configured.
3. Ensure port 3000 is exposed.

## Information Architecture

### Public
- `/`: Hero, Services, Parts Preview, Financing Explainer
- `/book-service`: Multi-step repair/service request
- `/apply-financing`: Asset-backed financing application
- `/parts`: Parts catalog (managed inventory)

### Admin
- `/admin`: Dashboard for managing requests, financing, and inventory.

## Compliance Note
This platform uses "asset-backed financing" and "structured monthly payments" terminology. It does NOT issue cash loans. All payments are made directly to suppliers.
