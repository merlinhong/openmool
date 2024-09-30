<template>
  <div
    class="toolbar"
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 10px 20px;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      shadow-color: #eee;
      box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.1);
    "
  >
    <span style="font-size: 12px; color: #0b9142">查看新手引导</span>
    <div>
      <el-button type="warning" plain>撤销</el-button>
      <el-button type="primary">重做</el-button>
      <el-button type="primary" plain @click="preview">预览</el-button>
      <el-button type="success" @click="saveSchema">保存</el-button>
      <el-button type="primary" @click="genCode">出码</el-button>
      <!-- <input type="file" webkitdirectory @change="handleFolderSelect" ref="fileInput" style="display:none" /> -->
    </div>
  </div>
  <el-drawer v-model="previewRef" size="98%" direction="btt" :with-header="false">
    <BasicPage :isPreview="previewRef" v-for="(box, ind) in PageSchema.children" :key="ind" :schema="box" />
  </el-drawer>
  <el-result
    style="
      width: 20rem;

      position: absolute;

      background: #fff;

      left: 45%;

      top: 40%;

      z-index: 9999;

      border: 1px solid #e2e2e2;
    "
    v-if="generateCoding"
    :icon="statuIcon"
    :title="statuTitle"
  >
    <template #extra v-if="statuIcon == 'success'">
      <el-button type="primary" @click="generateCoding = false">好的</el-button>
    </template>
  </el-result>
</template>

<script setup lang="tsx">
import { ref,Ref,PropType } from "vue";
import { Page, Col } from "@/mool/types";
defineProps({
  pageConfig: {
    type: Object as PropType<Ref<Page>>,
    required: true,
  },
});
const PageSchema = defineModel<Page>("pageConfig", { required: true });
const statuIcon = ref<"info" | "success" | "warning" | "error">("info");

const statuTitle = ref("正在出码，请稍等....");
 const generateCoding = ref(false);

const previewRef = ref(false);
const preview = () => {
  previewRef.value = true;
};

const genCode = async () => {
  try {
    // 请求文件夹选择

    const folderHandle = await self.showDirectoryPicker();

    generateCoding.value = true;

    fetch(
      "/api/generate-code",

      {
        method: "POST", // 或 'GET', 'PUT', 'DELETE', 等

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          pageInfo: {
            name: "page",
            schema: PageSchema.value,
          },

          blocksData: [],
        }),
      },
    )
      .then((response) => {
        return response.json();
      })

      .then(async (res) => {
        const pageCode = res.data[0].panelValue

          .replace(/\n\r/, "")

          .replace(/&quot;/g, "'");

        const tsCode = res.data[0].panelTsCode

          .replace(/\n\r/, "")

          .replace(/&quot;/g, "'");

        const requestCode = res.data[0].panelRqCode

          .replace(/\n\r/, "")

          .replace(/&quot;/g, "'");

        // 创建文件

        [
          {
            name: "type.ts",

            code: tsCode,
          },

          {
            name: "page.vue",

            code: pageCode,
          },

          {
            name: "utils/request.ts",

            code: requestCode,
          },
        ].map(async (item) => {
          async function write(file: any, code: any) {
            const writable = await file.createWritable();

            await writable.write(code.replace(/^`|`$/g, ""));

            await writable.close();
          }

          if (item.name.indexOf("/") != -1) {
            // 创建一个新的文件夹

            const newFolderHandle = await folderHandle.getDirectoryHandle(
              item.name.split("/")[0],

              { create: true },
            );

            const writeFile = await newFolderHandle.getFileHandle(
              item.name.split("/")[1],

              { create: true },
            );

            write(writeFile, item.code);
          } else {
            const writeFile = await folderHandle.getFileHandle(item.name, {
              create: true,
            });

            write(writeFile, item.code);
          }

          // 写入内容

          setTimeout(() => {
            statuIcon.value = "success";

            statuTitle.value = "下载成功!";
          }, 2000);
        });
      });
  } catch (error) {
    console.error("错误:", error);
  }
};

const saveSchema = () => {
  fetch("/api/save-schema", {
    method: "post", // 或 'GET', 'PUT', 'DELETE', 等

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      pageInfo: {
        name: "page",

        schema: PageSchema.value,
      },

      blocksData: [],
    }),
  }).then((res) => {
    ElMessage.success("保存成功");
  });
};
</script>

<style></style>
