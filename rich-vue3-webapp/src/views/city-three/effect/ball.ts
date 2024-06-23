import * as THREE from "three"
import { color } from "../config"
import { Vector3Like } from "_@types_three@0.165.0@@types/three"

interface configOption {
  height: number
  color: string
  opacity: number
  position: object
  speed: number
}

export class Ball {
  private scene: any
  private readonly time: object
  private readonly config: configOption
  constructor(scene: any, time: object) {
    this.scene = scene
    this.time = time

    this.config = {
      color: color.ball,
      height: 60,
      opacity: 0.6,
      speed: 4.0,
      position: {
        x: 300,
        y: 0,
        z: -200
      }
    }

    this.createSphere(this.config)
  }

  createSphere(options: configOption) {
    const geometry = new THREE.SphereGeometry(50, 32, 32, Math.PI / 2, Math.PI * 2, 0, Math.PI / 2)

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
