import * as THREE from "three"

export class Background {
  private readonly url: string
  private scene: any
  constructor(scene: any) {
    this.scene = scene
    this.url = "../../../src/assets/city-three/black-bg.png"

    this.init()
  }

  // 初始化创建天空盒
  init() {
    // 纹理加载器
    const loader = new THREE.TextureLoader()

    const geometry = new THREE.SphereGeometry(5000, 32, 32)
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: loader.load(this.url)
    })

    const sphere = new THREE.Mesh(geometry, material)

    sphere.position.copy({
      x: 0,
      y: 0,
      z: 0
    })

    this.scene.add(sphere)
  }
}
