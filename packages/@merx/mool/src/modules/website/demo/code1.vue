<template>
  <div :style="{ backgroundColor: '#fff', overflow: 'auto' }">
    <div :style="{ backgroundColor: '#fff' }" class="">
      <div :style="{}">
        <div
          :style="{
            background: '#333 !important',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }"
          class="bg-white"
        >
          <span :style="{ width: 'fit-content', color: '#fff', fontSize: '18px' }">摄影官网</span>
          <el-menu
            :style="{ width: 'fit-content', border: 'none', height: 'fit-content' }"
            textColor="#fff"
            backgroundColor="#333"
            :ellipsis="false"
            mode="horizontal"
            class=""
          >
            <template v-for="item in state.menuOption" :key="item.id">
              <el-sub-menu :index="item.index" v-if="item.subItems">
                <template #title>{{ item.title }}</template>
                <el-menu-item v-for="subItem in item.subItems" :key="subItem.id" :index="subItem.index">
                  {{ subItem.title }}
                </el-menu-item>
              </el-sub-menu>
            </template>

            <template v-for="item in state.menuOption" :key="item.id">
              <el-menu-item :index="item.index" v-if="!item.subItems">
                {{ item.title }}
              </el-menu-item>
            </template>
          </el-menu>
          <el-button
            :style="{ display: 'flex', flexDirection: 'row', width: 'fit-content', justifyContent: 'space-between' }"
            type="primary"
            :plain="true"
            >登录</el-button
          >
        </div>
        <div
          :style="{
            background: '#fff',
            height: '600px',
            backgroundImage: 'url(https://picsum.photos/id/27/3264/1836)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }"
        >
          <div
            :style="{
              padding: '5px !important',
              backgroundColor: 'transparent',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: '2',
            }"
            class=""
          >
            <span :style="{ width: 'fit-content', color: '#FFFFFF', fontSize: '40px', fontWeight: 'bold' }" class=""
              >捕捉美好瞬间</span
            >
            <span :style="{ width: 'fit-content', color: '#FFFFFF', fontSize: '18px' }" class=""
              >专业摄影和妆造服务，为您创造永恒记忆</span
            >
            <el-button
              :style="{ display: 'flex', flexDirection: 'row', width: 'fit-content', marginTop: '10px' }"
              class=""
              type="primary"
              :text="false"
              color=""
              >预约拍摄</el-button
            >
          </div>
        </div>
        <div
          :style="{
            background: '#fff',
            height: '500px',
            display: 'flex',
            padding: '15px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: '20px',
          }"
        >
          <span :style="{ width: 'fit-content', color: '#000', fontSize: '16px' }">我们的房间</span>
          <div
            :style="{
              padding: '5px',
              backgroundColor: '#fff',
              display: 'flex',
              width: '100%',
              height: 'auto',
              justifyContent: 'space-around',
              alignItems: 'center',
            }"
            class="max-md:flex-col max-md:overflow-auto"
          >
            <el-card :style="{ maxWidth: '300px', height: '300px', width: '300px' }" shadow="hover" class=""
              >卡片
              <el-image
                :style="{ width: '100%', height: '100%' }"
                class=""
                fit="scale-down"
                src="https://picsum.photos/id/2/5000/3333"
              ></el-image>
              <div
                :style="{ padding: '5px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }"
                class=""
              >
                <span :style="{ width: 'fit-content', color: '#000', fontSize: '20px', fontWeight: 'bold' }" class=""
                  >婚纱摄影</span
                >
                <span :style="{ width: 'fit-content', color: '#000', fontSize: '16px' }" class=""
                  >记录最重要的时刻</span
                >
              </div>
            </el-card>
            <el-card :style="{ maxWidth: '300px', height: '300px', width: '300px' }" shadow="hover" class=""
              >卡片
              <el-image
                :style="{ width: '100%', height: '100%' }"
                class=""
                fit="scale-down"
                src="https://picsum.photos/id/0/5000/3333"
              ></el-image>
              <div
                :style="{ padding: '5px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }"
                class=""
              >
                <span :style="{ width: 'fit-content', color: '#000', fontSize: '20px', fontWeight: 'bold' }" class=""
                  >婚纱摄影</span
                >
                <span :style="{ width: 'fit-content', color: '#000', fontSize: '16px' }" class=""
                  >记录最重要的时刻</span
                >
              </div>
            </el-card>
            <el-card :style="{ maxWidth: '300px', height: '300px', width: '300px' }" shadow="hover" class=""
              >卡片
              <el-image
                :style="{ width: '100%', height: '100%' }"
                class=""
                fit="scale-down"
                src="https://picsum.photos/id/3/5000/3333"
              ></el-image>
              <div
                :style="{ padding: '5px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }"
                class=""
              >
                <span :style="{ width: 'fit-content', color: '#000', fontSize: '20px', fontWeight: 'bold' }" class=""
                  >婚纱摄影</span
                >
                <span :style="{ width: 'fit-content', color: '#000', fontSize: '16px' }" class=""
                  >记录最重要的时刻</span
                >
              </div>
            </el-card>
          </div>
        </div>
        <div
          :style="{
            height: '500px',
            display: 'flex',
            padding: '15px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: '20px',
            backgroundColor: '#F1F0F0',
          }"
          class=""
        >
          <span :style="{ width: 'fit-content', color: '#000', fontSize: '16px' }">精选作品</span>
          <div
            :style="{
              backgroundColor: '#ECECEC',
              flexDirection: 'row',
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
              flexWrap: 'wrap',
            }"
            class=""
          >
            <el-image
              :style="{ width: '33%', height: '33%' }"
              class=""
              fit="cover"
              src="https://picsum.photos/id/0/5000/3333"
            ></el-image>
            <el-image
              :style="{ width: '33%', height: '33%' }"
              class=""
              fit="cover"
              src="https://picsum.photos/id/2/5000/3333"
            ></el-image>
            <el-image
              :style="{ width: '33%', height: '33%' }"
              class=""
              fit="cover"
              src="https://picsum.photos/id/3/5000/3333"
            ></el-image>
            <el-image
              :style="{ width: '33%', height: '33%' }"
              class=""
              fit="cover"
              src="https://picsum.photos/id/2/5000/3333"
            ></el-image>
            <el-image
              :style="{ width: '33%', height: '33%' }"
              class=""
              fit="cover"
              src="https://picsum.photos/id/0/5000/3333"
            ></el-image>
            <el-image
              :style="{ width: '33%', height: '33%' }"
              class=""
              fit="cover"
              src="https://picsum.photos/id/3/5000/3333"
            ></el-image>
          </div>
        </div>
        <div :style="{ padding: '5px', backgroundColor: '#fff', marginBottom: '20px'}" >
          <span
            :style="{ width: 'fit-content', color: '#000', fontSize: '24px', marginLeft: 'auto', marginRight: 'auto',display:'block' }"
            class=""
            >关于我们</span
          >
          <div
            :style="{
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginTop: '20px',
            }"
            class="max-md:flex-col"
          >
            <el-image
              :style="{
                width: '100%',
                margin: '0px 10px',
                backgroundColor: '#F9F9F9',
                borderRadius: '5px',
              }"
              class="rounded-lg"
              fit="fill"
              src="https://picsum.photos/id/2/5000/3333"
            ></el-image>
            <span
              :style="{
                width: '100%',
                color: '#000',
                fontSize: '17px',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '100%',
                lineHeight: '30px',
                letterSpacing: '2px',
              }"
              class=""
              >我们是一家专业的摄影妆造工作室，拥有多年的行业经验和一支充满激情的团队。
              我们致力于为每位客户提供高质量的摄影和妆造服务，捕捉生活中最美好的瞬间。
              无论是婚礼、个人写真还是商业摄影，我们都将用心为您创造独特而难忘的作品。</span
            >
          </div>
        </div>
        <div
          :style="{
            background: '#fff',
            display: 'flex',
            padding: '15px',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#000000',
          }"
        >
          <span :style="{ width: 'fit-content', color: '#FFFFFF', fontSize: '16px' }"
            >© 2023 酒店名称. 保留所有权利.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import * as vue from "vue";
import { defineProps, defineEmits } from "vue";
import { ElButton } from "element-plus";

const props = defineProps({});

const emit = defineEmits([]);

const state = vue.reactive<{ [key: string]: any }>({
  menuOption: [
    {
      title: "首页",
      index: "1",
    },
    {
      title: "房间",
      index: "2",
    },
    {
      title: "服务",
      index: "3",
    },
    {
      title: "联系我们",
      index: "4",
    },
  ],
});
</script>

<style scoped></style>
