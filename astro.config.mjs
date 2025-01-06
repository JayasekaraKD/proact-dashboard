import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';  // Add this

export default defineConfig({
    output: 'server',
    adapter: node({  // Add this
        mode: 'standalone'
    }),
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