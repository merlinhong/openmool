<template>
  <div class="page-list">
    <h2>项目页面</h2>
    <div class="page-grid">
      <PageCard
        v-for="page in pages"
        :key="page.id"
        :page="page"
        @edit="editPage"
      />
    </div>
  </div>
</template>

<script>
import PageCard from './PageCard.vue';
import { theme } from '../config';

export default {
  components: {
    PageCard,
  },
  props: {
    projectId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      pages: [
        { id: 1, name: '首页', description: '网站首页' },
        { id: 2, name: '关于我们', description: '公司介绍页面' },
        // 添加更多页面...
      ],
      theme,
    };
  },
  methods: {
    editPage(page) {
      console.log('编辑页面:', page);
      // 实现编辑页面的逻辑
    },
  },
};
</script>

<style scoped>
.page-list {
  padding: 1rem;
}

h2 {
  color: v-bind('theme.accent');
  margin-bottom: 1rem;
}

.page-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
