<template>
  <div class="overflow-auto flex flex-col bg-white min-h-screen">
    <Header class="sticky top-0" @openLoginModal="openLoginModal" />
    <main class="flex-grow flex flex-col">
      <Hero />
      <Features />
      <Testimonials />
    </main>
    <Footer class="mt-auto" />
    <LoginModal v-model:isOpen="isLoginModalOpen" @close="closeLoginModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Features from './components/Features.vue';
import Testimonials from './components/Testimonials.vue';
import Footer from './components/Footer.vue';
import LoginModal from './components/LoginModal.vue';

const isLoginModalOpen = ref(false);

const openLoginModal = () => {
  console.log('openLoginModal called');
  isLoginModalOpen.value = true;
  console.log('isLoginModalOpen set to:', isLoginModalOpen.value);
};

const closeLoginModal = () => {
  console.log('closeLoginModal called');
  isLoginModalOpen.value = false;
  console.log('isLoginModalOpen set to:', isLoginModalOpen.value);
};

watch(isLoginModalOpen, (newValue) => {
  console.log('isLoginModalOpen changed to:', newValue);
});
</script>

<style scoped>
/* 这里可以添加页面级的样式 */
</style>