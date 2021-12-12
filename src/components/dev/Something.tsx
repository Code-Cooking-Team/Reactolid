import { Triplet, useCompoundBody } from '@react-three/cannon'
import React from 'react'

interface PlayerProps {
    position: Triplet
}

const size = 0.5

export const Something = ({ position }: PlayerProps) => {
    const [ref, api] = useCompoundBody(() => ({
        mass: 1,
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
            {
                type: 'Sphere',
                position: [1, 1, 0],
                rotation: [0, 0, 0],
                args: [size],
            },
        ],
    }))

    return (
        <mesh ref={ref} castShadow>
            <sphereGeometry attach="geometry" args={[size, 16, 16]} />
            <meshStandardMaterial
                attach="material"
                color="white"
                transparent
                roughness={0.1}
                metalness={0.1}
            />
        </mesh>
    )
}
