import { defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

//const appFolderName = path.resolve(process.cwd()).split("\\").slice(-1);

// https://vitejs.dev/config/
export default ({ mode }: UserConfig) => {
  if (mode) process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "./src"),
      },
    },
    plugins: [react()],
    server: {
      host: "127.0.0.1",
      port: Number(process.env.VITE_APP_PORT),
    },
/*     build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`
        }
      }
    } */
  });
}