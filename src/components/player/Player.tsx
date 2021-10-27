import { Triplet } from '@react-three/cannon'
import React from 'react'
import { Vector3 } from 'three'
import { BodyType, ShapeType, useRigidBody } from 'use-ammojs'
import { usePlayerCamera } from './usePlayerCamera'
import { usePlayerControls } from './usePlayerControls'

interface PlayerProps {
    position: Triplet
}

export const Player = ({ position }: PlayerProps) => {
    const size = 0.5

    const [ref, api] = useRigidBody(() => ({
        shapeType: ShapeType.SPHERE,
        bodyType: BodyType.DYNAMIC,
        mass: 1,
        position,
        angularFactor: new Vector3(0, 0, 0),
        shapeConfig: {
            sphereRadius: size,
        },
    }))

    usePlayerControls(api)
    usePlayerCamera(api)

    return (
        <mesh ref={ref} scale={[1, 1, 1]}>
            <sphereGeometry attach="geometry" args={[size, 16, 16]} />
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
