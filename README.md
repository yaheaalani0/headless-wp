# Headless WordPress + Next.js Starter

A minimal example of using WordPress as a headless CMS with Next.js 16 and Apollo Client.  
This project fetches live WordPress posts and pages via WPGraphQL.

## Requirements
- Node.js 18+
- A WordPress installation with the WPGraphQL plugin enabled

## Setup
Clone the repository, install dependencies, create a `.env.local` file in the project root, and start the development server.

Install dependencies:
```bash
npm install
```

Create `.env.local`:
```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://headless-wp.local/graphql
```

Start the dev server:
```bash
npm run dev
```

Visit http://localhost:3000.

## Folder Structure
```text
app/
	layout.tsx
	page.tsx
	about/page.tsx
lib/
	apolloClient.ts
.env.local
next.config.ts
tsconfig.json
```

## Deployment
Deploy to Vercel and set the following environment variable:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=https://your-live-wordpress-site.com/graphql
```
