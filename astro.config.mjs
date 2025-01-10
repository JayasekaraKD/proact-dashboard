import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
    integrations: [
        tailwind(),
        react({
            // Enable React features like useState in Astro components
            include: ['**/react/*'],
        }),
    ],
    output: 'server',
    adapter: vercel({
        analytics: true,
        webAnalytics: {
            enabled: true,
        },
        speedInsights: {
            enabled: true,
        },
        imageService: true,
    }),
});