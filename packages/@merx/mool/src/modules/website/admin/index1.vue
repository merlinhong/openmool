<template>
  <div :style="{ backgroundColor: '#f1f1f1' }">
    <div
      :style="{
        padding: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        alignItems: 'baseline',
        width: '100%',
        height: 'fit-content',
        backgroundColor: '#fff',
      }"
      class=""
    >
      <el-form
        labelPosition="right"
        labelWidth="80px"
        :style="{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }"
        class=""
      >
        <el-form-item label="规范稿源" :style="{ width: 'fit-content', height: 'fit-content' }" class="">
          <el-input
            :style="{ width: 'fit-content', fontSize: '16px' }"
            class=""
            v-model="formData.specSource"
          ></el-input
        ></el-form-item>
        <el-form-item label="更新人" :style="{ width: 'fit-content', height: 'fit-content' }" class="">
          <el-input
            :style="{ width: 'fit-content', fontSize: '16px' }"
            class=""
            v-model="formData.updateUser"
          ></el-input
        ></el-form-item>
        <el-form-item label="更新时间" :style="{ width: 'fit-content', height: 'fit-content' }" class="">
          <el-input :style="{ width: 'fit-content', fontSize: '16px' }" class=""></el-input></el-form-item
      ></el-form>
      <div :style="{ padding: '5px', backgroundColor: '#fff', display: 'flex' }" class="">
        <el-button
          :style="{ display: 'flex', flexDirection: 'row', width: 'fit-content' }"
          class=""
          type="primary"
          :text="false"
          color=""
          >搜索</el-button
        >
        <el-button
          :style="{ display: 'flex', flexDirection: 'row', width: 'fit-content', marginLeft: '10px' }"
          class=""
          type="primary"
          :text="false"
          color=""
          >重置</el-button
        >
      </div>
    </div>
    <div :style="{ padding: '5px', backgroundColor: '#fff' }" class="">
      <div
        :style="{
          padding: '5px',
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          marginLeft: '0px',
          width: '100%',
          height: '100%',
        }"
        class=""
      >
        <span :style="{ width: 'fit-content', color: '#000', fontSize: '16px' }" class="table_title">列表</span>
        <div :style="{ padding: '5px', backgroundColor: '#fff', display: 'flex' }" class="">
          <el-button
            :style="{ display: 'flex', flexDirection: 'row', width: 'fit-content', marginRight: '10px' }"
            class=""
            type="primary"
            :text="false"
            color=""
            @click="onClick"
            :plain="true"
            >新建</el-button
          >
          <el-button
            :style="{ display: 'flex', flexDirection: 'row', width: 'fit-content', marginRight: '10px' }"
            class=""
            type="primary"
            :text="false"
            color=""
            @click="onClick"
            :plain="true"
            >导入</el-button
          >
          <el-button
            :style="{ display: 'flex', flexDirection: 'row', width: 'fit-content', marginRight: '10px' }"
            class=""
            type="warning"
            :text="false"
            color=""
            @click="onClick"
            :plain="true"
            >删除</el-button
          >
        </div>
      </div>
      <el-table class="" :data="state.tabledata" :border="true"
        ><el-table-column
          v-for="(item, index) in state.columns"
          :label="item.title"
          :prop="item.dataIndex"
          v-bind="item"
          :key="index"
        >
          <template #default="scope" v-if="item.render">
            <component :is="item.render(scope, scope.row[item.dataIndex])"></component>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <el-dialog :style="{}" title="弹窗1" width="50%" v-model:modelValue="dialogVisible">
    <div :style="{ padding: '5px', backgroundColor: '#fff' }" class="">
      <el-button
        :style="{ display: 'flex', flexDirection: 'row', width: 'fit-content' }"
        class=""
        type="primary"
        :text="false"
        color=""
        >按钮文本</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup lang="tsx">
import * as vue from "vue";
import { defineProps, defineEmits, ComputedRef } from "vue";
import { request } from "./utils/request";
import { type SearchTableColumn } from "./type.ts";
import { ElButton, ElDialog, ElForm, ElFormItem, ElTable, ElInput } from "element-plus";

const props = defineProps({});

const emit = defineEmits([]);

const state = vue.reactive<{ columns?: SearchTableColumn[]; [key: string]: any }>({
  tabledata: [
    {
      name: "张三",
      age: 18,
      sex: "男",
    },
    {
      name: "李四",
      age: 23,
      sex: "女",
    },
    {
      name: "王五",
      age: 56,
      sex: "男",
    },
  ],
  columns: [
    {
      title: "规范稿源",
      dataIndex: "specSource",
    },
    {
      title: "更新时间",
      dataIndex: "single",
    },
    {
      title: "更新人",
      dataIndex: "updateUser",
    },
    {
      title: "操作",
      dataIndex: "opt",
      width: "180",
      align: "center",
      render: () => {
        return (
          <div style={{ padding: "5px", backgroundColor: "#fff", display: "flex" }} class="">
            <el-button
              style={{ display: "flex", flexDirection: "row", width: "fit-content" }}
              class=""
              type="primary"
              text={false}
              color=""
            >
              编辑
            </el-button>
            <el-button
              style={{ display: "flex", flexDirection: "row", width: "fit-content" }}
              class=""
              type="danger"
              text={false}
              color=""
            >
              删除
            </el-button>
          </div>
        );
      },
    },
  ],
});

const datetimerange0 = vue.computed({
  get() {
    return;
  },
  set() {},
});

interface FormData {
  specSource: string;
  updateUser: string;
}
const formData = vue.ref<FormData>({
  specSource: "",
  updateUser: "",
});

const dialogVisible = vue.ref<boolean>(false);
</script>

<style scoped>
.table_title::before {
  content: "";
  display: inline-block;
  width: 2px;
  height: 12px;
  margin-right: 5px;
  background-color: #51aedb;
}
</style>
