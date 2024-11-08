<template>
  <el-dialog title="当前应用页面列表" v-model="dialogVisible" @close="handleClose">
    <el-table :data="pages" style="width: 100%">
      <el-table-column prop="name" label="页面列表">
        <template #default="scope">
          <el-input v-if="scope.row.isEditing" v-model="scope.row.name" @blur="finishEdit(scope.row)" />
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="selectPage(scope.row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="editPageName(scope.row)">重命名</el-button>
          <el-button link type="danger" size="small" @click="deletePage(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="createNewPage">创建页面</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { uuid } from '@/mool/utils';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const dialogVisible = ref(true);
const pages = ref<{ id: string; name: string; isEditing?: boolean }[]>([]);

const emit = defineEmits(['close', 'selectPage']);

onMounted(async () => {
  await fetchPages();
});

const fetchPages = async () => {
  try {
    const response = await axios.get('/api/pages');
    pages.value = response.data.pages;
  } catch (error) {
    console.error('Error fetching pages:', error);
  }
};

const handleClose = () => {
  emit('close');
};

const selectPage = (row: { id: string; name: string; schema: any }) => {
  emit('selectPage', row);
};

const createNewPage = async () => {
  const newPage = {
    id: uuid(),
    name: '新页面',
  };
  try {
    await axios.post('/api/pages', newPage);
    await fetchPages();
  } catch (error) {
    console.error('Error creating new page:', error);
  }
};

const editPageName = (page: { id: string; name: string; isEditing?: boolean }) => {
  page.isEditing = true;
};

const finishEdit = async (page: { id: string; name: string; isEditing?: boolean }) => {
  page.isEditing = false;
  
  try {
    await axios.put(`/api/pages/${page.id}`, { name: page.name });
    await fetchPages();
  } catch (error) {
    console.error('Error updating page name:', error);
  }
};

const deletePage = async (pageId: string) => {
  try {
    await axios.delete(`/api/pages/${pageId}`);
    await fetchPages();
  } catch (error) {
    console.error('Error deleting page:', error);
  }
};
</script>