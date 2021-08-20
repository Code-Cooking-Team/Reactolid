import { Triplet, useSphere } from '@react-three/cannon'
import React from 'react'
import { usePlayerCamera } from './usePlayerCamera'
import { usePlayerControls } from './usePlayerControls'

interface PlayerProps {
    position: Triplet
}

export const Player = ({ position }: PlayerProps) => {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        fixedRotation: true,
        position,
    }))

    usePlayerControls(api)
    usePlayerCamera(api)

    return (
        <mesh ref={ref} scale={[1, 1.5, 1]} castShadow>
            <sphereGeometry attach="geometry" args={[1, 16, 16]} />
            <meshStandardMaterial
                attach="material"
                color="gray"
                transparent
                roughness={0.1}
                metalness={0.1}
            />
        </mesh>
    )
}
