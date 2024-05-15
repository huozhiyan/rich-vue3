<script setup lang="ts">
import { ref, reactive } from "vue"

// 动画速度 默认 x1
const speed = ref<string>("speed x1")
// 是否正在播放
const isPlaying = ref<boolean>(false)
// 是否正在录制
const isRecording = ref<boolean>(false)
// 画布文本
const canvasText = ref<string>("")

// 使用接口
interface SpeedOptions {
  value: number
  label: string
}
// 使用类型别名
// type SpeedOptionsType = {
//   value: number
//   label: string
// }

// 选择动画速度
const speedOptions: SpeedOptions[] = reactive([
  {
    value: 0.5,
    label: "speed x0.5"
  },
  {
    value: 1,
    label: "speed x1"
  },
  {
    value: 2,
    label: "speed x2"
  }
])

// 配发事件
const emit = defineEmits(["play", "pause", "changeSpeed", "changeText", "start", "stop", "generatePic"])

// 播放动画
const playAnimation = () => {
  isPlaying.value = true
  emit("play")
}

// 暂停动画
const pauseAnimation = () => {
  isPlaying.value = false
  emit("pause")
}

// 选择速度
const selectSpeed = (value: string) => {
  emit("changeSpeed", value)
}

// 修改画布文本
const changeCanvasText = () => {
  emit("changeText", canvasText.value)
}

// 开始录制
const start = () => {
  isRecording.value = true
  playAnimation()
  emit("start", true)
}

// 停止录制
const stop = () => {
  isRecording.value = false
  pauseAnimation()
  emit("stop", false)
}

const generatePic = () => {
  emit("generatePic")
}
</script>

<template>
  <div class="video-btn">
    <el-button>视频设置</el-button>
    <el-divider direction="vertical" />
    <el-input
      class="text"
      placeholder="修改画布文本"
      maxlength="10"
      show-word-limit
      v-model="canvasText"
      @change="changeCanvasText"
    />
    <el-divider direction="vertical" />
    <el-select class="select-width" placeholder="动画速度" v-model="speed" @change="selectSpeed">
      <el-option v-for="item in speedOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-divider direction="vertical" />
    <el-button type="primary" @click="playAnimation" :disabled="isPlaying">播放</el-button>
    <el-button type="danger" @click="pauseAnimation" :disabled="!isPlaying">暂停</el-button>
    <el-divider direction="vertical" />
    <el-button type="primary" @click="start" :disabled="isRecording">开始录制</el-button>
    <el-button type="danger" @click="stop" :disabled="!isRecording">结束录制</el-button>
    <el-divider direction="vertical" />
    <el-button @click="generatePic">生成图片</el-button>
  </div>
</template>

<style scoped lang="scss">
.video-btn {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.select-width {
  width: 150px;
}
.text {
  width: 215px;
}
::v-deep.el-divider--vertical {
  height: 2rem !important;
  margin: 0 16px !important;
}
</style>
