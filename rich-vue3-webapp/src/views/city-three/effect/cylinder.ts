import * as THREE from "three"
import { Vector3Like } from "_@types_three@0.165.0@@types/three"

interface configOption {
  radius: number
  height: number
  open: boolean
  color: string
  opacity: number
  position: object
  speed: number
}

export class Cylinder {
  private scene: any
  private readonly time: object
  constructor(scene: any, time: object) {
    this.scene = scene
    this.time = time
  }

  createCylinder(options: configOption) {
    const geometry = new THREE.CylinderGeometry(
      options.radius,
      options.radius,
      options.height,
      32,
      1,
      options.open,
      options.speed
    )

    // 调正圆柱体的位置（上移）
    geometry.translate(0, options.height / 2, 0)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_color: {
          value: new THREE.Color(options.color)
        },
        u_height: {
          value: options.height
        },
        u_opacity: {
          value: options.opacity
        },
        u_speed: {
          value: options.speed
        },
        // @ts-ignore
        u_time: this.time
      },
      vertexShader: `
        uniform float u_time;
        uniform float u_height;
        uniform float u_speed;

        varying float v_opacity;

        void main() {
          vec3 v_position = position * mod(u_time / u_speed, 1.0);

          v_opacity = mix(1.0, 0.0, position.y / u_height);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 u_color;
        uniform float u_opacity;

        varying float v_opacity;

        void main() {
          gl_FragColor = vec4(u_color, u_opacity * v_opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide, // 整个圆柱体
      depthTest: false // 防止被建筑物遮挡
    })

    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.copy(<Vector3Like>options.position)
    this.scene.add(mesh)
  }
}
