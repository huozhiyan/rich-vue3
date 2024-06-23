import * as THREE from "three"
import { color } from "@/views/city-three/config"
import { Vector3 } from "three"

interface Point3D {
  x: number
  y: number
  z: number
}

interface FlyOptions {
  source: Point3D
  target: Point3D
  range: number
  height: number
  color: string
  size: number
}

export class Fly {
  private scene: any
  private readonly time: object
  private readonly flyOptions: FlyOptions
  constructor(scene: any, time: object) {
    this.scene = scene
    this.time = time

    this.flyOptions = {
      // 起始点
      source: {
        x: 300,
        y: 0,
        z: -200
      },
      // 终止点
      target: {
        x: -500,
        y: 0,
        z: -240
      },
      // 飞线长度
      range: 200,
      // 高度
      height: 300,
      color: color.fly,
      size: 30
    }

    this.createFly(this.flyOptions)
  }

  createFly(options: FlyOptions) {
    // 起始点
    const source = new THREE.Vector3(options.source.x, options.source.y, options.source.z)
    // 终止点
    const target = new THREE.Vector3(options.target.x, options.target.y, options.target.z)

    // 通过起始点和终止点计算中心位置
    // v - 朝着进行插值的Vector3，alpha - 插值因数，其范围通常在 [0, 1] 闭区间
    // 在该向量与传入的向量v之间的线性插值，alpha是沿着线的长度的百分比 —— alpha = 0 时表示的是当前向量，alpha = 1 时表示的是所传入的向量v
    const center: Vector3 = target.clone().lerp(source, 0.5)
    // 设置中心位置的高度
    center.y += options.height

    // 起点到终点的距离
    const len = parseInt(String(source.distanceTo(target)))

    // 贝塞尔曲线运动
    const curve = new THREE.QuadraticBezierCurve3(source, center, target)

    // 获取粒子
    const points = curve.getPoints(len)

    const positions: Array<number> = []
    const aPositions: Array<number> = []

    points.forEach((item: Vector3, index: number) => {
      positions.push(item.x, item.y, item.z)
      aPositions.push(index)
    })

    const geometry = new THREE.BufferGeometry()

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute("a_position", new THREE.Float32BufferAttribute(aPositions, 1))

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_color: {
          value: new THREE.Color(options.color)
        },
        u_range: {
          value: options.range
        },
        u_size: {
          value: options.size
        },
        u_total: {
          value: len
        },
        // @ts-ignore
        u_time: this.time
      },
      vertexShader: `
        attribute float a_position;

        uniform float u_time;
        uniform float u_size;
        uniform float u_range;
        uniform float u_total;

        varying float v_opacity;

        void main() {
          float size = u_size;
          // 粒子总数
          float total_number = u_total * mod(u_time, 1.0);

          if (total_number > a_position && total_number < a_position + u_range) {
            // 实现拖尾效果
            float index = (a_position + u_range - total_number) / u_range;
            size *= index;
            v_opacity = 1.0;
          } else {
            v_opacity = 0.0;
          }

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size / 10.0;
        }
      `,
      fragmentShader: `
        uniform vec3 u_color;
        varying float v_opacity;

        void main() {
          gl_FragColor = vec4(u_color, v_opacity);
        }
      `,
      transparent: true
    })

    const point = new THREE.Points(geometry, material)
    this.scene.add(point)
  }
}
