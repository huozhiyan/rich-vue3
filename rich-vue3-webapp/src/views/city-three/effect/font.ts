import * as THREE from "three"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"

export class Font {
  private scene: any
  private font: null | object
  constructor(scene: any) {
    this.scene = scene
    this.font = null

    this.init()
  }

  init() {
    const loader = new FontLoader()
    loader.load("model/font.json", (font) => {
      this.font = font

      // 创建几何体
      this.createTextQueue()
    })
  }

  createTextQueue() {
    ;[
      {
        text: "前端杂货铺",
        size: 20,
        position: {
          x: -10,
          y: 130,
          z: 410
        },
        rotate: Math.PI / 1.3,
        color: "#d97f4c"
      },
      {
        text: "rich-vue3",
        size: 20,
        position: {
          x: 180,
          y: 110,
          z: -70
        },
        rotate: Math.PI / 2,
        color: "#ffffff"
      }
    ].forEach((item) => {
      this.createText(item)
    })
  }

  createText(data: { text: any; size?: number; position: any; rotate: any; color?: string }) {
    const geometry = new TextGeometry(data.text, {
      // @ts-ignore
      font: this.font,
      size: 20,
      height: 2
    })

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.copy(data.position)
    mesh.rotateY(data.rotate)

    this.scene.add(mesh)
  }
}
