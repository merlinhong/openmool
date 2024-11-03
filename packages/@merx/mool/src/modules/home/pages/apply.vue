<template>
    <section class="w-full h-[250px] bg-blue-50 flex justify-evenly">
      <h2 class="flex justify-center items-center text-4xl ">

        <!-- {{ list[type] }} -->

      </h2>
      <svg>
        <use xlink:href="#icon-banner" />
      </svg>
    </section>
    <ProjectList />
</template>
    
<script setup lang='tsx'>
import ProjectList from "../components/ProjectList.vue";

</script>
    
<style></style>