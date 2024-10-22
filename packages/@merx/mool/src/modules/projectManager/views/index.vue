<template>
  <div class="project-manager">
    <header class="top-nav">
      <h1>项目管理器</h1>
      <nav>
        <a href="#" @click="activeTab = 'projects'" :class="{ active: activeTab === 'projects' }">项目列表</a>
        <a href="#" @click="activeTab = 'pages'" :class="{ active: activeTab === 'pages' }">图片列表</a>
        <a href="#" @click="activeTab = 'components'" :class="{ active: activeTab === 'components' }">组件库</a>
      </nav>
    </header>
    <main>
      <ProjectList v-if="activeTab === 'projects'" @select-project="selectProject" />
      <PageList v-else-if="activeTab === 'pages' && selectedProject" :project-id="selectedProject.id" />
      <!-- <ComponentLibrary v-else-if="activeTab === 'components'" /> -->
      <div v-else class="placeholder">请选择一个项目以查看其页面</div>
    </main>
  </div>
</template>

<script>
import ProjectList from '../components/ProjectList.vue';
import PageList from '../components/PageList.vue';
// import ComponentLibrary from '../components/ComponentLibrary.vue';
import { theme } from '../config';

export default {
  components: {
    ProjectList,
    PageList,
    // ComponentLibrary,
  },
  data() {
    return {
      activeTab: 'projects',
      selectedProject: null,
      theme,
    };
  },
  methods: {
    selectProject(project) {
      this.selectedProject = project;
      this.activeTab = 'pages';
    },
  },
};
</script>

<style scoped>
.project-manager {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: v-bind('theme.secondary');
  color: v-bind('theme.text');
}

.top-nav {
  background-color: white;
  color: v-bind('theme.text');
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid v-bind('theme.border');
}

.top-nav h1 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.top-nav nav {
  display: flex;
  justify-content: center;
  width: 90%;
}

.top-nav nav a {
  color: v-bind('theme.text');
  text-decoration: none;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.top-nav nav a.active {
  background-color: v-bind('theme.secondary');
}

main {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 18px;
  color: v-bind('theme.lightText');
}
</style>
