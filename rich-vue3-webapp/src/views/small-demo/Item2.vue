<script setup lang="ts">
import { ref, reactive } from "vue"
</script>

<template>
  <h1 style="text-align: center">Grid 布局</h1>
  <div class="grid-container">
    <div class="item1">1</div>
    <div class="item2">2</div>
    <div class="item3">3</div>
    <div class="item4">4</div>
    <div class="item5">5</div>
    <div class="item6">6</div>
    <div class="item7">7</div>
    <div class="item8">8</div>
  </div>
</template>

<style lang="scss" scoped>
.grid-container {
  /*  display 属性设置为 grid 或 inline-grid 后，它就变成了一个网格容器，这个元素的所有直系子元素将成为网格元素。 */
  display: grid;
  /* 网格轨道定义网格中的列和行，rf单位：一个 fr 单位代表网格容器中可用空间的一等份 */
  grid-template-columns: 2fr 300px 1fr;
  /* 网格间距 */
  grid-gap: 10px;
  background-color: #2196f3;
  padding: 10px;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}

.item1 {
  /* 网格线从第一列开始，第三列结束，行同理 */
  grid-column-start: 1;
  grid-column-end: 3;
}
</style>
