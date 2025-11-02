<script setup lang="ts">
import VideoHeader from "@/views/handle-video/components/VideoHeader.vue"
import { ref, reactive, onMounted, onUnmounted } from "vue"

// 获取 canvas
const richCanvas = ref<HTMLCanvasElement | null>(null)
// 动画速度
const animationSpeed = ref<number>(1)
// 定时器
const timer = ref<number>(0)
// 左边距
const leftDistance = ref<number>(110)
// 画布上的文本内容
const canvasText = ref<string>("rich-vue3")
// 文本大小
const textFontSize = ref<number>(20)
// 文本颜色
const textColor = ref<string>("orange")
// 文本字体
const fontType = ref<string>("px Arial")
const isRecording = ref<boolean>(false)

// recorder 实例
const recorder = ref<any>(null)
// 存储媒体流
let allChunks = reactive([])

// 在画布上添加文本
const addTextOnCanvas = () => {
  const canvas = richCanvas.value
  if (!canvas) return
  const context = canvas.getContext("2d")
  if (!context) return
  // 清空画布（使用 CSS 像素坐标，因为在 resize 时我们会设置 transform）
  context.clearRect(0, 0, canvas.width, canvas.height)
  // 设置字体和大小（字体单位按 CSS 像素）
  context.font = textFontSize.value + fontType.value
  // 填充文本颜色
  context.fillStyle = textColor.value
  // 位置文本，注意 canvas.height/2 这里是设备像素已缩放回 CSS 像素空间
  context.fillText(canvasText.value, leftDistance.value, canvas.height / (window.devicePixelRatio || 1) / 2)
}

// 调整 canvas 分辨率以适配屏幕并保证绘制清晰
const resizeCanvas = () => {
  const canvas = richCanvas.value
  if (!canvas) return
  const dpr = window.devicePixelRatio || 1
  // 获取元素的 CSS 尺寸
  const rect = canvas.getBoundingClientRect()
  const cssWidth = Math.max(1, Math.floor(rect.width))
  const cssHeight = Math.max(1, Math.floor(rect.height))
  // 将 canvas 的内部像素大小设为 CSS 大小 * dpr
  canvas.width = Math.floor(cssWidth * dpr)
  canvas.height = Math.floor(cssHeight * dpr)
  // 保持元素的样式尺寸为 CSS 大小
  canvas.style.width = cssWidth + "px"
  canvas.style.height = cssHeight + "px"
  const ctx = canvas.getContext("2d")
  if (ctx) {
    // 将绘制坐标系缩放回 CSS 像素单位，后续绘制可直接使用 CSS 像素值
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  // 重新绘制内容
  addTextOnCanvas()
}

// 播放动画
const playAnimation = () => {
  if (timer.value) {
    return
  }
  const canvas = richCanvas.value
  if (!canvas) return
  const context = canvas.getContext("2d")
  if (!context) return
  // 使用 setInterval 保持与原逻辑一致，但注意 width/height 已经按 dpr 处理并用 setTransform 恢复为 CSS 像素
  timer.value = window.setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.font = textFontSize.value + fontType.value
    context.fillStyle = textColor.value
    // canvas.height 目前是物理像素，需要除以 devicePixelRatio 来得到 CSS 像素高度
    const cssHeight = canvas.height / (window.devicePixelRatio || 1)
    context.fillText(canvasText.value, leftDistance.value, cssHeight / 2)
    leftDistance.value += animationSpeed.value / 2
    // 边界检测使用 CSS 宽度
    const cssWidth = canvas.width / (window.devicePixelRatio || 1)
    if (leftDistance.value > cssWidth || leftDistance.value < 5) {
      animationSpeed.value = -animationSpeed.value
    }
  }, 10)
}

// 暂停动画
const pauseAnimation = () => {
  if (timer.value) {
    window.clearInterval(timer.value)
    timer.value = 0
  }
}

// 获取当前速度
const getSpeed = (value) => {
  animationSpeed.value = value
}

// 修改画布文本内容
const changeCanvasText = (text) => {
  canvasText.value = text || canvasText.value
  addTextOnCanvas()
}

// 开始录制
const startRecording = () => {
  isRecording.value = true
  allChunks = []
  const canvas = richCanvas.value
  const stream = canvas.captureStream(60) // 60 FPS
  // 创建一个对指定的 stream 进行录制的 MediaRecorder 对象
  recorder.value = new MediaRecorder(stream, {
    mimeType: "video/webm;codecs=vp9" // 设置媒体类型
  })
  // 当数据有效时触发的事件并把数据存储到缓存区里
  recorder.value.ondataavailable = (e) => {
    console.log("TCL: e", e)
    allChunks.push(e.data)
  }
  recorder.value.start(10)
}

// 停止录制并输出视频
const stopRecording = () => {
  isRecording.value = false
  if (!allChunks.length) {
    return
  }
  // 结束录像
  recorder.value.stop()
  const link = document.createElement("a")
  link.style.display = "none"
  // 创建一个 Blob 对象，用于存储二进制数据
  const fullBlob = new Blob(allChunks)
  // 获取或设置链接的 URL 属性
  link.href = window.URL.createObjectURL(fullBlob)
  // 点击链接时，浏览器下载文件
  link.download = `rich-vue3.webm`
  // 向节点的子节点列表的末尾添加新的子节点
  document.body.appendChild(link)
  // 模拟用户点击链接的操作
  link.click()
  // 删除 HTML 文档中的链接元素
  link.remove()
}

// 生成当前画布内容的图片
const generateCanvasPic = () => {
  const canvas = richCanvas.value
  const dataURL = canvas?.toDataURL("image/png")
  const a = document.createElement("a")
  a.href = dataURL
  a.download = `${canvasText.value}.png`

  // 触发下载
  document.body.appendChild(a)
  a.click()
  // 从DOM中移除
  document.body.removeChild(a)
}

onMounted(() => {
  // 初始设置 canvas 大小并监听窗口变化
  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)
  addTextOnCanvas()
})

onUnmounted(() => {
  // 清理定时器与事件监听
  pauseAnimation()
  window.removeEventListener("resize", resizeCanvas)
})
</script>

<template>
  <div>
    <VideoHeader
      @changeSpeed="getSpeed"
      @changeText="changeCanvasText"
      @play="playAnimation"
      @pause="pauseAnimation"
      @start="startRecording"
      @stop="stopRecording"
      @generatePic="generateCanvasPic"
    />
    <div class="outer">
      <div
        v-loading="isRecording"
        element-loading-text="正在录制..."
        element-loading-background="rgba(122, 122, 122, 0.4)"
      >
        <canvas ref="richCanvas" class="canvas" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.outer {
  padding: 15px;
  text-align: center;
}
.canvas {
  background: white;
  width: 100%;
  height: 75vh;
}
</style>
