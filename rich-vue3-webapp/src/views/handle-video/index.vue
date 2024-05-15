<script setup lang="ts">
import VideoHeader from "@/views/handle-video/components/VideoHeader.vue"
import { ref, reactive, onMounted } from "vue"

// 获取 canvas
const richCanvas = ref<HTMLCanvasElement>()
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
  const context = canvas.getContext("2d")
  context.clearRect(0, 0, canvas.width, canvas.height)
  // 设置字体和大小
  context.font = textFontSize.value + fontType.value
  // 填充文本颜色 => 果粒登色
  context.fillStyle = textColor.value
  // 位置文本
  context.fillText(canvasText.value, leftDistance.value, canvas.height / 2)
}

// 播放动画
const playAnimation = () => {
  if (timer.value) {
    return
  }
  const canvas = richCanvas.value
  const context = canvas.getContext("2d")
  timer.value = setInterval(() => {
    // 清空画布（否则字体移动后颜色会遗留在画布上）
    context.clearRect(0, 0, canvas.width, canvas.height)
    // 设置字体和大小
    context.font = textFontSize.value + fontType.value
    // 填充文本颜色 => 果粒登色
    context.fillStyle = textColor.value
    context.fillText(canvasText.value, leftDistance.value, canvas.height / 2) //绘制文本
    // 文本移动
    leftDistance.value += animationSpeed.value / 2
    // 如果文本达到画布边缘，改变方向
    if (leftDistance.value > canvas.width || leftDistance.value < 5) {
      animationSpeed.value = -animationSpeed.value
    }
  }, 10)
}

// 暂停动画
const pauseAnimation = () => {
  clearInterval(timer.value)
  timer.value = 0
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
  addTextOnCanvas()
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
  width: 1400px;
  height: 700px;
}
</style>
