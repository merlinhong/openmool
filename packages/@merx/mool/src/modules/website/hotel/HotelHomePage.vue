<template>
  <div class="overflow-auto flex flex-col bg-white min-h-screen">
    <Header class="sticky top-0" @openLoginModal="isLoginModalOpen = true" />
    <main class="flex-grow flex flex-col">
      <Carousel />
      <ProductDescription />
    </main>
    <Footer class="mt-auto" />
    <LoginModal :isOpen="isLoginModalOpen" @close="isLoginModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import Carousel from './components/Carousel.vue';
import ProductDescription from './components/ProductDescription.vue';
import Footer from './components/Footer.vue';
import LoginModal from './components/LoginModal.vue';

const isLoginModalOpen = ref(false);
</script>

<style scoped>
/* 这里可以添加页面级的动画效果 */
</style>