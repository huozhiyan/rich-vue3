import * as THREE from "three"
import { color } from "../config"

export class SurroundLine {
  private scene: any
  private child: any
  private readonly height: object
  private readonly time: object
  constructor(scene: any, child: any, height: object, time: object) {
    this.scene = scene
    this.child = child
    this.height = height
    this.time = time

    this.createMesh()

    // 创建外围线条
    this.createLine()
  }

  computedMesh() {
    // 计算边界盒（对象的轴对齐边界框）
    this.child.geometry.computeBoundingBox()
    // 计算边界球（包含对象所有顶点的最小球体）
    this.child.geometry.computeBoundingSphere()
  }

  createMesh() {
    this.computedMesh()
    const { min, max } = this.child.geometry.boundingBox

    // 高度差
    const size: number = max.z - min.z

    const material = new THREE.ShaderMaterial({
      uniforms: {
        // 当前扫描的高度
        // @ts-ignore
        u_height: this.height,
        // 扫描线条的颜色
        u_up_color: {
          value: new THREE.Color(color.risingColor)
        },
        u_city_color: {
          // 模型颜色 最底部显示的颜色
          value: new THREE.Color(color.mesh)
        },
        u_head_color: {
          // 头部颜色 最顶部显示的颜色
          value: new THREE.Color(color.head)
        },
        u_size: {
          // 高度差
          value: size
        },
        // @ts-ignore
        u_time: this.time
      },
      // 顶点着色器
      vertexShader: `
        uniform float u_time;
        varying vec3 v_position;

        void main() {
          float uMax = 4.0;
          v_position = position;

          // 变化的比例
          float rate = u_time / uMax * 2.0;

          // 边界条件
          if (rate > 1.0) {
            rate = 1.0;
          }

          float z = position.z * rate;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
        }
      `,
      // 片元着色器，处理模型颜色
      fragmentShader: `
        varying vec3 v_position;

        uniform vec3 u_city_color;
        uniform vec3 u_head_color;
        uniform float u_size;

        uniform vec3 u_up_color;
        uniform float u_height;

        void main() {
          vec3 base_color = u_city_color;
          base_color = mix(base_color, u_head_color, v_position.z / u_size);

          // 上升线条的高度
          if (u_height > v_position.z && u_height < v_position.z + 6.0) {
            // 添加模糊效果
            float f_index = (u_height - v_position.z) / 3.0;
            base_color = mix(u_up_color, base_color, abs(f_index - 1.0));
          }

          gl_FragColor = vec4(base_color, 1.0);
        }
      `
    })
    const mesh = new THREE.Mesh(this.child.geometry, material)

    // 让 mesh 继承 child 的旋转、缩放、平移
    mesh.position.copy(this.child.position)
    mesh.rotation.copy(this.child.rotation)
    mesh.scale.copy(this.child.scale)

    // 把 mesh 添加到场景中
    this.scene.add(mesh)
  }

  createLine() {
    // 获取建筑物的外围
    const geometry = new THREE.EdgesGeometry(this.child.geometry)
    // api 创建材质
    // const material = new THREE.LineBasicMaterial({ color: color.soundLine })

    const { max, min } = this.child.geometry.boundingBox
    // 自定义线条渲染
    const material = new THREE.ShaderMaterial({
      uniforms: {
        line_color: {
          value: new THREE.Color(color.soundLine)
        },
        // @ts-ignore 一个不断变化的值。u_time
        u_time: this.time,
        // 扫描的位置
        u_max: {
          value: max
        },
        u_min: {
          value: min
        },
        // 扫描的颜色
        live_color: {
          value: new THREE.Color(color.liveColor)
        }
      },
      vertexShader: `
        uniform float u_time;
        uniform vec3 live_color;
        uniform vec3 line_color;
        uniform vec3 u_max;
        uniform vec3 u_min;

        varying vec3 v_color;

        void main() {
          float uMax = 4.0;

          // 变化的比例
          float rate = u_time / uMax * 2.0;

          // 边界条件
          if (rate > 1.0) {
            rate = 1.0;
          }

          float z = position.z * rate;

          float new_time = mod(u_time * 0.1, 1.0);
          // 扫描的位置
          float rangeY = mix(u_min.y, u_max.y, new_time);

          // 当前在这个区间内，显示扫描光带
          if (rangeY < position.y && rangeY > position.y - 200.0) {
            float f_index = 1.0 - sin((position.y - rangeY) / 200.0 * 3.14);
            float r = mix(live_color.r, line_color.r, f_index);
            float g = mix(live_color.g, line_color.g, f_index);
            float b = mix(live_color.b, line_color.b, f_index);

            v_color = vec3(r, g, b);
          } else {
            v_color = line_color;
          }

          gl_Position = projectionMatrix * modelViewMatrix * vec4(vec2(position), z, 1.0);
        }
       `,
      fragmentShader: `
        varying vec3 v_color;

        void main() {
          gl_FragColor = vec4(v_color, 1.0);
        }
      `
    })

    // 创建线条
    const line = new THREE.LineSegments(geometry, material)

    line.scale.copy(this.child.scale)
    line.rotation.copy(this.child.rotation)
    line.position.copy(this.child.position)

    this.scene.add(line)
  }
}
