import * as THREE from "three"

export class Smoke {
  private scene: any
  private smokes: any[]
  private material: any
  private geometry: any
  private points: any
  constructor(scene: any) {
    this.scene = scene

    this.material = null
    this.geometry = null
    this.points = null

    this.smokes = []

    this.init()
  }

  init() {
    // 粒子初始化 空的缓冲几何体
    this.geometry = new THREE.BufferGeometry()

    this.material = new THREE.PointsMaterial({
      size: 50,
      map: new THREE.TextureLoader().load("../../../src/assets/city-three/smoke.png"),
      transparent: true,
      depthTest: false // 禁止深度写入
    })

    this.material.onBeforeCompile = function (shader: any) {
      const vertex1 = `
        attribute float a_opacity;
        attribute float a_size;
        attribute float a_scale;
        varying float v_opacity;

        void main() {
          v_opacity = a_opacity;
      `

      const glPosition = `
        gl_PointSize = a_size * a_scale;
      `

      shader.vertexShader = shader.vertexShader.replace("void main() {", vertex1)
      shader.vertexShader = shader.vertexShader.replace("gl_PointSize = size", glPosition)

      const fragment1 = `
        varying float v_opacity;

        void main() {
      `
      const fragment2 = `
        gl_FragColor = vec4(outgoingLight, diffuseColor.a * v_opacity);
      `

      shader.fragmentShader = shader.fragmentShader.replace("void main() {", fragment1)
      shader.fragmentShader = shader.fragmentShader.replace(
        "gl_FragColor = vec4(outgoingLight, diffuseColor.a);",
        fragment2
      )
    }

    this.points = new THREE.Points(this.geometry, this.material)

    this.points.position.set(80, 0, 220)

    this.scene.add(this.points)
  }

  createParticle() {
    this.smokes.push({
      size: 50,
      opacity: 1,
      x: 0,
      y: 0,
      z: 0,

      speed: {
        x: Math.random(),
        y: Math.random() + 0.3,
        z: Math.random()
      },

      scale: 1
    })
  }

  setAttribute(
    positionList: Array<number>,
    opacityList: Array<number>,
    sizeList: Array<number>,
    scaleList: Array<number>
  ) {
    // 坐标信息，纹理信息，自定义变量信息...
    this.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positionList), 3))
    this.geometry.setAttribute("a_opacity", new THREE.BufferAttribute(new Float32Array(opacityList), 1))
    this.geometry.setAttribute("a_size", new THREE.BufferAttribute(new Float32Array(sizeList), 1))
    this.geometry.setAttribute("a_scale", new THREE.BufferAttribute(new Float32Array(scaleList), 1))
  }

  update() {
    const positionList: Array<number> = []
    const opacityList: Array<number> = []
    const sizeList: Array<number> = []
    const scaleList: Array<number> = []

    this.smokes = this.smokes.filter((item) => {
      if (item.opacity < 0) {
        return false
      }

      item.opacity -= 0.01
      item.x += item.speed.x
      item.y += item.speed.y
      item.z += item.speed.z

      item.scale += 0.01

      positionList.push(item.x, item.y, item.z)
      opacityList.push(item.opacity)
      sizeList.push(item.size)
      scaleList.push(item.scale)

      return true
    })

    this.setAttribute(positionList, opacityList, sizeList, scaleList)
  }

  animation() {
    this.createParticle()

    this.update()
  }
}
