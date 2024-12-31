import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
    output: 'static',
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