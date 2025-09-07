<script setup lang="ts">
import { ref, reactive, nextTick, computed } from "vue"

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
  window.alert("由于修饰符.prevent.stop，阻止了冒泡，因此只触发一次。")
}

const count = ref(0)
async function increment() {
  count.value++
  await nextTick()
  console.log(`DOM updated! New count is: ${count.value}`)
}
const obj = ref({
  nested: { count: 0 },
  arr: ["foo", "bar"]
})
function mutateDeeply() {
  obj.value.nested.count++
  obj.value.arr.push("baz")
}
const state = reactive({ count: 0 })
const raw = {}
const proxy = reactive(raw)

const author = reactive({
  name: "John Doe",
  books: ["Vue 2 - Advanced Guide", "Vue 3 - Basic Guide", "Vue 4 - The Mystery"]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? "Yes" : "No"
})

const firstName = ref("前端")
const lastName = ref("杂货铺")
const fullName = computed({
  get() {
    return firstName.value + " " + lastName.value
  },
  set(newValue) {
    ;[firstName.value, lastName.value] = newValue.split(" ")
  }
})

function changeName() {
  fullName.value = "Front-end grocery-store"
}

const countNum = ref(0)
const previousNum = ref(0)
const alwaysSmall = computed((previous) => {
  previousNum.value = previous === undefined ? "undefined" : previous
  return countNum.value
})
</script>

<template>
  <div class="w-full max-h-[calc(100vh-64px)] overflow-auto flex flex-col gap-4 p-4 bg-gray-50 pb-16">
    <!-- 模板语法 -->
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
        <p class="text-red-500">
          动态参数表达式因为某些字符的缘故有一些语法限制，比如空格和引号，在 HTML attribute 名称中都是不合法的。
        </p>
        <p class="text-red-500">
          此外，当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板)
          时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写。
        </p>
        <img :[attributeName]="picPath" class="w-16 h-16" alt="" />

        <!-- 修饰符 Modifiers -->
        <div class="font-semibold text-base mb-1 mt-4">3、指令 Directives</div>
        <p>修饰符是以点开头的特殊后缀，表明指令需要以一些特殊的方式被绑定。如.prevent阻止默认行为。</p>
        <div @click="handleClick">
          <!-- 阻止事件冒泡，只执行一次handleClick -->
          <button class="bg-green-100 border cursor-pointer" @click.prevent.stop="handleClick">click me</button>
        </div>
      </div>
    </section>

    <!-- 响应式基础 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">响应式基础</div>

        <!-- 声明响应式状态 -->
        <div class="font-semibold text-base mb-1 mt-4">1、声明响应式状态</div>
        <p>
          在组合式API中，推荐使用 ref() 函数来声明响应式状态; ref() 接收参数，并将其包裹在一个带有 .value 属性的 ref
          对象中返回
        </p>
        <p>count: {{ count }} （在模板中使用 ref 时，不需要附加 .value，因为会自动解包）</p>
        <button class="bg-blue-100 border cursor-pointer" @click="increment">count++</button>

        <!-- 深层响应式 -->
        <div class="font-semibold text-base mb-1 mt-4">2、深层响应式</div>
        <p>Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 Map。</p>
        <p>obj: {{ obj }}</p>
        <button class="border bg-orange-100 cursor-pointer" @click="mutateDeeply">mutateDeeply</button>

        <!-- DOM更新时机 -->
        <div class="font-semibold text-base mb-1 mt-4">3、DOM更新时机</div>
        <p>
          当你修改了响应式状态时，DOM 会被自动更新。但是需要注意的是，DOM 更新不是同步的。Vue 会在“next
          tick”更新周期中缓冲所有状态的修改，以确保不管你进行了多少次状态修改，每个组件都只会被更新一次。
        </p>

        <!-- reactive -->
        <div class="font-semibold text-base mb-1 mt-4">4、reactive</div>
        <p>
          还有另一种声明响应式状态的方式，即使用 reactive() API。与将内部值包装在特殊对象中的 ref 不同，reactive()
          将使对象本身具有响应性。
        </p>
        <button class="border bg-red-100 cursor-pointer" @click="state.count++">点我+1：{{ state.count }}</button>

        <!-- Reactive Proxy vs Original -->
        <div class="font-semibold text-base mb-1 mt-4">4、Reactive Proxy vs Original</div>
        <p>reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的。</p>
        <p>
          只有代理对象是响应式的，更改原始对象不会触发更新。因此，使用 Vue
          的响应式系统的最佳实践是仅使用你声明对象的代理版本。
        </p>
        <p>proxy === raw: {{ proxy === raw }}（代理对象和原始对象不是全等的）</p>
        <p>proxy === raw: {{ reactive(raw) === proxy }}（在同一个对象上调用 reactive() 会返回相同的代理）</p>
        <p>proxy === raw: {{ reactive(proxy) === proxy }}（在一个代理上调用 reactive() 会返回它自己）</p>

        <!-- reactive() 的局限性 -->
        <div class="font-semibold text-base mb-1 mt-4">4、reactive() 的局限性</div>
        <p>reactive() API 有一些局限性。</p>
        <li>有限的值类型：只能用于对象类型（对象、数组、Map、Set）</li>
        <li>
          不能替换整个对象：由于 Vue
          的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失。
        </li>
        <li>
          对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接.
        </li>
        <p class="text-red-500 font-bold">由于这些限制，我们建议使用 ref() 作为声明响应式状态的主要 API。</p>
      </div>
    </section>

    <!-- 计算属性 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">计算属性</div>
        <p>使用计算属性来描述依赖响应式状态的复杂逻辑。</p>
        <p>
          Vue 的计算属性会自动追踪响应式依赖。它会检测到 publishedBooksMessage 依赖于 author.books，所以当 author.books
          改变时，任何依赖于 publishedBooksMessage 的绑定都会同时更新。
        </p>
        <p>
          Has published books: <span>{{ publishedBooksMessage }}</span>
        </p>
      </div>
    </section>

    <!-- 计算属性缓存 VS 方法 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">计算属性缓存 VS 方法</div>
        <p>
          若我们将同样的函数定义为一个方法而不是计算属性，两种方式在结果上确实是完全相同的，然而，<span
            class="text-red-500 font-bold"
            >不同之处在于计算属性值会基于其响应式依赖被缓存。</span
          >
        </p>
        <p>
          一个计算属性仅会在其响应式依赖更新时才重新计算。这意味着只要 author.books 不改变，无论多少次访问
          publishedBooksMessage 都会立即返回先前的计算结果，而不用重复执行 getter 函数。
        </p>
        <p>相比之下，方法调用总是会在重渲染发生时再次执行函数。（造成不必要的资源浪费）</p>
      </div>
    </section>

    <!-- 可写的计算属性 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">可写的计算属性</div>
        <p>计算属性默认是只读的。当我们需要用到可写属性时，可以使用提供的 getter 和 setter 来创建。</p>
        <p>fullName: {{ fullName }}</p>
        <button class="bg-purple-100 border cursor-pointer" @click="changeName">changeName</button>
      </div>
    </section>

    <!-- 获取上一个值 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">获取上一个值</div>
        <p>countNum：{{ alwaysSmall }} | previousNum: {{ previousNum }}</p>
        <button class="bg-red-100 border cursor-pointer" @click="countNum++">countNum++</button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
