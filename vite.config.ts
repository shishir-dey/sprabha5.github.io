import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const siteDomain = 'shashiprabha.com';

const sitemapPlugin = () => {
  const sitemapPath = path.resolve(__dirname, 'sitemap.xml');

  return {
    name: 'sitemap-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url !== '/sitemap.xml') {
          next();
          return;
        }

        if (!existsSync(sitemapPath)) {
          res.statusCode = 404;
          res.end('sitemap.xml not found');
          return;
        }

        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        res.end(readFileSync(sitemapPath, 'utf-8'));
      });
    },
    closeBundle() {
      if (!existsSync(sitemapPath)) {
        return;
      }

      const outPath = path.resolve(__dirname, 'dist', 'sitemap.xml');
      writeFileSync(outPath, readFileSync(sitemapPath, 'utf-8'));
    },
  };
};

const cnamePlugin = () => {
  return {
    name: 'cname-plugin',
    closeBundle() {
      const outPath = path.resolve(__dirname, 'dist', 'CNAME');
      writeFileSync(outPath, `${siteDomain}\n`);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sitemapPlugin(), cnamePlugin()],
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          markdown: ['react-markdown', 'gray-matter']
        }
      }
    }
  }
});
