import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel'; // Updated import

export default defineConfig({
    integrations: [tailwind(), react()],
    output: 'server',
    adapter: vercel({
        analytics: true,
    }),
});