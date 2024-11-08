import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve, join } from 'path';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import ElementPlus from 'unplugin-element-plus/vite';

function toPath(dir: string) {
  return fileURLToPath(new URL(dir, import.meta.url));
}

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ElementPlus({}),
    AutoImport({
      resolvers: [
        ElementPlusResolver(), // Auto import icon components
        // 自动导入图标组件
        IconsResolver({}),
      ],
      dts: 'src/auto-import.d.ts',
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver(),
      ],
      dts: 'src/components.d.ts',
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      '@': toPath('./src'),
      $: toPath('./src/modules'),
    },
  },
  build: {
    minify: false,
    cssCodeSplit: true,
    lib: {
      entry: {
        index: resolve(__dirname, './src/index.js'),
      },
      name: 'MoolEngine', // 库的名称
      fileName: (formats, entryName) => `${entryName}.js`, // 输出文件名
      formats: ['es'], // 选择输出格式
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        entryFileNames: (chunkInfo) => {
          // 这里可以自定义输出文件名
          return `mool/${chunkInfo.name}.js`;
        },
      },
    },
    // outDir: env.VITE_APP_OUTDIR,
    // rollupOptions: {
    //   external: ['vue', 'vue-router', 'pinia'], // 确保外部化处理那些你不想打包进库的依赖
    // },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve('./src/assets/css/global.less')}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
