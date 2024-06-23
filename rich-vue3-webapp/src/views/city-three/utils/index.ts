import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js"

const fbxLoader = new FBXLoader()

export const loadFBX = (url: string) => {
  return new Promise((resolve, reject) => {
    // 加载城市模型
    fbxLoader.load(
      url,
      (object) => {
        resolve(object)
      },
      () => {},
      (error) => {
        reject(error)
      }
    )
  })
}
