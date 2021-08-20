import { useTrimesh } from '@react-three/cannon'
import { useGLTF } from '@react-three/drei'
import React from 'react'
import ground from './assets/ground.glb?url'

interface Ground3DTestProps {}

export const Ground3DTest = ({}: Ground3DTestProps) => {
    const groundModel = useGLTF(ground)

    const gltf = groundModel as any

    const { geometry } = gltf.nodes.Plane

    const vertices = geometry.attributes.position.array
    const indices = geometry.index.array

    const [ref] = useTrimesh(() => ({
        type: 'Static',
        mass: 0,
        args: [vertices, indices],
        material: {
            friction: 0.01,
        },
    }))

    return (
        <mesh ref={ref} geometry={geometry}>
            <meshStandardMaterial color="darkgreen" />
        </mesh>
    )
}
