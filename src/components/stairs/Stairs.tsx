import { useMeshBody } from '+hooks/useMeshBody'
import { findMeshes } from '+lib/GLTF'
import { Triplet } from '+types/3D'
import { useGLTF } from '@react-three/drei'
import React from 'react'
import stairs from './assets/new.gltf?url'

interface StairsProps {
    position: Triplet
}

export const Stairs = ({ position }: StairsProps) => {
    const stairsModel = useGLTF(stairs)

    const meshes = findMeshes(stairsModel)

    const [ref] = useMeshBody({
        gltf: stairsModel,
        position,
        material: {
            friction: 10,
        },
    })

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
