<template>
  <div class="project-list">
    <template v-if="isProject">
      <div class="flex justify-between">
        <h2>我的应用</h2>
        <el-button type="primary">新增应用</el-button>
      </div>
      <div class="project-grid">
        <ProjectCard v-for="pro in projects" :key="pro.id" :project="pro" @open="openProject(pro)" @delete="deleteProject"
          @click="selectProject" />
      </div>
    </template>
    <PageList v-else @back="back" :name="currPro" />
  </div>
</template>

<script lang="ts">
import ProjectCard from './ProjectCard.vue';
import { theme } from '../config';
import PageList from "./PageList.vue";
import { getUrlParam } from '@/mool/utils';
import { router } from '@/mool';
export default {
  components: {
    ProjectCard,
    PageList
  },
  data() {
    return {
      projects: [
        { id: 1, name: '应用 A', description: '这是应用 A 的描述' },
        { id: 2, name: '应用 B', description: '这是应用 B 的描述' },
        // 添加更多项目...
      ],
      isProject: true,
      theme,
      currPro: ''
    };
  },
  mounted() {
      if(getUrlParam('name',true)){
        this.isProject = false;
      }
  },
  methods: {
    selectProject(project) {
      this.$emit('select-project', project);
    },
    openProject(project) {
      console.log('打开项目:', project);
      this.isProject = false;
      // const hash = window.location.hash.split('/');
      // window.location.hash = hash.join('/') + `?name=${project.name}`;
      router.replace({
        path:'/apply',query:{name:project.name}
      })
      this.currPro = project.name
      // 实现打开项目的逻辑
    },
    deleteProject(project) {
      console.log('删除项目:', project);
      // 实现删除项目的逻辑
    },
    back(val) {
      // const hash = window.location.hash.split('/');
      // console.log(hash);
      
      // window.location.hash = hash[1].split('?')[0];
      router.replace({
        path:'/apply'
      })
      this.isProject = val
    }
  },
};
</script>

<style scoped>
.project-list {
  padding: 1rem;
  background-color: #fff;
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
