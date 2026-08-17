import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Usa a porta atribuída via env PORT (autoPort); cai para o padrão do Vite se ausente.
  server: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
});
