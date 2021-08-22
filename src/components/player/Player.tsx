import { Triplet, useCompoundBody, useSphere } from '@react-three/cannon'
import React from 'react'
import { Vector3 } from 'three'
import { BodyType, ShapeFit, ShapeType, useRigidBody } from 'use-ammojs'
import { usePlayerCamera } from './usePlayerCamera'
import { usePlayerControls } from './usePlayerControls'

interface PlayerProps {
    position: Triplet
}

export const Player = ({ position }: PlayerProps) => {
    const size = 0.5

    // const [ref, api] = useCompoundBody(() => ({
    //     mass: 1,
    //     fixedRotation: true,
    //     type: 'Dynamic',
    //     position,
    //     material: {
    //         friction: 0.01,
    //         restitution: 1000,
    //     },
    //     shapes: [
    //         {
    //             type: 'Sphere',
    //             position: [0, 0, 0],
    //             rotation: [0, 0, 0],
    //             args: [size],
    //         },
    //         {
    //             type: 'Sphere',
    //             position: [0, 1, 0],
    //             rotation: [0, 0, 0],
    //             args: [size],
    //         },
    //     ],
    // }))

    const [ref, api] = useRigidBody(() => ({
        mass: 1,
        position,
        angularFactor: new Vector3(0, 0, 0),
        angularDamping: 0,
        shapeConfig: {
            sphereRadius: size,
            // fit: ShapeFit.MANUAL,
            // halfExtents: new Vector3(0.3, 0.6, 0.3),
        },
        bodyType: BodyType.DYNAMIC,
        shapeType: ShapeType.SPHERE,
    }))

    usePlayerControls(api)
    // usePlayerCamera(api)

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
