import { Mesh } from 'three'
import { GLTF } from 'three-stdlib'

export const findMeshes = (gltf: GLTF) => {
    return gltf.scene.children.filter((item) => item.type === 'Mesh') as Mesh[]
}

export const findPhysics = (gltf: GLTF) => {
    // Physics shapes are inside the visual mash
    return gltf.scene.children.flatMap((obj) => {
        return obj.children.map((child) => {
            child.position.copy(obj.position)
            child.rotation.copy(obj.rotation)
            return child
        })
    }) as Mesh[]
}
