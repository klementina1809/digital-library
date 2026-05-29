# Digital Library

Digital Library is a Next.js app for searching books and saving them to a personal collection.

Users can:

- search books from the Gutenberg API
- register and log in with Supabase
- add books to a personal collection
- remove books from the collection
- save rating and notes for saved books

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn UI components
- shadcn Sonner for toasts
- React Query for client requests and cache
- Supabase for auth and database
- Gutenberg API for books

## Getting Started

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Add environment variables:

```env
GUTENBERG_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Supabase

The app uses Supabase for authentication and for storing user collections.

Before running the full app flow, create the required Supabase project, add the environment variables, and create the database tables for collections and collection books.
