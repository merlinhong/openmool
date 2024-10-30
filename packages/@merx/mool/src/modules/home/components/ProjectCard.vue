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
    <div class="card-actions">
      <button @click.stop="$emit('open', project)">打开</button>
      <el-divider direction="vertical" class="!m-auto !h-[30px]"></el-divider>
      <button @click.stop="$emit('delete', project)" class="delete-btn">删除</button>
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
