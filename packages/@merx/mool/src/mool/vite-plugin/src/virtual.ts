import type { Plugin } from "vite";
import { createSvg } from "./svg";

export async function virtual(): Promise<Plugin> {
  const virtualModuleIds: string[] = ["virtual:svg-register"];

  return {
    name: "vite-cool-virtual",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // 页面刷新时触发
        if (req.url == "/@vite/client") {
          // 重新加载虚拟模块
          virtualModuleIds.forEach((vm) => {
            const mod = server.moduleGraph.getModuleById(`\0${vm}`);

            if (mod) {
              server.moduleGraph.invalidateModule(mod);
            }
          });
        }

        next();
      });
    },

    resolveId(id) {
      if (virtualModuleIds.includes(id)) {
        return "\0" + id;
      }
    },
    async load(id) {
      if (id == "\0virtual:svg-register") {
        const { code } = await createSvg();

        return code;
      }
    },
  };
}
