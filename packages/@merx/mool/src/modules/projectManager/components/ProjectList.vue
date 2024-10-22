<template>
  <div class="project-list">
    <h2>我的项目</h2>
    <div class="project-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @open="openProject"
        @delete="deleteProject"
        @click="selectProject"
      />
    </div>
  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue';
import { theme } from '../config';

export default {
  components: {
    ProjectCard,
  },
  data() {
    return {
      projects: [
        { id: 1, name: '项目 A', description: '这是项目 A 的描述' },
        { id: 2, name: '项目 B', description: '这是项目 B 的描述' },
        // 添加更多项目...
      ],
      theme,
    };
  },
  methods: {
    selectProject(project) {
      this.$emit('select-project', project);
    },
    openProject(project) {
      console.log('打开项目:', project);
      // 实现打开项目的逻辑
    },
    deleteProject(project) {
      console.log('删除项目:', project);
      // 实现删除项目的逻辑
    },
  },
};
</script>

<style scoped>
.project-list {
  padding: 1rem;
}

h2 {
  color: v-bind('theme.primary');
  margin-bottom: 1rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
</style>
