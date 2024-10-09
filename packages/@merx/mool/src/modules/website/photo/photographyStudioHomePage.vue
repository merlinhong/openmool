<template>
  <div class="photography-studio-home overflow-auto">
    <!-- 头部导航 -->
    <el-header class="bg-gray-800 text-white h-fit">
      <div class="container mx-auto flex justify-between items-center h-full px-4">
        <div class="text-2xl font-bold">摄影妆造工作室</div>
        <el-menu mode="horizontal" background-color="#1F2937" text-color="#FFFFFF" active-text-color="#60A5FA"
          :ellipsis="false" class="!border-b-0">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">服务</el-menu-item>
          <el-menu-item index="3">作品集</el-menu-item>
          <el-menu-item index="4">关于我们</el-menu-item>
          <el-menu-item index="5">联系我们</el-menu-item>
        </el-menu>
      </div>
    </el-header>


    <!-- 英雄区域 -->
    <section class="hero bg-cover bg-center h-screen flex items-center"
      style="background-image: url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80');">
      <div class="container mx-auto text-center text-white">
        <transition appear name="fade-in">
          <h1 class="text-5xl font-bold mb-4">捕捉美好瞬间</h1>
        </transition>
        <transition appear name="fade-in" :duration="1000">
          <p class="text-xl mb-8">专业摄影和妆造服务，为您创造永恒回忆</p>
        </transition>
        <transition appear name="bounce">
          <el-button type="primary" size="large">预约拍摄</el-button>
        </transition>
      </div>
    </section>

    <!-- 服务介绍 -->
    <section class="services py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">我们的服务</h2>
        <el-row :gutter="20">
          <el-col :span="8" v-for="(service, index) in services" :key="service.title">
            <fade-in-section>
              <el-card class="mb-4 hover:shadow-lg transition-shadow duration-300">
                <img :src="service.image" class="w-full h-48 object-cover mb-4">
                <h3 class="text-xl font-semibold mb-2">{{ service.title }}</h3>
                <p>{{ service.description }}</p>
              </el-card>
            </fade-in-section>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 作品展示 -->
    <section class="portfolio py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">精选作品</h2>
        <el-row :gutter="20">
          <el-col :span="8" v-for="(image, index) in portfolioImages" :key="index">
            <fade-in-section>
              <div class="image-container" @click="floatImage">
                <el-image :src="image" fit="cover"
                  class="w-full h-64 object-cover mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                  @click="openGallery(index)"></el-image>
              </div>
            </fade-in-section>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 关于我们 -->
    <section class="about py-16 bg-gray-100">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">关于我们</h2>
        <el-row :gutter="20">
          <el-col :span="12">
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="关于我们" class="w-full h-auto rounded-lg shadow-lg">
          </el-col>
          <el-col :span="12">
            <p class="text-lg mb-4">我们是一家专业的摄影妆造工作室，拥有多年的行业经验和一支充满激情的团队。</p>
            <p class="text-lg mb-4">我们致力于为每位客户提供高质量的摄影和妆造服务，捕捉生活中最美好的瞬间。</p>
            <p class="text-lg">无论是婚礼、个人写真还是商业摄影，我们都将用心为您创造独特而难忘的作品。</p>
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 联系我们 -->
    <section class="contact py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">联系我们</h2>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form :model="contactForm" label-width="120px">
              <el-form-item label="姓名">
                <el-input v-model="contactForm.name"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱">
                <el-input v-model="contactForm.email"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="contactForm.phone"></el-input>
              </el-form-item>
              <el-form-item label="留言">
                <el-input type="textarea" v-model="contactForm.message"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">发送消息</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12">
            <div class="contact-info">
              <p><i class="el-icon-location"></i> 地址：某某市某某区某某街123号</p>
              <p><i class="el-icon-phone"></i> 电话：123-456-7890</p>
              <p><i class="el-icon-message"></i> 邮箱：info@photostudio.com</p>
            </div>
            <!-- 这里可以添加一个地图组件 -->
          </el-col>
        </el-row>
      </div>
    </section>

    <!-- 页脚 -->
    <el-footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; 2023 摄影妆造工作室. 保留所有权利.</p>
      </div>
    </el-footer>
  </div>
</template>

<script setup lang="tsx">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'

const services = [
  { title: '婚纱摄影', description: '记录您人生中最重要的时刻', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
  { title: '个人写真', description: '展现您最美的一面', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
  { title: '商业摄影', description: '为您的品牌打造专业形象', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
]

const portfolioImages = [
  'https://images.unsplash.com/photo-1533745848184-3db07256e163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
  'https://images.unsplash.com/photo-1610901157620-340856d0a50f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1551854838-212c50b4c184?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1605217613423-0a61bd725c8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
]

const contactForm = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const FadeInSection = {
  name: 'FadeInSection',
  props: {
    threshold: {
      type: Number,
      default: 0.5
    }
  },
  setup(props, { slots }) {
    const sectionRef = ref(null)
    const isVisible = ref(false)

    onMounted(() => {
      const observer = new IntersectionObserver(([entry]) => {
        isVisible.value = entry.isIntersecting
      }, {
        threshold: props.threshold
      })

      if (sectionRef.value) {
        observer.observe(sectionRef.value)
      }

      onUnmounted(() => {
        if (sectionRef.value) {
          observer.unobserve(sectionRef.value)
        }
      })
    })

    return () => (
      <div ref={sectionRef} class={`fade-in-section ${isVisible.value ? 'is-visible' : ''}`}>
        {slots.default?.()}
      </div>
    )
  }
}

const floatImage = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  target.classList.add('float-up')
  setTimeout(() => {
    target.classList.remove('float-up')
  }, 300)
}

const openGallery = (index: number) => {
  // 实现图片画廊功能
  console.log('打开图片画廊，从索引', index, '开始')
}

const submitForm = () => {
  // 实现表单提交逻辑
  console.log('提交表单', contactForm)
  ElMessage.success('消息已发送，我们会尽快与您联系！')
}
</script>

<style scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.5s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-up-enter-from,
.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-zoom-enter-active,
.fade-zoom-leave-active {
  transition: all 0.5s ease;
}

.fade-zoom-enter-from,
.fade-zoom-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.image-container {
  transition: transform 0.3s ease-out;
}

.image-container.float-up {
  transform: translateY(-10px);
}
</style>