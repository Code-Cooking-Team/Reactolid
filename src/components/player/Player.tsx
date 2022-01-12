import { Triplet, useCompoundBody } from '@react-three/cannon'
import { Line } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import React, { useMemo } from 'react'
import { BufferGeometry, Vector3 } from 'three'
import { usePlayerCamera } from './usePlayerCamera'
import { usePlayerControls } from './usePlayerControls'

interface PlayerProps {
    position: Triplet
}

const size = 0.5

export const Player = ({ position }: PlayerProps) => {
    const [ref, api] = useCompoundBody(() => ({
        mass: 1,
        fixedRotation: true,
        type: 'Dynamic',
        position,
        material: {
            friction: 0.15,
        },
        shapes: [
            {
                type: 'Sphere',
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                args: [size],
            },
            {
                type: 'Sphere',
                position: [0, 1, 0],
                rotation: [0, 0, 0],
                args: [size],
            },
        ],
    }))

    const { fromRey, toRey } = usePlayerControls(api)
    usePlayerCamera(api)

    return (
        <>
            <Line points={[fromRey, toRey]} color="red" />
            <mesh ref={ref} castShadow>
                <sphereGeometry attach="geometry" args={[size, 16, 16]} />
                <meshStandardMaterial
                    attach="material"
                    color="gray"
                    transparent
                    roughness={0.1}
                    metalness={0.1}
                />
            </mesh>
        </>
    )
}
