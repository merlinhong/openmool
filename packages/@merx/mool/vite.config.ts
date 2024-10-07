import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve, join } from "path";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import seoPrerender from "vite-plugin-seo-prerender";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ElementPlus from "unplugin-element-plus/vite";

import { mool } from "./src/mool/vite-plugin/src/index";

function toPath(dir: string) {
  return fileURLToPath(new URL(dir, import.meta.url));
}

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    base: "./",
    plugins: [
      vue(),
      vueJsx(),
      mool(),
      ElementPlus({}),
      AutoImport({
        resolvers: [
          ElementPlusResolver(), // Auto import icon components
          // 自动导入图标组件
          IconsResolver({}),
        ],
        dts: "src/auto-import.d.ts",
      }),
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"],
          }),
          ElementPlusResolver(),
        ],
        dts: "src/components.d.ts",
      }),
      Icons({
        autoInstall: true,
      }),
      // seo预渲染插件
      seoPrerender({
        hashHistory: true,
        puppeteer: {}, // puppeteer参数配置，可选
        routes: ["/page", "/login"], // 需要生成的路由，必填
        removeStyle: true, // 是否移除多余样式，默认true。在启动服务vite preview时会产生一些多余样式，如若丢失样式可设置为false
        callback: (content, route) => {
          // 可对当前页面html内容进行一些替换等处理
          // 一些处理逻辑...
          return content;
        },
        publicHtml: true,
      }),
    ],
    resolve: {
      alias: {
        "@": toPath("./src"),
        $: toPath("./src/modules"),
      },
    },
    build: {
      minify: "esbuild",
      outDir: env.VITE_APP_OUTDIR,
      // terserOptions: {
      // 	compress: {
      // 		drop_console: true,
      // 		drop_debugger: true
      // 	}
      // },
      sourcemap: env.NODE_ENV === "development",
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // if (!["@cool-vue/crud"].find((e) => id.includes(e))) {
              //   if (id.includes("prettier")) {
              //     return;
              //   }
              //   return id
              //     .toString()
              //     .split("node_modules/")[1]
              //     .replace(".pnpm/", "")
              //     .split("/")[0];
              // } else {
              //   return "comm";
              // }
            }
          },
        },
      },
    },
    server: {
      port: 3008,
      open: "#/page",
      proxy: {
        [`${env.VITE_APP_BASE_API}`]: {
          target: env.VITE_APP_PROXY,
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve("./src/assets/less/global.less")}";`,
          },
          javascriptEnabled: true,
        },
      },
     
    },
  });
};
