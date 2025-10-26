<script setup lang="ts">
import { ref, reactive, nextTick, computed, watch, watchEffect } from "vue"

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

const classObject = {
  "text-green-500": true,
  "text-sm": true
}

const classObject2 = computed(() => ({
  "text-orange-500": true,
  "text-sm": true
}))

const activeColor = ref("red")
const fontSize = ref(25)

const styleObject = reactive({
  color: "red",
  fontSize: "20px"
})

const awesome = ref(true)

function onSubmit() {
  window.alert("提交")
}

function doThat() {
  window.alert("只有点击最外层的div，才会触发事件")
}

function outer() {
  window.alert("outer")
}

function inner() {
  window.alert("inner")
}

let text = ref("")
let text2 = ref("")
let message = ref("")
let message2 = ref("")
let checked = ref(false)
let picked = ref("")
let checkNames = ref([])
let selected = ref([])
const selected2 = ref("A")
const options = ref([
  { text: "One", value: "A" },
  { text: "Two", value: "B" },
  { text: "Three", value: "C" }
])
const msg = ref("")
const age = ref("")
const msg2 = ref("")

const question = ref("")
const answer = ref("Questions usually contain a question mark. ;-)")
const loading = ref(false)

watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes("?")) {
    loading.value = true
    answer.value = "Thinking..."
    try {
      const res = await fetch("https://yesno.wtf/api")
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = "Error! Could not reach the API. " + error
    } finally {
      loading.value = false
    }
  }
})

const x = ref(0)
const y = ref(0)

// 单个ref
watch(x, (newX, oldX) => {
  console.log(`newX is ${newX}, oldX is ${oldX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is : ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})

const obj2 = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
// watch(obj.count, (count) => {
//   console.log(`Count is: ${count}`)
// })

// 需要用一个返回该属性的 gettr 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`Count is: ${count}`)
  }
)

const person = reactive({ name: "zhangsan", age: 18 })
watch(person, (newValue, oldValue) => {
  console.log("--newValue 和 oldValue 是相等的，因为它们是同一个对象！--")
  console.log("newValue", newValue)
  console.log("oldValue", oldValue)
})

const changePerson = () => {
  person.name = "lisi"
  person.age = 20
}

const changePersonName = () => {
  person.name = "wangwu"
}

const changePersonAge = () => {
  person.age++
}

// 仅当 person.name 被替换时触发
watch(
  () => person.name,
  (newName, oldName) => {
    console.log(`new name is ${newName}, old name is ${oldName}`)
  }
)

const obj3 = reactive({ obj: { info1: "day day up", info2: "go go go" } })

// 显式加上deep选项，强制转成深层侦听器，不然仅info1或info2发生改变时，监听不到
watch(
  () => obj3.obj,
  (newValue, oldValue) => {
    console.log("obj3", newValue, oldValue)
  },
  { deep: true }
)

// 此时，deep: true 才能监听到
obj3.obj.info1 = "nihao"

// obj被整个替换了，此时 newValue 和 oldValue 是不想等的，且不手动添加 deep: true 一样能监听到
// obj3.obj = { info: "你好" }

const source = ref("")
// 立即执行
watch(
  source,
  (newValue, oldValue) => {
    console.log("immediate 立即执行，当 source 改变时再次执行。")
  },
  { immediate: true }
)

// 一次性侦听器
const source2 = ref(0)
watch(
  source2,
  (newValue, oldValue) => {
    console.log(`当source2变化时，仅执行一次。newValue - ${newValue}，oldValue - ${oldValue}`)
  },
  { once: true }
)

const changeSource2 = () => {
  source2.value += 1
}

const draftContent = ref("")
const lastSavedTime = ref(null)

// 自动保存草稿
watchEffect((onCleanup) => {
  if (draftContent.value) {
    console.log("内容变化，准备自动保存...")

    // 防抖：只在用户停止输入500ms后保存
    const timer = setTimeout(() => {
      // 模拟保存到localStorage或API
      localStorage.setItem("draft", draftContent.value)
      lastSavedTime.value = new Date().toLocaleTimeString()
      console.log("草稿已保存:", draftContent.value)
    }, 500)

    // 副作用清理函数：在下次effect执行前或组件卸载时清除定时器
    onCleanup(() => {
      clearTimeout(timer)
    })
  }
})

// 会自动停止
watchEffect(() => {})

// 不会自动停止
setTimeout(() => {
  watchEffect(() => {})
}, 100)

// 当侦听器不再需要时，手动停止它
const unwatch = watchEffect(() => {})
unwatch()
</script>

<template>
  <div id="test" class="w-full max-h-[calc(100vh-64px)] overflow-auto flex flex-col gap-4 p-4 bg-gray-50 pb-16">
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
        <div class="font-semibold text-base mb-1 mt-4">4、动态参数</div>
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
        <div class="font-semibold text-base mb-1 mt-4">5、指令 Directives</div>
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
        <div class="font-semibold text-base mb-1 mt-4">5、Reactive Proxy vs Original</div>
        <p>reactive() 返回的是一个原始对象的 Proxy，它和原始对象是不相等的。</p>
        <p>
          只有代理对象是响应式的，更改原始对象不会触发更新。因此，使用 Vue
          的响应式系统的最佳实践是仅使用你声明对象的代理版本。
        </p>
        <p>proxy === raw: {{ proxy === raw }}（代理对象和原始对象不是全等的）</p>
        <p>proxy === raw: {{ reactive(raw) === proxy }}（在同一个对象上调用 reactive() 会返回相同的代理）</p>
        <p>proxy === raw: {{ reactive(proxy) === proxy }}（在一个代理上调用 reactive() 会返回它自己）</p>

        <!-- reactive() 的局限性 -->
        <div class="font-semibold text-base mb-1 mt-4">6、reactive() 的局限性</div>
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
        <div class="font-semibold text-xl mb-1">1、计算属性</div>
        <p>使用计算属性来描述依赖响应式状态的复杂逻辑。</p>
        <p>
          Vue 的计算属性会自动追踪响应式依赖。它会检测到 publishedBooksMessage 依赖于 author.books，所以当 author.books
          改变时，任何依赖于 publishedBooksMessage 的绑定都会同时更新。
        </p>
        <p>
          Has published books: <span>{{ publishedBooksMessage }}</span>
        </p>

        <!-- 计算属性缓存 VS 方法 -->
        <div class="font-semibold text-base mb-1">1、计算属性缓存 VS 方法</div>
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

        <!-- 可写的计算属性 -->
        <div class="font-semibold text-base mb-1">2、可写的计算属性</div>
        <p>计算属性默认是只读的。当我们需要用到可写属性时，可以使用提供的 getter 和 setter 来创建。</p>
        <p>fullName: {{ fullName }}</p>
        <button class="bg-purple-100 border cursor-pointer mb-2" @click="changeName">changeName</button>

        <!-- 获取上一个值 -->
        <div class="font-semibold text-base mb-1">3、获取上一个值</div>
        <p>countNum：{{ alwaysSmall }} | previousNum: {{ previousNum }}</p>
        <button class="bg-red-100 border cursor-pointer" @click="countNum++">countNum++</button>
      </div>
    </section>

    <!-- Class 与 Style 绑定 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">Class 与 Style 绑定</div>
        <p>数据绑定的一个常见需求场景时操作元素的 CSS class列表和内联样式。</p>

        <!-- 绑定对象 -->
        <div class="font-semibold text-base mb-1">1、绑定对象</div>
        <div :class="{ 'text-blue-500': true, 'text-sm': true }">内联字面量形式-在对象中写多个字段来操作多个css</div>
        <div :class="classObject">直接绑定一个对象</div>
        <div :class="classObject2">绑定一个返回对象的计算属性</div>

        <!-- 绑定数组 -->
        <div class="font-semibold text-base mb-1">2、绑定数组</div>
        <div :class="['text-red-500', 'text-lg', 'font-bold']">
          绑定一个数组（我们可以给 :class 绑定一个数组来渲染 CSS Class）
        </div>
        <div :class="[true ? 'text-green-500' : 'text-red-500', 'text-base']">使用三元表达式，有条件的渲染某class</div>

        <!-- 绑定内联样式-绑定对象 -->
        <div class="font-semibold text-base mb-1">3、绑定内联样式-绑定对象</div>
        <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
          :style 绑定 JS 对象值，对应的是 HTML 元素的 style 属性
        </div>
        <div :style="styleObject">直接绑定一个样式对象，使模板更加简洁。</div>

        <!-- 绑定内联样式-绑定数组 -->
        <div class="font-semibold text-base mb-1">4、绑定内联样式-绑定数组</div>
        <div :style="[{ color: 'blue' }, { fontSize: '24px' }]">
          :style 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上。
        </div>

        <!-- 绑定内联样式-样式多值 -->
        <div class="font-semibold text-base mb-1">5、绑定内联样式-样式多值</div>
        <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'], justifyContent: ['-webkit-center', 'center'] }">
          <p>对一个样式属性提供多个不同前缀的值，</p>
          <p>数组仅会渲染浏览器支持的最后一个值。</p>
        </div>
      </div>
    </section>

    <!-- 条件渲染 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">条件渲染</div>

        <!-- v-if -->
        <div class="font-semibold text-base mb-1">1、v-if、v-else</div>
        <p>一个 v-else 元素必须跟在一个 v-if 或者 v-else-if 元素后面，否则它将不会被识别。</p>
        <button class="bg-red-100 border cursor-pointer mb-2" @click="awesome = !awesome">Toggle</button>
        <h4 v-if="awesome">Vue is awesome!</h4>
        <h4 v-else>Oh no 😢</h4>

        <!-- v-show -->
        <div class="font-semibold text-base mb-1">2、v-show</div>
        <p>v-show 不支持在 template 元素上使用，也不能和 v-else 搭配使用。</p>
        <h3 v-show="true">
          Hello！v-show 会在 DOM 渲染中保留该元素；v-show 仅切换了该元素上名为 display 的 CSS 属性。
        </h3>

        <!-- v-if vs v-show -->
        <div class="font-semibold text-base mb-1">3、v-if vs v-show</div>
        <p>
          v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show
          较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。
        </p>

        <!-- v-if 和 v-for -->
        <div class="font-semibold text-base mb-1">4、v-if 和 v-for</div>
        <p>
          v-if 的优先级比 v-for 高。这意味着如果两者出现在同一个元素上，v-if 会先于 v-for 被处理。不推荐同时使用 v-if 和
          v-for。
        </p>
      </div>
    </section>

    <!-- 事件处理 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">事件处理</div>

        <!-- 事件修饰符 -->
        <div class="font-semibold text-base mb-1">1、事件修饰符</div>
        <p>修饰符是用 . 表示的指令后缀；包含：.stop、.prevent、.self、.capture、.once、.passive。</p>

        <!-- stop -->
        <div @click="handleClick">
          <p>.stop 将阻止事件冒泡。相当于在原生的 JavaScript 中调用 event.stopPropagation()。</p>
          <p>点击按钮时，不会出发父级 div 的 click 事件。</p>
          <button @click.stop="handleClick">click me（.stop）</button>
        </div>

        <!-- prevent -->
        <p>.prevent 阻止事件的默认行为。相当于在原生的 JavaScript 中调用 event.preventDefault()。</p>
        <p>提交表单时，不会触发页面的刷新。</p>
        <form @submit.prevent="onSubmit">
          <button type="submit">submit（.prevent）</button>
        </form>

        <!-- self -->
        <p>.self 只有当事件是从事件绑定的元素本身触发时（即事件源是当前元素本身），才会调用事件处理函数。</p>
        <div @click.self="doThat" class="border p-2 cursor-pointer">
          点击这里会触发事件（.self）
          <p class="border cursor-pointer">点击这里不会触发事件（.self）</p>
        </div>

        <!-- capture -->
        <p>.capture 事件监听器会在事件捕获阶段触发，而不是冒泡阶段。</p>
        <p>
          默认的事件流是：捕获阶段 -> 目标阶段 -> 冒泡阶段。默认情况下，事件处理是在冒泡阶段触发的。添加 .capture
          后，事件处理会在捕获阶段（由外向内）触发。
        </p>
        <div @click.capture="outer" class="border cursor-pointer">
          outer
          <button @click="inner">inner</button>
        </div>

        <!-- .once -->
        <p>.once 事件只会触发一次。触发后，事件监听器会被自动移除。</p>
        <button @click.once="outer">只能点一次</button>

        <!-- .passive -->
        <p>
          .passive
          告诉浏览器你不打算阻止事件的默认行为（event.preventDefault()），从而让浏览器可以立即执行默认行为，无需等待事件处理函数执行完毕。这能显著提升移动端设备的滚动性能。
        </p>
        <div @scroll.passive="console.log('scrolling')" class="border h-20 overflow-auto bg-gray-200 rounded-lg">
          <div class="h-64">滚动这里试试（.passive）</div>
          <p>请查看控制台...</p>
        </div>

        <!-- 按键修饰符 -->
        <div class="font-semibold text-base mb-1 mt-2">2、按键修饰符</div>
        <p>在监听键盘事件时，我们经常需要检查特定的按键。Vue 允许在 v-on 或 @ 监听按键事件时添加按键修饰符。</p>
        <p>Vue 为一些常用的按键提供了别名：</p>
        <li>.enter</li>
        <li>.tab</li>
        <li>.delete(捕获“Delete”和“Backspace”两个按键)</li>
        <li>.esc</li>
        <li>.space</li>
        <li>.up</li>
        <li>.down</li>
        <li>.left</li>
        <li>.right</li>

        <!-- 系统按键修饰符 -->
        <div class="font-semibold text-base mb-1 mt-2">3、系统按键修饰符</div>
        <p>可以使用以下系统按键修饰符来触发鼠标或键盘事件监听器，只有当按键被按下时才会触发。</p>
        <li>.ctrl</li>
        <li>.alt</li>
        <li>.shift</li>
        <li>.meta (Mac上的Command键，Windows上的Windows键)</li>
        <input class="border p-2 mt-2" @keyup.enter="inner" placeholder="按下Enter触发" />

        <!-- .exact修饰符 -->
        <p>.exact 修饰符允许精确控制触发事件所需的系统修饰符的组合。</p>
        <p>当按下 Shift 时，即使同时按下 Alt 或 Shift 也会触发 <button @click.shift="inner">A</button></p>
        <p>仅当按下 Shift 且未按任何其他键时才会触发 <button @click.shift.exact="inner">A</button></p>
        <p>仅当没有按下任何系统按键时触发 <button @click.exact="inner">A</button></p>
      </div>
    </section>

    <!-- 表单输入绑定 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">表单输入绑定</div>

        <p>我们常常需要将表单输入框的内容同步给 JavaScript 中的相应变量。</p>

        <!-- 手动连接值绑定和更改事件监听器 -->
        <div class="font-semibold text-base mb-1">1、手动连接值绑定和更改事件监听器</div>
        <input :value="text" @input="(event) => (text = event.target.value)" />
        输入的内容：{{ text }}

        <!-- v-model 双向数据绑定 -->
        <div class="font-semibold text-base mb-1">2、v-model</div>
        <input v-model="text2" />
        输入的内容（v-model双向数据绑定）：{{ text2 }}

        <!-- 基本用法（文本） -->
        <div class="font-semibold text-base mb-1">3、基本用法（文本）</div>
        <p>Message is: {{ message }}</p>
        <input v-model="message" placeholder="edit me" />

        <!-- 基本用法（多行文本） -->
        <div class="font-semibold text-base mb-1">4、基本用法（多行文本）</div>
        <span>Multiline message is:</span>
        <p style="white-space: pre-line">{{ message2 }}</p>
        <textarea v-model="message2" placeholder="add multiple lines"></textarea>

        <!-- 基本用法（复选框） -->
        <div class="font-semibold text-base mb-1">5、基本用法（复选框）</div>
        <p>checked 只会为 true 或 false</p>
        <input type="checkbox" id="checkbox" v-model="checked" />
        <label for="checkbox">{{ checked }}</label>

        <!-- 基本用法（多个复选框） -->
        <div class="font-semibold text-base mb-1">6、基本用法（多个复选框）</div>

        <div>Checked names: {{ checkNames }}</div>
        <input type="checkbox" class="mr-2" id="zhangsan" value="zhangsan" v-model="checkNames" />
        <label for="zhangsan" class="mr-2">zhangsan</label>
        <input type="checkbox" class="mr-2" id="lisi" value="lisi" v-model="checkNames" />
        <label for="lisi" class="mr-2">lisi</label>
        <input type="checkbox" class="mr-2" id="wangwu" value="wangwu" v-model="checkNames" />
        <label for="wangwu" class="mr-2">zhangsan</label>

        <!-- 基本用法（单选按钮） -->
        <div class="font-semibold text-base mb-1">7、基本用法（单选按钮）</div>

        <p>picked 在被选择时是字符串 one 或 two</p>
        <div>picked: {{ picked }}</div>
        <input type="radio" class="mr-2" id="one" value="one" v-model="picked" />
        <label for="one" class="mr-2">One</label>
        <input type="radio" class="mr-2" id="two" value="two" v-model="picked" />
        <label for="two" class="mr-2">Two</label>

        <!-- 基本用法（选择器） -->
        <div class="font-semibold text-base mb-1">8、基本用法（选择器）</div>
        <p>selected 在第一项被选中时为字符串 "A"</p>
        <div>Selected: {{ selected }}</div>
        <select v-model="selected" multiple>
          <option disabled value="">请选择</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>

        <!-- 基本用法（选择器选项通过v-for渲染） -->
        <div class="font-semibold text-base mb-1">9、基本用法（选择器选项通过v-for渲染）</div>
        <select v-model="selected2">
          <option v-for="option in options" :value="option.value">
            {{ option.text }}
          </option>
        </select>
        <div>Selected: {{ selected2 }}</div>

        <!-- 修饰符 -->
        <div class="font-semibold text-base mb-1">10、修饰符</div>
        <div><input v-model.lazy="msg" /> 添加lazy修饰符，每次change事件后更新数据：{{ msg }}</div>
        <div><input v-model.number="age" /> 添加.number修饰符，让用户输入自动转为数字：{{ age }}</div>
        <div><input v-model.trim="msg2" /> 添加.trim修饰符，自动去除用户输入内容中两端的空格：{{ msg2 }}</div>
      </div>
    </section>

    <!-- 侦听器 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">侦听器</div>
        <p>
          计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：例如修改DOM，或者根据异步操作的结果去修改另一处的状态。
        </p>
        <p>在组合式 API 中，我们可以使用 watch 函数在每次响应式状态发生变化时触发回调函数</p>

        <!-- 侦听器 -->
        <div class="font-semibold text-base mb-1">1、侦听器</div>
        <p>
          Ask a yes/no question:
          <input v-model="question" :disabled="loading" />
        </p>
        <p>{{ answer }}</p>

        <!-- 侦听数据源类型 -->
        <div class="font-semibold text-base mb-1">2、侦听数据源类型</div>
        watch 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter
        函数、或多个数据源组成的数组：
        <div>
          <input type="number" v-model="x" />
          打开控制台，查看值的变化。
        </div>

        <!-- 深层侦听器 -->
        <div class="font-semibold text-base mb-1">3、深度侦听器</div>
        <p>直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发</p>
        <div>
          {{ person }}
          <button @click="changePerson">changePerson</button>
        </div>
        <div>
          <p>一个返回响应式对象的getter函数，只有在返回不同的对象时，才会触发回调</p>
          {{ person }}
          <button @click="changePersonName">changeName</button>
          <button @click="changePersonAge" class="ml-2">changeAge</button>
        </div>
        <p>在 Vue 3.5+ 中，deep 选项还可以是一个数字，表示最大遍历深度——即 Vue 应该遍历对象嵌套属性的级数。</p>

        <!-- 即时回调的侦听器 -->
        <div class="font-semibold text-base mb-1">4、即时回调的侦听器</div>
        <p>
          watch
          默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。
        </p>
        <p>我们可以通过传入 immediate: true 选项来强制侦听器的回调立即执行。</p>

        <!-- 一次性侦听 -->
        <div class="font-semibold text-base mb-1">5、一次性侦听</div>
        <button @click="changeSource2">一次性侦听器</button> => 查看控制台

        <!-- watchEffect -->
        <div class="font-semibold text-base mb-1">6、watchEffect</div>
        <div>
          watch的核心特点：立即执行传入的函数，并在执行过程中自动追踪其所有的响应式依赖，当任何依赖发生变化时，该函数会再次执行。
          <ul>
            <li>自动依赖收集：你不需要显式声明要监听什么，Vue 会自动帮你搞定。</li>
            <li>立即执行：默认会立即运行一次。</li>
            <li>简洁：对于这种"副作用依赖于多个状态"的场景，代码比多个 watch 更简洁。</li>
          </ul>
        </div>
        <p>
          在这个例子中，回调会立即执行，不需要指定 immediate:
          true。在执行期间，它会自动追踪draftContent.value作为依赖(和计算属性类似)。每当 draftContent.value
          发生变化时，回调会再次执行。
        </p>
        <p>
          Tip: watchEffect 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await
          正常工作前访问到的属性才会被追踪 。
        </p>
        <textarea v-model="draftContent" placeholder="开始写作..."></textarea>
        <p v-if="lastSavedTime">最后保存时间: {{ lastSavedTime }}</p>

        <!-- 副作用清理 -->
        <div class="font-semibold text-base mb-1">7、副作用清理</div>
        <p>我们API来注册一个清理函数，当侦听器失效并准备重新运行时会被调用。</p>
        <p>
          onWatcherCleanup仅在Vue3.5+中支持，并且在 watchEffect 效果函数或 watch
          回调函数的同步执行期间调用：不能在异步函数的 await 语句之后调用它
        </p>
        <p>
          作为替代，onCleanup函数还作为第三个参数传递给侦听器回调，以及watchEffect作用函数的第一个参数，在3.5之前的版本有效。此外，函数参数传递的
          onCleanup 与侦听器实例相绑定，因此不受 onWatcherCleanup 的同步限制。
        </p>

        <!-- 停止侦听器 -->
        <div class="font-semibold text-base mb-1">8、停止侦听器</div>
        <p>
          在 setup()
          中用同步语句创建的侦听器，会自动绑定到宿主组件实例上，并且会在宿主组件卸载时自动停止。因此，在大多数情况下，你无需关心怎么停止一个侦听器。
        </p>
        <p>
          一个关键点是，侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。
        </p>
      </div>
    </section>

    <!-- 模版引用 -->
    <section class="mx-auto w-full">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="font-semibold text-xl mb-1">模版引用</div>

        <p>
          虽然 Vue 的声明性渲染模型为你抽象了大部分对 DOM 的直接操作，但在某些情况下，我们仍然需要直接访问底层 DOM
          元素。
        </p>

        <!-- v-if -->
        <div class="font-semibold text-base mb-1">1、访问模板引用</div>
        <input ref="my-input" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
