This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## important
the main point is to put javascript code in such a way that nextjs will not get it through build process and it is only loaded scripts if it is on webview aka Android application.
take a look at `_app.tsx`
```js
        if (window.AdTraceBridge) { // check if webView
```