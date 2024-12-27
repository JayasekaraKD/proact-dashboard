import { defineConfig } from 'astro/config';
import deno from '@astrojs/deno';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
    output: 'server',
    adapter: deno(),
    integrations: [
        tailwind({
            // Configure if needed
            applyBaseStyles: false,
        }),
        react(),
    ],
});