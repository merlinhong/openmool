<template>
  <div class="page-card">

    <div class="card-content flex flex-col items-center !pr-4 !py-1 ">
      <svg class=" w-[80%] h-full">
        <use xlink:href="#icon-page" />
      </svg>
      <div class="text-sm mb-4">
        <h3 class="text-[16px] font-bold ">{{ page.name }}</h3>
        <p>{{ page.description }}</p>
      </div>

    </div>
    <el-divider class="!m-auto " border-style="dashed"></el-divider>

    <div class="card-actions justify-between item-center">
      <div class="flex-1 cursor-pointer text-center">
        <el-tooltip content="修改" effect="light">
          <svg @click.stop="$emit('edit', page)" xmlns="http://www.w3.org/2000/svg" width="17" height="17"
            viewBox="0 0 24 24">
            <path fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="m14.363 5.652l1.48-1.48a2 2 0 0 1 2.829 0l1.414 1.414a2 2 0 0 1 0 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 0 0-.578 1.238l-.242 2.74a1 1 0 0 0 1.084 1.085l2.74-.242a2 2 0 0 0 1.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242" />
          </svg>
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
        @click.stop="$emit('design', page)">设计页面</el-button>
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
  padding: 1.6rem 0rem;
  width: 100%;
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
