# Shrusara Fashion Boutique

Premium bridal and designer boutique website built with a lightweight React + Tailwind frontend and an Express backend for admin, blog, gallery, Firestore, JWT auth, and imgbb uploads.

## Stack

- Frontend: React (Vite), Tailwind CSS
- Backend: Node.js, Express
- Database: Firebase Firestore
- Image uploads: imgbb API
- Auth: JWT

## Setup

1. Install dependencies:

```bash
npm install --prefix client
npm install --prefix server
```

2. Copy env files and fill in real values:

```bash
copy client\.env.example client\.env
copy server\.env.example server\.env
```

3. Start the backend:

```bash
npm run server:dev
```

4. Start the frontend in a second terminal:

```bash
npm run client:dev
```

## Important env values

- `IMGBB_API_KEY`: required for admin uploads
- `JWT_SECRET`: required for secure admin login
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`
- `GOOGLE_MAPS_API_KEY` and `GOOGLE_PLACE_ID`: optional for live Google reviews
- `VITE_PHONE_NUMBER` / `VITE_WHATSAPP_NUMBER`: replace placeholders with real boutique contact details

## Notes

- Firestore uses the provided Firebase project config.
- The public site includes curated fallback gallery images, reviews, and blog content so the UI stays populated before admin uploads.
- Live Google reviews gracefully fall back to curated testimonials if the Places API is not configured.

