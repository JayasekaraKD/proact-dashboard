import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';  // Change this

export default defineConfig({
    output: 'server',
    adapter: vercel(),  // Change this
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        react(),
    ],
    vite: {
        define: {
            'process.env.PUBLIC_SUPABASE_URL': JSON.stringify(process.env.PUBLIC_SUPABASE_URL),
            'process.env.PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(process.env.PUBLIC_SUPABASE_ANON_KEY),
            'process.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL),
        },
    },
});