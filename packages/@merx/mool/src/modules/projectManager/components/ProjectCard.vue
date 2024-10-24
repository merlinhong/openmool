<template>
  <div class="project-card" @click="$emit('click', project)">
    <div class="card-content">
      <h3>{{ project.name }}</h3>
      <p>{{ project.description }}</p>
    </div>
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
  border-top: 1px solid v-bind('theme.border');
  background-color: #faf9f9;
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

.delete-btn {
}
</style>
