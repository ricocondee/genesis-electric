import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Auto-update the service worker when the app is opened
      manifest: {
        name: 'Genesis Electric',
        short_name: 'Genesis',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a2472',
        theme_color: '#0a2472',
        icons: [
          {
            src: '/assets/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // Cache for 1 year
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.png$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30 // Cache for 30 days
              }
            }
          }
        ]
      }
    })
  ]
});
