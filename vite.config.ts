import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data:",
    "media-src 'self' blob:",
    "frame-src 'self' https://www.google.com https://maps.google.com",
    "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
  ].join('; '),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};

export default defineConfig({
  base: '/cabinet-cabis/',
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      ...securityHeaders,
      'Content-Security-Policy': securityHeaders['Content-Security-Policy'].replace(
        "script-src 'self'",
        "script-src 'self' 'unsafe-inline'",
      ).replace(
        "connect-src 'self'",
        "connect-src 'self' ws://localhost:3000 ws://127.0.0.1:3000",
      ),
    },
  },
  preview: {
    headers: securityHeaders,
  },
});
