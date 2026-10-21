# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Vercel Web Analytics

Web Analytics is registered through the `@vercel/analytics/nuxt` module. Enable
Web Analytics in the Vercel project's Analytics tab, then deploy the app to start
collecting page views, including client-side navigation.

The npm override keeps Analytics on the project's Vue Router 5 version used by
Nuxt 4.4. Analytics 2.0.1 still declares an optional Vue Router 4 peer dependency;
its Nuxt integration uses Nuxt's routing APIs.
