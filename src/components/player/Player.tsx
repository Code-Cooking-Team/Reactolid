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
        mass: 1,
        position,
        angularFactor: new Vector3(0, 0, 0),
        angularDamping: 0,
        // emitCollisionEvents: true,
        shapeConfig: {
            sphereRadius: size,
        },
        bodyType: BodyType.DYNAMIC,
        shapeType: ShapeType.SPHERE,
    }))

    usePlayerControls(api)
    usePlayerCamera(api)

    return (
        <mesh ref={ref} scale={[1, 2, 1]} castShadow>
            <sphereGeometry attach="geometry" args={[size, 16, 16]} />
            <meshStandardMaterial
                attach="material"
                color="gray"
                transparent
                roughness={0.1}
                metalness={0.1}
                // wireframe
            />
        </mesh>
    )
}
