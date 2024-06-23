import * as THREE from "three"
import { City } from "./city"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import "../base/index.css"

// 初始化城市
export const initCity = () => {
  // 获取 canvas 元素
  const canvas = document.getElementById("webgl") as HTMLCanvasElement

  // 创建场景
  const scene = new THREE.Scene()

  // 创建相机
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100000)
  // 设置相机位置
  camera.position.set(1000, 500, 100)

  // 添加相机至场景中
  scene.add(camera)

  // 添加相机控件（轨道控制器 => 可以使得相机围绕目标进行轨道运动）
  const controls = new OrbitControls(camera, canvas)
  // 是否有惯性
  controls.enableDamping = true
  // 禁用摄像机的缩放
  controls.enableZoom = false
  // 最近和最远距离
  controls.minDistance = 100
  controls.maxDistance = 2000
  // 开启右键拖动
  controls.enablePan = true

  // 添加环境光 => 均匀的照亮场景中的所有物体，环境光不能用来投射阴影，因为它没有方向。
  scene.add(new THREE.AmbientLight(0xadadad))

  // 平行光 => 沿着特定方向发射的光，太阳光即是平行光
  const directionLight = new THREE.DirectionalLight(0xffffff)
  directionLight.position.set(0, 0, 0)
  scene.add(directionLight)

  const renderer = new THREE.WebGLRenderer({ canvas })
  // 设置渲染器尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置像素比，与当前浏览器一致
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // 设置场景颜色
  renderer.setClearColor(new THREE.Color(0x000000), 1)

  // 创建城市实例
  const city = new City(scene, camera, controls)

  const clock = new THREE.Clock()

  const start = () => {
    city.start(clock.getDelta())
    controls.update()
    // 渲染场景
    renderer.render(scene, camera)
    requestAnimationFrame(start)
  }

  start()

  // 监听浏览器变化，进行一系列更新
  window.addEventListener("resize", () => {
    // 更新宽高比
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新相机的投影矩阵
    camera.updateProjectionMatrix()

    // 更新渲染器尺寸
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 设置像素比
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
}
