<script setup lang="ts">
import { ref, reactive } from "vue"

const rawHtml = `<span style="color: red; font-weight: bold;">This is raw HTML content!</span>`
const picPath = "../../../public/favicon.ico"
const objectOfAttrs = {
  id: "container",
  class: "p-4 border border-gray-300 bg-green-100",
  style: "color: green"
}
const seen = ref(true)
const attributeName = ref("src")
function handleClick() {
  window.alert('由于修饰符.prevent.stop，阻止了冒泡，因此只触发一次。')
}
</script>

<template>
  <div class="w-full max-h-[calc(100vh-64px)] overflow-auto flex flex-col gap-4 p-4 bg-gray-50 pb-16">
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">模板语法</div>

        <!-- 文本插值 & 原始HTML的写法 -->
        <div class="font-semibold text-base mb-1 mt-2">1、文本插值 & 原始 HTML</div>
        <p>最基本的数据绑定形式是文本插值: {{ rawHtml }}</p>
        <p>想插入HTML，需要使用v-html指令（谨慎动态渲染HTML，容易造成XXS漏洞）: <span v-html="rawHtml"></span></p>

        <!-- v-bind -->
        <div class="font-semibold text-base mb-1 mt-4">2、v-bind 指令</div>
        <p>
          v-bind可以简写为: <code class="bg-gray-100 px-1 rounded">:</code>。用于在 HTML 中响应式绑定一个 attribute。
          例如：<code class="bg-gray-100 px-1 rounded">&lt;img :src="imageSrc" /&gt;</code>
        </p>
        <img :src="picPath" alt="Vue Logo" class="w-16 h-16" />
        <div v-bind="objectOfAttrs">使用包含多个 attribute 的 JavaScript 对象，动态绑定多个值</div>

        <!-- 指令 Directives -->
        <div class="font-semibold text-base mb-1 mt-4">3、指令 Directives</div>
        <p>指令是带有 v- 前缀的特殊 attribute。一个指令的任务是在其表达式的值变化时响应式地更新 DOM。</p>
        <p v-if="seen">Now you can see. (这里，v-if 指令会基于表达式 seen 的值的真假来移除/插入该 p 元素。)</p>

        <!-- 动态参数 -->
        <div class="font-semibold text-base mb-1 mt-4">3、动态参数</div>
        <p>在指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内。</p>
        <p class="text-red-500">动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。</p>
        <p class="text-red-500">此外，当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写。</p>
        <img :[attributeName]="picPath" class="w-16 h-16 " alt=""></img>

        <!-- 修饰符 Modifiers -->
        <div class="font-semibold text-base mb-1 mt-4">3、指令 Directives</div>
        <p>修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。如.prevent阻止默认行为。</p>
        <div @click="handleClick">
            <!-- 阻止事件冒泡，只执行一次handleClick -->
            <button class="bg-green-100 border cursor-pointer" @click.prevent.stop="handleClick">click me</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
