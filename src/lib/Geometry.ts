import { Triplet } from '+types/3D'
import { BufferGeometry, Vector3 } from 'three'

/* Two functions extracted from old ThreeJS Geometry class */

export const getVerticesFromBufferGeometry = (geometry: BufferGeometry): Triplet[] => {
    const result: Triplet[] = []

    for (let index = 0; index < geometry.attributes.position.count; index++) {
        const vert = new Vector3().fromBufferAttribute(
            geometry.attributes.position,
            index,
        )
        result.push(vert.toArray())
    }

    return result
}

export const getFacesFromBufferGeometry = (geometry: BufferGeometry): Triplet[] => {
    if (geometry.attributes.position === undefined) {
        throw Error(
            '[getFacesFromBufferGeometry]: Position attribute required for conversion',
        )
    }

    const result: Triplet[] = []

    const addFace = (a: number, b: number, c: number) => {
        result.push([a, b, c])
    }

    const index = geometry.index !== null ? geometry.index : undefined

    if (geometry.groups.length > 0) {
        for (let i = 0; i < geometry.groups.length; i++) {
            const group = geometry.groups[i]

            const start = group.start
            const count = group.count

            for (let j = start, jl = start + count; j < jl; j += 3) {
                if (index !== undefined) {
                    addFace(index.getX(j), index.getX(j + 1), index.getX(j + 2))
                } else {
                    addFace(j, j + 1, j + 2)
                }
            }
        }
    } else {
        if (index !== undefined) {
            for (let i = 0; i < index.count; i += 3) {
                addFace(index.getX(i), index.getX(i + 1), index.getX(i + 2))
            }
        } else {
            for (let i = 0; i < geometry.attributes.position.count; i += 3) {
                addFace(i, i + 1, i + 2)
            }
        }
    }

    return result
}
