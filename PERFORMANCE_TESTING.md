# Performance Testing

Use the production build for final Lighthouse scoring.

```bash
npm run build
npm run preview
```

Open:

```text
http://localhost:4173/
```

Do not judge final Lighthouse performance from the Vite dev server on port `5173`; dev mode includes HMR and React refresh payloads that are not part of production.
