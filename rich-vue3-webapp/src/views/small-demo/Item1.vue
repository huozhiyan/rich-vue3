<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"

// 眼睛中心点（SVG坐标系下）
const eyeCenter = {
  left: { x: 8, y: 18 }, // 左眼中心坐标
  right: { x: 22, y: 18 } // 右眼中心坐标
}

// 眼珠活动半径，限制眼珠移动范围
const radius = 2.5

// 记录左右眼珠当前坐标
const eyeLeft = ref({ x: eyeCenter.left.x, y: eyeCenter.left.y })
const eyeRight = ref({ x: eyeCenter.right.x, y: eyeCenter.right.y })

// 弹跳相关变量
const iconY = ref(0) // 图标y轴偏移量（SVG坐标系下）
let velocity = 0 // 当前速度
let bouncing = false // 是否正在弹跳
let bounceHeight = 3 // 初始弹跳速度（弹跳高度）
const gravity = 0.5 // 重力加速度
const damping = 0.55 // 每次弹跳能量损失（阻尼系数）

/**
 * 鼠标移动时让眼珠跟随鼠标移动
 * 1. 获取SVG区域的坐标和尺寸
 * 2. 将鼠标位置转换为SVG坐标系
 * 3. 计算鼠标与每只眼睛中心的距离
 * 4. 如果距离超过最大活动半径，则限制在圆周上
 * 5. 更新左右眼珠的位置，实现跟随效果
 */
function handleMouseMove(e: MouseEvent) {
  const svg = document.getElementById("cartoon-svg")
  if (!svg) return
  const rect = svg.getBoundingClientRect()
  // 转换为SVG坐标
  const mouseX = ((e.clientX - rect.left) / rect.width) * 42
  const mouseY = ((e.clientY - rect.top) / rect.height) * 100 // viewBox高度为70或100

  // 左眼
  let dx = mouseX - eyeCenter.left.x
  let dy = mouseY - eyeCenter.left.y
  let dist = Math.sqrt(dx * dx + dy * dy)
  // 限制眼珠活动范围
  if (dist > radius) {
    dx = (dx / dist) * radius
    dy = (dy / dist) * radius
  }
  eyeLeft.value = { x: eyeCenter.left.x + dx, y: eyeCenter.left.y + dy }

  // 右眼
  dx = mouseX - eyeCenter.right.x
  dy = mouseY - eyeCenter.right.y
  dist = Math.sqrt(dx * dx + dy * dy)
  if (dist > radius) {
    dx = (dx / dist) * radius
    dy = (dy / dist) * radius
  }
  eyeRight.value = { x: eyeCenter.right.x + dx, y: eyeCenter.right.y + dy }
}

/**
 * 点击SVG图标时触发弹跳
 * 设置初始速度，启动动画
 */
function bounce() {
  if (bouncing) return // 防止重复弹跳
  bouncing = true
  velocity = -bounceHeight // 初始向上速度
  animate()
}

/**
 * 弹跳动画主循环
 * 1. 更新y轴偏移量和速度
 * 2. 到达底部时反弹并损失能量
 * 3. 速度和位置足够小时停止动画
 */
function animate() {
  iconY.value += velocity
  velocity += gravity
  // 到达底部（y=0），反弹
  if (iconY.value > 0) {
    iconY.value = 0
    velocity = -velocity * damping
    // 停止条件：速度很小且位置归零
    if (Math.abs(velocity) < 1.1 && Math.abs(iconY.value) < 0.1) {
      bouncing = false
      velocity = 0
      iconY.value = 0
      return
    }
  }
  requestAnimationFrame(animate)
}

// 组件挂载时监听鼠标移动事件，实现眼珠跟随
onMounted(() => {
  window.addEventListener("mousemove", handleMouseMove)
})
// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove)
})
</script>

<template>
  <!-- SVG容器，底部对齐 -->
  <div style="margin: auto; width: 100px; height: 310px; display: flex; align-items: flex-end">
    <svg id="cartoon-svg" viewBox="0 0 42 100" width="100" height="310" style="cursor: pointer" @click="bounce">
      <!-- g标签通过translate实现弹跳动画 -->
      <g :transform="`translate(0,${iconY})`">
        <g transform="matrix(1,0,0,1,-3490.31,-1501.28)">
          <!-- 卡通脸部 -->
          <g transform="matrix(1,0,0,1.02073,3090.26,17.8656)">
            <g>
              <g transform="matrix(1,0,0,0.979688,394,1449.09)">
                <path
                  d="M45.378,35.48C49.508,22.594 44.372,9.428 33.906,6.074C23.44,2.72 11.608,10.447 7.478,23.333C3.348,36.219 8.484,49.384 18.95,52.738C29.416,56.093 41.249,48.366 45.378,35.48Z"
                  style="fill: rgb(195, 153, 103); fill-rule: nonzero"
                ></path>
              </g>
              <g transform="matrix(1.16206,0,0,1.04909,386.374,1447.76)">
                <path
                  d="M12.863,13.171C12.682,13.402 12.646,13.726 12.771,13.997C12.895,14.267 13.156,14.43 13.434,14.412C18.562,14.104 34.147,13.739 40.587,20.394L40.283,28.264L46.021,33.321C46.021,33.321 52.279,11.395 34.026,6.07C23.172,2.904 15.573,10.04 12.863,13.171Z"
                  style="fill: rgb(29, 29, 27); fill-rule: nonzero"
                ></path>
              </g>
            </g>
          </g>
          <!-- 画嘴巴 -->
          <g transform="matrix(0.875522,0,0,0.795728,3486.38,1503.75)">
            <path
              d="M26.272,45.074C25.032,48.037 21.738,49.501 18.906,48.315C15.956,47.081 14.638,43.566 15.93,40.481C17.17,37.518 20.465,36.053 23.297,37.24C26.247,38.476 27.564,41.989 26.272,45.074ZM23.286,43.561C23.774,42.397 23.241,41.086 22.127,40.62C20.897,40.105 19.454,40.707 18.916,41.994C18.428,43.158 18.961,44.469 20.075,44.935C21.305,45.45 22.748,44.848 23.286,43.561Z"
              style="fill: rgb(133, 45, 32)"
            ></path>
          </g>
          <!-- 画鼻子 -->
          <g transform="matrix(1,0,0,0.999997,3484.26,1496.99)">
            <path
              d="M20.758,23.007L22.238,24.621C22.238,24.621 20.148,26.534 18.899,28.578C18.533,29.178 18.236,29.784 18.13,30.351C18.066,30.692 18.063,31.013 18.27,31.264C18.587,31.649 19.204,31.854 20.161,31.972C21.43,32.129 23.189,32.057 25.575,31.697L25.901,33.863C22.694,34.347 20.495,34.325 19.046,34.002C17.828,33.73 17.054,33.233 16.579,32.656C15.712,31.604 15.732,30.163 16.388,28.656C17.559,25.967 20.758,23.007 20.758,23.007Z"
              style="fill: rgb(133, 45, 32)"
            ></path>
          </g>
        </g>
        <!-- 眼白和眼珠，位置由响应式变量控制，实现跟随鼠标效果 -->
        <ellipse cx="8" cy="18" rx="3.5" ry="3.5" fill="#fff" stroke="#333" stroke-width="0.3" />
        <circle :cx="eyeLeft.x" :cy="eyeLeft.y" r="1.2" fill="#333" />
        <ellipse cx="22" cy="18" rx="3.5" ry="3.5" fill="#fff" stroke="#333" stroke-width="0.3" />
        <circle :cx="eyeRight.x" :cy="eyeRight.y" r="1.2" fill="#333" />
      </g>
    </svg>
  </div>
  <!-- 说明文字 -->
  <p class="mx-auto text-gray-500">原型来源：https://neal.fun/</p>
</template>
