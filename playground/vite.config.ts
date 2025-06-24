import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  build: {
    outDir: "../public",
    emptyOutDir: true,
    assetsDir: "./",
    rollupOptions: {
      // 确保字体文件被包含在构建中
      external: [],
      output: {
        assetFileNames: (assetInfo) => {
          // 如果是字体文件，放在根目录
          if (assetInfo.name && assetInfo.name.endsWith('.ttf')) {
            return '[name].[ext]';
          }
          return 'assets/[name]-[hash].[ext]';
        },
      },
    },
  },
  define: {
    "process.env.IS_PREACT": JSON.stringify("false"),
  },
  plugins: [react()],
  server: {
    warmup: {
      /* 
        A small performance improvement so that this file is already transformed, cached when we receive the request :)
        See more: https://vitejs.dev/guide/performance.html#warm-up-frequently-used-files
      */
      clientFiles: [
        "./testcases/**/*",
        "../src/parser/**/*",
        "../src/graphToExcalidraw.ts",
        "./initExcalidraw.ts",
      ],
    },
  },
  // 确保字体文件作为静态资源处理
  publicDir: false, // 禁用默认的public目录
  assetsInclude: ['**/*.ttf'], // 包含字体文件
});
