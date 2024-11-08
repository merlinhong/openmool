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
import seoPrerender from 'vite-plugin-seo-prerender';
import ElementPlus from 'unplugin-element-plus/vite';

function toPath(dir: string) {
  return fileURLToPath(new URL(dir, import.meta.url));
}

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    base: './',
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
      minify: 'esbuild',
      lib: {
        entry: resolve(__dirname, 'src/index.ts'), // 库的入口文件
        name: 'MoolEngine', // 库的名称
        fileName: (format) => `mool-engine.${format}.js`, // 输出文件名
      },
      outDir: env.VITE_APP_OUTDIR,
      rollupOptions: {
        external: ['vue', 'vue-router', 'pinia'], // 确保外部化处理那些你不想打包进库的依赖
      },
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
};
