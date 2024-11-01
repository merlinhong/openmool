<template>
  <div class="relative flex h-full">
    <!-- <div id="ball"></div> -->
    <h1
      class="tracking-in-expand text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-400 to-pink-600 p-4 m-auto font-bold"
    >
      <i>MoolEngine</i>
    </h1>
  </div>
</template>

<script setup lang="tsx">
import * as vue from "vue";

let position = 0; // 小球的初始位置
let direction = 1; // 1 表示向右，-1 表示向左
const speed = 8; // 小球的移动速度
const containerWidth = window.innerWidth / 2; // 容器宽度
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
const click = () => {
  const N = 40; // 可以调整这个值来增加计算时间
  console.log(`计算斐波那契数列第 ${N} 项：`);
  console.time("fibonacci");
  const result = fibonacci(N);
  console.timeEnd("fibonacci");
  console.log(`结果是：${result}`);
};
function animate() {
  const ball = document.getElementById("ball");
  // 更新小球的位置
  position += speed * direction;

  // 检查小球是否到达边界
  if (position > containerWidth - 50 || position < 0) {
    direction *= -1; // 反转方向
  }
  // 设置小球的新位置
  ball.style.left = position + "px";
  // 请求下一帧动画
  requestAnimationFrame(animate);
}
function calculateFibonacci(deadline) {
  if (deadline.timeRemaining() > 0 && deadline.didTimeout === false) {
    console.log(deadline.timeRemaining());

    const N = 30;
    const result = fibonacci(N);
    // break; // 只计算一次
  }
  // 继续请求空闲回调
  requestIdleCallback(calculateFibonacci);
}
vue.onMounted(() => {
  // 启动空闲回调
});
// 启动动画
</script>

<style scoped>
.tracking-in-expand {
  /* animation: tracking-in-expand .7s cubic-bezier(.215, .61, .355, 1.000) both */
  -webkit-animation: focus-in-expand 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: focus-in-expand 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@-webkit-keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes focus-in-expand {
  0% {
    letter-spacing: -0.5em;
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }

  40% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}
</style>
