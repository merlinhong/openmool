<template>
  <div class="page-list">
    <div class="text-lg cursor-pointer mb-4" @click="back"><i-ep-arrowLeft class="align-sub"></i-ep-arrowLeft>返回</div>
    <div class="flex justify-between">
      <h2>页面列表</h2>
      <el-button type="primary" @click="createNewPage">新增页面</el-button>
    </div>
    <div class="page-grid">
      <PageCard v-for="page in pages" :key="page.id" :page="page" @design="toDesign" @delete="deletePage" @edit="edit(page)"/>
    </div>
  </div>
  <el-dialog v-model="addRef" width="20%" :title="!currPage?'新增':'修改'">
    <el-form>
      <el-form-item label="页面名称" required>
        <el-input v-model="pageInput"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addRef = false">取消</el-button>
        <el-button type="primary" @click="addSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="tsx">
import * as vue from 'vue';
import PageCard from './PageCard.vue';
import { theme } from '../config';
import axios from 'axios';
import { uuid } from '@/mool/utils';
import { useMool } from '@/mool';
const {router,route} = useMool();
const currPage= vue.ref<{ id: string; name: string; }|null>(null);
const addRef = vue.ref(false);
const pageInput = vue.ref('');
const props = defineProps({
  name: String
})
const pages = vue.ref<{ id: string; name: string; isEditing?: boolean }[]>([]);

const emit = defineEmits(['back', 'edit', 'delete','design']);

vue.onMounted(async () => {
  console.log(props.name);
  
  await fetchPages();
});

const deletePage = async (pageId: string) => {
  ElMessageBox.confirm("确定删除该页面吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    try {
      await axios.delete(`/api/pages/${pageId}`);
      await fetchPages();
      ElMessage.success("删除成功");
    } catch (error) {
      console.error('Error deleting page:', error);
      ElMessage.error("删除失败");

    }
  })

};
const fetchPages = async () => {
  try {
    const response = await axios.get('/api/pages');
    pages.value = response.data.pages;
  } catch (error) {
    console.error('Error fetching pages:', error);
  }
};
const createNewPage = async () => {
  currPage.value = null;
  addRef.value = true;
};
const finishEdit = async (page: { id: string; name: string;}) => {
  
  try {
    await axios.put(`/api/pages/${page.id}`, { name: page.name });
    await fetchPages();
    ElMessage.success("修改成功");
  } catch (error) {
    console.error('Error updating page name:', error);
    ElMessage.error("修改失败");

  }
};
const addSubmit = async() => {
  if(!pageInput.value){
    return ElMessage.warning("请输入页面名称")
  }
  if(currPage.value){
    addRef.value =false;
    return await finishEdit({...currPage.value,name:pageInput.value});
  }
  const newPage = {
    id: uuid(),
    name: pageInput.value,
  };
  try {
    await axios.post('/api/pages', newPage);
    await fetchPages();
    addRef.value =false;
  } catch (error) {
    console.error('Error creating new page:', error);
  }
}
const edit = (page:{id:string;name:string})=>{
  currPage.value = page
  pageInput.value = page.name;
  addRef.value = true;
}
const toDesign = (page) => {
  console.log('编辑页面:', props.name);
  // 实现编辑页面的逻辑
  router.push({
    path: '/designer',
    query: {
      id: page.id,
      projectName: route.query.name,
      pageName: page.name
    }
  })
}
const back = () => {
  emit('back', true)
}
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
