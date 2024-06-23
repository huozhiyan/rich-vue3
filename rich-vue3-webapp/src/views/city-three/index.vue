<script setup lang="ts">
import { onMounted } from "vue"
import { initCity } from "@/views/city-three/enter"

onMounted(() => {
  // 初始化三维场景
  initCity()
})
</script>

<template>
  <div class="container">
    <canvas id="webgl">当前浏览器不支持 WebGL</canvas>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 15px;
  text-align: center;
}
</style>
