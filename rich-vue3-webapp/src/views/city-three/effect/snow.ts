import * as THREE from "three"
import { Vector3 } from "three"

export class Snow {
  private scene: any
  private readonly range: number
  private readonly count: number
  private readonly pointList: any[]
  private material: any
  private geometry: any
  private point: any
  constructor(scene: any) {
    this.scene = scene

    this.range = 1000
    this.count = 600

    this.material = null
    this.geometry = null
    this.point = null

    this.pointList = []

    this.init()
  }

  init() {
    // 粒子和粒子系统
    // PointCloud Points

    // 材质
    this.material = new THREE.PointsMaterial({
      size: 30,
      map: new THREE.TextureLoader().load("../../../src/assets/city-three/snow.png"),
      transparent: true,
      opacity: 0.8,
      depthTest: false // 消除 loader 的黑色背景
    })

    // 几何对象
    this.geometry = new THREE.BufferGeometry()

    // 添加顶点信息
    for (let i = 0; i < this.count; i++) {
      const position: Vector3 = new THREE.Vector3(
        Math.random() * this.range - this.range / 2,
        Math.random() * this.range,
        Math.random() * this.range - this.range / 2
      )

      // @ts-ignore
      position.speedX = Math.random() - 0.5
      // @ts-ignore
      position.speedY = Math.random() + 0.4
      // @ts-ignore
      position.speedZ = Math.random() - 0.5

      this.pointList.push(position)
    }

    // 把 points 添加到几何对象上
    this.geometry.setFromPoints(this.pointList)

    this.point = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.point)
  }

  animation() {
    this.pointList.forEach((position) => {
      position.x -= position.speedX
      position.y -= position.speedY
      position.z -= position.speedZ

      if (position.y <= 0) {
        position.y = this.range / 2
      }
    })
    this.point.geometry.setFromPoints(this.pointList)
  }
}
