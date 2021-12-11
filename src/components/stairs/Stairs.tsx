import { useCompoundBody } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React from 'react'
import { Mesh } from 'three'
import type { GLTF } from 'three-stdlib'
import {
    getFacesFromBufferGeometry,
    getVerticesFromBufferGeometry,
} from '../../lib/Geometry'
import { Triplet } from '../../types/3D'
import stairs from './assets/new.gltf?url'

interface StairsProps {
    position: Triplet
}

export const Stairs = ({ position }: StairsProps) => {
    const stairsModel = useGLTF(stairs)

    const meshes = findMeshes(stairsModel)
    const physicsShapes = findPhysics(stairsModel)

    const [ref, api] = useCompoundBody(() => ({
        type: 'Static',
        position,
        material: {
            friction: 10,
        },
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

    return (
        <group ref={ref}>
            {meshes.map((mesh) => (
                <mesh
                    key={mesh.name}
                    geometry={mesh.geometry}
                    rotation={mesh.rotation}
                    scale={mesh.scale}
                    position={mesh.position}
                >
                    <meshStandardMaterial color="gray" />
                </mesh>
            ))}
        </group>
    )
}

const findMeshes = (gltf: GLTF) => {
    return gltf.scene.children.filter((item) => item.type === 'Mesh') as Mesh[]
}

const findPhysics = (gltf: GLTF) => {
    // Physics shapes are inside the visual mash
    return gltf.scene.children.flatMap((obj) => obj.children) as Mesh[]
}
