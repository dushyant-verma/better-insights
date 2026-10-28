# Better Insights

Better Insights website and headless digital platform.

## Repository Structure

- `better-insights-frontend/`: Next.js 16 frontend application (React 19, TypeScript, Tailwind CSS, Turbopack).
- `wp-content/`: WordPress CMS backend files, custom `astra-child` theme, templates, and plugins.

## Deployment on Vercel

The web application is located inside the `better-insights-frontend` directory. When deploying this repository to Vercel:

1. In the Vercel Project Settings, navigate to **Settings > General**.
2. Under **Root Directory**, click **Edit** and set it to:
   ```text
   better-insights-frontend
   ```
3. Leave **Framework Preset** as **Next.js** (automatically detected once the Root Directory is set).
4. Save and trigger a new deployment.
