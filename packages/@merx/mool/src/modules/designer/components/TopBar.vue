<template>
  <div
    class="toolbar shadow-xl flex justify-between items-center bg-white py-2.5 px-5 border-t border-b border-gray-200"
  >
    <span class="text-xs text-blue-400 font-bold">查看新手引导</span>

    <!--PC/移动端切换图标-->
    <div class="flex items-center space-x-2">
      <el-tooltip content="PC端" placement="top">
        <el-button type="text" @click="switchToPC" :class="{ 'icon-active': isPC }">
          <el-icon class="custom-icon"><Monitor /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip content="移动端" placement="top">
        <el-button type="text" @click="switchToMobile" :class="{ 'icon-active': !isPC }">
          <el-icon class="custom-icon"><Iphone /></el-icon>
        </el-button>
      </el-tooltip>
    </div>

    <div class="flex items-center space-x-2">
      <!-- 创建页面 -->
      <el-button type="primary" text @click="createPage">创建页面</el-button>
      <span class="mx-2 text-gray-400">|</span>

      <el-tooltip content="撤销" placement="top">
        <el-button type="text">
          <el-icon class="custom-icon"><RefreshLeft /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip content="重做" placement="top">
        <el-button type="text">
          <el-icon class="custom-icon"><RefreshRight /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip content="预览" placement="top">
        <el-button type="text" @click="preview">
          <el-icon class="custom-icon"><View /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip content="保存" placement="top">
        <el-button type="text" @click="saveSchema">
          <el-icon class="custom-icon"><Upload /></el-icon>
        </el-button>
      </el-tooltip>
      <el-tooltip content="出码" placement="top">
        <el-button type="text" @click="genCode">
          <el-icon class="custom-icon"><Download /></el-icon>
          
        </el-button>
      </el-tooltip>
    </div>
  </div>
  <el-drawer v-model="previewRef" size="98%" direction="btt" :with-header="false" destroy-on-close>
    <div class="">
      <BasicPage :isPreview="previewRef" v-for="(box, ind) in PageSchema.children" :key="ind" :schema="box" />
    </div>
  </el-drawer>
  <el-result
    class="w-80 absolute bg-white left-1/2 top-2/5 -translate-x-1/2 z-50 border border-gray-200"
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
import { ref, Ref, PropType, watch } from "vue";
import { Page, Col } from "@/mool/types";
import BasicPage from "$/designer/components/canvasContainer.vue";
import { Monitor, Iphone, RefreshLeft, RefreshRight, View, Download, Upload } from "@element-plus/icons-vue";

const PCSize = "100%";
const MobileSize = "25%";

const emit = defineEmits(["changeSize"]);
const PageSchema = defineModel<Page>("pageConfig", { required: true });
const statuIcon = ref<"info" | "success" | "warning" | "error">("info");

const statuTitle = ref("正在出码，请稍等....");
const generateCoding = ref(false);

const previewRef = ref(false);
const preview = () => {
  previewRef.value = true;
};

const createPage = () => {
  const newPage = {
    type: "Page",
    children: [],
    props: {
      name: "新页面",
    },
  };
  PageSchema.value.children.push(newPage);
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
      id: PageSchema.value.id,
      schema: {
        pageInfo: {
          name: PageSchema.value.componentName,

          schema: PageSchema.value,
        },

        blocksData: [],
      },
    }),
  }).then((res) => {
    ElMessage.success("保存成功");
  });
};

// 新增的响应式变量和方法
const isPC = ref(true);

const switchToPC = () => {
  isPC.value = true;
  // 这里可以添加切换到PC视图的逻辑
  emit("changeSize", { size: PCSize, isPC: true });
};

const switchToMobile = () => {
  isPC.value = false;
  // 这里可以添加切换到移动端视图的逻辑
  emit("changeSize", { size: MobileSize, isPC: false });
};

// 监听isPC的变化
watch(isPC, (newValue) => {
  if (newValue) {
    console.log("切换到PC视图");
    // 这里可以添加更多PC视图相关的逻辑
  } else {
    console.log("切换到移动端视图");
    // 这里可以添加更多移动端视图相关的逻辑
  }
});

// 其他脚本代码保持不变
</script>

<style scoped>
.el-button.text-blue-500 {
  color: #409eff;
}

.custom-icon {
  font-size: 20px; /* 调整图标大小 */
  color: #333; /* 图标颜色 */
}

.el-button {
  padding: 8px; /* 保持按钮内边距 */
}

.el-button:hover .custom-icon {
  color: #409eff; /* 鼠标悬停时的颜色 */
}

.icon-active {
  color: #409eff; /* 选中时的颜色 */
}

.icon-active .custom-icon {
  color: #409eff; /* 确保选中时图标也变色 */
}
</style>
