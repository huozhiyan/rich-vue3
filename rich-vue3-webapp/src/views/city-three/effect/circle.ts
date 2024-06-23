import { Cylinder } from "@/views/city-three/effect/cylinder"
import { color } from "@/views/city-three/config"

interface configOption {
  radius: number
  height: number
  open: boolean
  color: string
  opacity: number
  position: object
  speed: number
}

export class Circle {
  private readonly config: configOption

  constructor(scene: any, time: object) {
    this.config = {
      radius: 50,
      height: 1,
      open: false,
      color: color.circle,
      opacity: 0.6,
      position: {
        x: 300,
        y: 0,
        z: 300
      },
      speed: 2.0
    }
    new Cylinder(scene, time).createCylinder(this.config)
  }
}
