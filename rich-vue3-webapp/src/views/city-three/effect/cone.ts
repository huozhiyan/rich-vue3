import * as THREE from "three"
import { color } from "../config"
import { Vector3Like } from "_@types_three@0.165.0@@types/three"

interface configOption {
  height: number
  color: string
  position: object
}

export class Cone {
  private scene: any
  private readonly top: object
  private readonly height: object
  private readonly config: configOption
  constructor(scene: any, top: object, height: object) {
    this.scene = scene
    this.top = top
    this.height = height

    this.config = {
      color: color.cone,
      height: 60,
      position: {
        x: 0,
        y: 50,
        z: 0
      }
    }

    this.createCone(this.config)
  }

  createCone(options: configOption) {
    const geometry = new THREE.ConeGeometry(15, 30, 4)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_color: {
          value: new THREE.Color(options.color)
        },
        // @ts-ignore
        u_height: this.height,
        // @ts-ignore
        u_top: this.top
      },
      vertexShader: `
        uniform float u_top;
        uniform float u_height;

        void main() {
          float f_angle = u_height / 10.0;
          float new_x = position.x * cos(f_angle) - position.z * sin(f_angle);
          float new_y = position.y;
          float new_z = position.z * cos(f_angle) + position.x * sin(f_angle);

          vec4 v_position = vec4(new_x, new_y + u_top, new_z, 1.0);

          gl_Position = projectionMatrix * modelViewMatrix * v_position;
        }
      `,
      fragmentShader: `
        uniform vec3 u_color;
        void main() {
          gl_FragColor = vec4(u_color, 0.6);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide, // 整个圆柱体
      depthTest: false // 防止被建筑物遮挡
    })

    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.copy(<Vector3Like>options.position)
    mesh.rotateZ(Math.PI)
    this.scene.add(mesh)
  }
}
