import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // root directory ကို သတ်မှတ်ပါ
  root: '.',
  build: {
    // build output အတွက် directory သတ်မှတ်ပါ
    outDir: 'dist',
    rollupOptions: {
      // input file ကို သတ်မှတ်ပါ
      input: path.resolve(__dirname, 'public/index.html')
    }
  },
  // Public directory ကို သတ်မှတ်ပါ
  publicDir: 'public'
});
