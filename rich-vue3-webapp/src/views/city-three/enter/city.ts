import { loadFBX } from "../utils"
import * as THREE from "three"
import * as TWEEN from "@tweenjs/tween.js"
import { SurroundLine } from "@/views/city-three/effect/surroundLine"
import { Background } from "@/views/city-three/effect/background"
import { Radar } from "../effect/radar"
import { Wall } from "../effect/wall"
import { Circle } from "@/views/city-three/effect/circle"
import { Ball } from "@/views/city-three/effect/ball"
import { Cone } from "@/views/city-three/effect/cone"
import { Fly } from "@/views/city-three/effect/fly"
import { Road } from "@/views/city-three/effect/road"
import { Font } from "@/views/city-three/effect/font"
import { Snow } from "@/views/city-three/effect/snow"
import { Rain } from "@/views/city-three/effect/rain"
import { Smoke } from "@/views/city-three/effect/smoke";

export class City {
  private readonly scene: any
  private readonly camera: any
  private readonly controls: any
  private tweenPosition: any
  private tweenRotation: any
  private flag: boolean
  private readonly height: { value: number }
  private readonly time: { value: number }
  private readonly top: { value: number }
  private readonly effect: {
    snow: any
    rain: any
    smoke: any
  }
  constructor(scene: object, camera: object, controls: any) {
    this.scene = scene
    this.camera = camera
    this.controls = controls
    this.flag = false
    this.tweenPosition = null
    this.tweenRotation = null

    this.height = {
      value: 5
    }

    this.time = {
      value: 0
    }

    this.top = {
      value: 0
    }

    // 雪、雨、烟雾
    this.effect = {
      snow: null,
      rain: null,
      smoke: null
    }

    this.loadCity()
  }

  loadCity() {
    // 加载城市模型，并且渲染到画布
    loadFBX("model/beijing.fbx").then((object: any) => {
      object.traverse((child: any) => {
        if (child.isMesh) {
          new SurroundLine(this.scene, child, this.height, this.time)
        }
      })
      this.initEffect()
    })
  }

  // 初始化效果，各个功能点都放在了这里
  initEffect() {
    new Background(this.scene)

    new Radar(this.scene, this.time)

    new Wall(this.scene, this.time)

    new Circle(this.scene, this.time)

    new Ball(this.scene, this.time)

    new Cone(this.scene, this.top, this.height)

    new Fly(this.scene, this.time)

    new Road(this.scene, this.time)

    new Font(this.scene)

    this.effect.snow = new Snow(this.scene)

    this.effect.rain = new Rain(this.scene)

    this.effect.smoke = new Smoke(this.scene)

    // 点击选择
    this.addClick()

    this.addWheel()
  }

  addClick() {
    let flag = true
    document.onmousedown = () => {
      flag = true
      document.onmousemove = () => {
        flag = false
      }
    }
    document.onmouseup = (event) => {
      if (flag) {
        this.clickEvent(event)
      }
      document.onmousemove = null
    }
  }

  // 场景跟随鼠标坐标缩放
  addWheel() {
    const body: HTMLElement = document.body
    // @ts-ignore
    body.onmousewheel = (event: MouseEvent) => {
      // 鼠标当前的坐标
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1

      const value = 30

      const vector = new THREE.Vector3(x, y, 0.5)
      vector.unproject(this.camera)
      vector.sub(this.camera.position).normalize()

      // @ts-ignore
      if (event.wheelDelta > 0) {
        this.camera.position.x += vector.x * value
        this.camera.position.y += vector.y * value
        this.camera.position.z += vector.z * value

        this.controls.target.x += vector.x * value
        this.controls.target.y += vector.y * value
        this.controls.target.z += vector.z * value
      } else {
        this.camera.position.x -= vector.x * value
        this.camera.position.y -= vector.y * value
        this.camera.position.z -= vector.z * value

        this.controls.target.x -= vector.x * value
        this.controls.target.y -= vector.y * value
        this.controls.target.z -= vector.z * value
      }
    }
  }

  // 点击聚焦
  clickEvent(event: MouseEvent) {
    // 归一化坐标（将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)）
    const x = (event.clientX / window.innerWidth) * 2 - 1
    const y = -(event.clientY / window.innerHeight) * 2 + 1

    // 创建设备坐标（三维）
    const standardVector = new THREE.Vector3(x, y, 0.5)
    // 转化为世界坐标 (将此向量 (坐标) 从相机的标准化设备坐标 (NDC) 空间投影到世界空间)
    const worldVector = standardVector.unproject(this.camera)
    // 做序列化
    const ray = worldVector.sub(this.camera.position).normalize()

    // 实现点击选中
    // 创建一个射线发射器，用来发射一条射线
    const raycaster = new THREE.Raycaster(this.camera.position, ray)
    // 返回射线碰撞到的物体
    const intersects = raycaster.intersectObjects(this.scene.children, true)

    let point3d = null
    if (intersects.length) {
      point3d = intersects[0]
    }

    if (point3d) {
      const proportion = 3
      // 开始动画修改观察点
      const time = 1000

      this.tweenPosition = new TWEEN.Tween(this.camera.position)
        .to({ x: point3d.point.x * proportion, y: point3d.point.y * proportion, z: point3d.point.y * proportion }, time)
        .start()

      this.tweenRotation = new TWEEN.Tween(this.camera.rotation)
        .to({ x: this.camera.rotation.x, y: this.camera.rotation.y, z: this.camera.rotation.z }, time)
        .start()
    }
  }

  start(delta: number) {
    for (const key in this.effect) {
      // @ts-ignore
      this.effect[key] && this.effect[key].animation()
    }

    if (this.tweenPosition && this.tweenRotation) {
      this.tweenPosition.update()
      this.tweenRotation.update()
    }

    this.height.value += 0.4
    if (this.height.value > 160) {
      this.height.value = 5
    }

    this.time.value += delta

    if (this.top.value > 15 || this.top.value < 0) {
      this.flag = !this.flag
    }

    this.top.value += this.flag ? -0.8 : 0.8
  }
}
