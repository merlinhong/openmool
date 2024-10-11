<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onUnmounted } from "vue";
import BasicCanvas from "./BasicCanvas.vue";
import { Page, Col } from "@/mool/types";

const props = defineProps<{
  pageConfig: Page;
  hasActive?: boolean;
  customStyle?: { width?: string; margin?: string };
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "update:pageConfig", value: Page): void;
  (e: "active", value: Col): void;
  (e: "resize", width: number, height: number): void; // 新增 resize 事件
}>();

const iframeRef = ref<HTMLIFrameElement | null>(null);
const canvasRef = ref<InstanceType<typeof BasicCanvas> | null>(null);

const injectTailwindCSS = (doc: Document) => {
  const Script = doc.createElement("script");
  Script.src = new URL("../js/tailwind.js", import.meta.url).href;
  doc.head.appendChild(Script);
};

onMounted(() => {
  if (iframeRef.value) {
    const iframeDoc = iframeRef.value.contentDocument;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { 
                margin: 0; 
                padding: 0; 
                overflow: hidden; 
              }
              #canvas-container { 
                width: 100%; 
                height: 100%; 
                overflow-y: auto;
                scrollbar-width: none;
                -ms-overflow-style: none;
              }
              #canvas-container::-webkit-scrollbar {
                display: none;
              }
              .canvas-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
              }
                
            </style>
          </head>
          <body>
            <div id="canvas-container"></div>
          </body>
        </html>
      `);
      iframeDoc.close();

      // 注入 Tailwind CSS
      injectTailwindCSS(iframeDoc);

      // 复制主文档的样式到 iframe
      const styles = Array.from(document.styleSheets);
      styles.forEach((styleSheet) => {
        if (styleSheet.href) {
          const linkElem = iframeDoc.createElement("link");
          linkElem.rel = "stylesheet";
          linkElem.href = styleSheet.href;
          iframeDoc.head.appendChild(linkElem);
        } else {
          const styleElem = iframeDoc.createElement("style");
          Array.from(styleSheet.cssRules).forEach((rule) => {
            styleElem.appendChild(iframeDoc.createTextNode(rule.cssText));
          });
          iframeDoc.head.appendChild(styleElem);
        }
      });

    }
  }
});

watch(
  () => props.pageConfig,
  () => {
    nextTick(() => {
      if (canvasRef.value) {
        canvasRef.value.init(props.pageConfig);
      }
      // 在 pageConfig 更新后调用 adjustStyles
      //   adjustStyles();
    });
  },
  { deep: true },
);

const handleActive = (val: Col) => {
  emit("active", val);
};

const updatePageConfig = (newConfig: Page) => {
  emit("update:pageConfig", newConfig);
};
console.log(props.hasActive);

</script>

<template>
  <div class="iframe-container">
    <iframe
      class="iframe-content"
      ref="iframeRef"
      frameborder="0"
      :style="{
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: '#f5f6f7',
      }"
    >
      <template v-if="iframeRef">
        <Teleport :to="iframeRef.contentDocument?.body.querySelector('#canvas-container') || 'body'">
            <BasicCanvas
              ref="canvasRef"
              :pageConfig="pageConfig"
              :hasActive="hasActive"
              :customStyle="customStyle"
               v-loading="loading"
              @active="handleActive"
              @update:pageConfig="updatePageConfig"
              :doc="iframeRef.contentDocument"
            />
        </Teleport>
      </template>
    </iframe>
  </div>
</template>

<style scoped>
.iframe-container {
  width: v-bind('props.customStyle?.width || "100%"');
  overflow: hidden;
  margin: v-bind('props.customStyle?.margin || "20px 160px"');
}

/* 添加响应式样式 */
@media (max-width: 1024px) {
  .iframe-container {
    margin: 10px;
  }
}
</style>
