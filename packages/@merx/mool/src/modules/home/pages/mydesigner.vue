<template>
    <section class="w-full h-[250px] bg-blue-50 flex justify-evenly">
        <h2 class="flex justify-center items-center text-4xl ">
            <!-- {{ list[type] }} -->
        </h2>
        <svg>
            <use xlink:href="#icon-banner" />
        </svg>
    </section>
    <div class="py-6 w-[60%] mx-auto">
        <el-button color="#000" round class="!px-6 mb-6">创建设计器</el-button>
        <ul class="flex">
            <li class="w-[25%] h-[260px]">
                <div class="project-card h-full flex flex-col justify-between">
                    <svg>
                        <use xlink:href="#icon-design" />
                    </svg>
                    <div class="p-3">
                        <h3 class="font-bold">设计器模板专用</h3>
                    </div>
                    <div class="card-actions justify-between item-center">
                        <div class="flex-1 cursor-pointer text-center">
                            <el-tooltip content="修改" effect="light">
                                <svg @click.stop="$emit('edit', page)" xmlns="http://www.w3.org/2000/svg" width="17"
                                    height="17" viewBox="0 0 24 24">
                                    <path fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="1.5"
                                        d="m14.363 5.652l1.48-1.48a2 2 0 0 1 2.829 0l1.414 1.414a2 2 0 0 1 0 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 0 0-.578 1.238l-.242 2.74a1 1 0 0 0 1.084 1.085l2.74-.242a2 2 0 0 0 1.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242" />
                                </svg>
                            </el-tooltip>
                            <el-tooltip content="删除" effect="light">
                                <svg @click.stop="$emit('delete', page.id)" class="delete-btn"
                                    xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24">
                                    <path fill="#333333"
                                        d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z" />
                                </svg>
                            </el-tooltip>
                        </div>
                        <el-button class="flex-1 hover:!bg-gray-100 !px-0" text size="small"
                            @click="$router.push('/editor')">进入设计器</el-button>
                    </div>
                </div>
            </li>

        </ul>
    </div>
</template>
    
<script setup lang='tsx'>
import { theme } from "../config";
</script>
    
<style scoped>
main {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
}

.project-card {
    background-color: white;
    border: 1px solid v-bind("theme.border");
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.project-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 18px;
    color: v-bind("theme.lightText");
}

.card-actions {
    display: flex;
    background-color: #fff;
    padding: 20px 10px;
}
</style>