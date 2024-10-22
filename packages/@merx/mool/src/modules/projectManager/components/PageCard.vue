<template>
  <div class="page-card">
    <div class="card-content">
      <h3>{{ page.name }}</h3>
      <p>{{ page.description }}</p>
    </div>
    <div class="card-actions">
      <button @click="$emit('edit', page)">编辑</button>
    </div>
  </div>
</template>

<script>
import { theme } from '../config';

export default {
  props: {
    page: {
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
.page-card {
  background-color: white;
  border: 1px solid v-bind('theme.border');
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.page-card:hover {
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
  border-top: 1px solid v-bind('theme.border');
}

button {
  width: 100%;
  background-color: v-bind('theme.buttonBg');
  color: v-bind('theme.text');
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: v-bind('theme.buttonHover');
}
</style>
