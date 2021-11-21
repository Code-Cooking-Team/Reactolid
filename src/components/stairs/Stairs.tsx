import { Triplet, useCompoundBody } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React from 'react'
import { BufferGeometry, Mesh, ParametricGeometry, Vector3 } from 'three'
import type { GLTF } from 'three-stdlib'
import { Geometry } from '../../lib/Geometry'
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
            const obj = new Geometry().fromBufferGeometry(shape.geometry)

            obj.mergeVertices()

            return {
                type: 'ConvexPolyhedron',
                position: shape.position.toArray(),
                rotation: shape.rotation.toArray(),
                args: [
                    obj.vertices.map((v) => v.toArray()),
                    obj.faces.map((v) => v.toArray()),
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

const findMeshes = (gltf: GLTF) =>
    gltf.scene.children.filter((item) => item.type === 'Mesh') as Mesh[]

const findPhysics = (gltf: GLTF) => {
    const physicsMeshes = gltf.scene.children.flatMap((obj) => obj.children)

    return physicsMeshes as Mesh[]
}
