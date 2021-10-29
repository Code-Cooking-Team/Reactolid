import { Triplet, useCompoundBody } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React from 'react'
import { Mesh } from 'three'
import type { GLTF } from 'three-stdlib'
import stairs from './assets/stairs.gltf?url'

interface StairsProps {
    position: Triplet
}

export const Stairs = ({ position }: StairsProps) => {
    const stairsModel = useGLTF(stairs)

    const meshes = findMeshes(stairsModel)
    const empties = findEmpties(stairsModel)

    const [ref, api] = useCompoundBody(() => ({
        type: 'Static',
        position,
        material: {
            friction: 10,
        },
        shapes: empties.map((box) => ({
            type: 'Box',
            position: box.position.toArray(),
            rotation: box.rotation.toArray(),
            args: box.scale.toArray().map((v) => Math.abs(v * 2)),
        })),
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
                    <meshStandardMaterial color="darkgreen" />
                </mesh>
            ))}
        </group>
    )
}

const findMeshes = (gltf: GLTF) =>
    gltf.scene.children.filter((item) => item.type === 'Mesh') as Mesh[]

const findEmpties = (gltf: GLTF) =>
    gltf.scene.children.filter((item) => item.name.startsWith('Empty'))
