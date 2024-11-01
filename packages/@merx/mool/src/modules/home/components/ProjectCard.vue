<template>
  <div class="project-card" @click="$emit('click', project)">
    <div class="flex">
      <svg class="flex-1">
        <use xlink:href="#icon-my_app" />
      </svg>
      <div class="card-content flex-1 text-sm">
        <h1 class="text-[18px] font-bold my-2">{{ project.name }}</h1>
        <p>{{ project.description }}</p>
      </div>
    </div>
    <el-divider class="!m-auto " border-style="dashed"></el-divider>
    <div class="card-actions  item-center">
      <div class="flex-1 cursor-pointer text-center">
        <el-tooltip content="设置" effect="light">
          <i-ep-setting class="w-[15px]"/>
        </el-tooltip>
        <el-tooltip content="删除" effect="light">
          <svg @click.stop="$emit('delete', page.id)" class="delete-btn" xmlns="http://www.w3.org/2000/svg" width="19"
            height="19" viewBox="0 0 24 24">
            <path fill="#333333"
              d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z" />
          </svg>
        </el-tooltip>
      </div>
      <el-button class="flex-1 hover:!bg-gray-100 !px-0" text size="small"
        @click.stop="$emit('open', project)">进入页面</el-button>
    </div>
  </div>
</template>

<script>
import { theme } from '../config';

export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      theme,
    };
  },
};
</script>

<style scoped>
.project-card {
  background-color: white;
  border: 1px solid v-bind('theme.border');
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 1rem;
}

h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: v-bind('theme.primary');
}

p {
  margin: 0;
  color: v-bind('theme.lightText');
}

.card-actions {
  display: flex;
  background-color: #fff;
  padding: 10px;
}

button {
  flex: 1;
  color: v-bind('theme.text');
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: v-bind('theme.buttonHover');
}

.delete-btn {}
</style>
