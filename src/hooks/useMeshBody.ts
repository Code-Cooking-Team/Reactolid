import { findPhysics } from '+lib/GLTF'
import { BodyProps, useCompoundBody } from '@react-three/cannon'
import { useMemo } from 'react'
import { Mesh } from 'three'
import type { GLTF } from 'three-stdlib'
import {
    getFacesFromBufferGeometry,
    getVerticesFromBufferGeometry,
} from '../lib/Geometry'

interface Options extends BodyProps {
    gltf: GLTF
}

export const useMeshBody = ({ gltf, ...rest }: Options) => {
    const physicsShapes = useMemo(() => findPhysics(gltf), [gltf])

    return useCompoundBody(() => ({
        ...rest,
        shapes: physicsShapes.map((shape) => {
            return {
                type: 'ConvexPolyhedron',
                position: shape.position.toArray(),
                rotation: shape.rotation.toArray(),
                args: [
                    getVerticesFromBufferGeometry(shape.geometry),
                    getFacesFromBufferGeometry(shape.geometry),
                ],
            }
        }),
    }))
}
