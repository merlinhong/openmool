<template>
  <div
    style="
      border-radius: 10px;
      width: calc(100% - 5px);
      height: 100vh;
      margin: 0 5px;
      border: 2px solid #fff;
      box-sizing: border-box;
    "
  >
    <el-header>
      <div style="width: 300px; text-align: center">新手引导</div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="首页" name="first">
          <el-main>
            <el-row>
              <el-col :span="24">
                <el-card shadow="hover">
                  <template #header>
                    <div
                      style="
                        line-height: 20px;
                        font-size: 16px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                    >
                      <span>最近使用</span>
                    </div>
                  </template>
                  <div style="height: 50px"></div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-card shadow="hover">
                  <template #header>
                    <div
                      style="
                        line-height: 20px;
                        font-size: 16px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                    >
                      <span>我的表单</span>
                      <el-button type="primary" size="small" style="float: right" @click="()=>newAddForm('')"
                        >新建表单</el-button
                      >
                    </div>
                  </template>
                  <div style="height: 50px">
                    <div style="width: 100px; height: 40px; font-size: 14px" @click="newAddForm(myForm)">未命名表单1</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-card shadow="hover">
                  <template #header>
                    <div
                      style="
                        line-height: 20px;
                        font-size: 16px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                    >
                      <span>我的应用</span>
                      <el-button type="primary" size="small" style="float: right">新建应用</el-button>
                    </div>
                  </template>
                  <div style="height: 50px"></div>
                </el-card>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-card shadow="hover">
                  <template #header>
                    <div
                      style="
                        line-height: 30px;
                        font-size: 16px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                      "
                    >
                      <span>我的组件</span>
                      <el-button type="primary" size="small" style="float: right">上传</el-button>
                    </div>
                  </template>
                  <div style="height: 50px"></div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-tab-pane>
        <el-tab-pane label="模板库" name="second">模板库</el-tab-pane>
      </el-tabs>
      <div style="width: 300px">登录</div>
    </el-header>
    <el-footer style="position: fixed; bottom: 0; width: 100%">Footer</el-footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const activeName = ref("first");
const newAddForm = (config) => {
  console.log(config);
  
  router.push({
    path: "/workplacePlatform/index",
    query:{
      config:config?JSON.stringify(config):''
    }
  });
};
</script>

<style lang="less">
.demo-tabs {
  align-items: center;
  width: 200px !important;
  .el-tabs__header {
    width: 115px;

    margin: auto;
    background-color: #fff;
    border-radius: 4px;
    padding-left: 20px;

    .el-tabs__nav-wrap {
      &::after {
        content: "";
        background-color: transparent !important;
      }
    }
  }

  .el-tabs__content {
    width: 96vw;
    margin-left: -44vw;
    margin-top: 20px;
    padding: 16px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
}

.el-header {
  width: 100%;
  background-color: #fff;
  color: #333;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0;
  .el-card__header {
    padding: 10px;
  }
}

.el-aside {
  color: #333;
}

body > .el-container {
  padding-left: 20px;
}

.el-aside {
  color: #333;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  height: calc(100vh - 160px);
}

.el-row {
  margin-bottom: 20px;
}
</style>
