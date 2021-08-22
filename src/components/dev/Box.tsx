import { Triplet } from '@react-three/cannon'
import React from 'react'
import { BodyType, ShapeType, useRigidBody } from 'use-ammojs'

interface BoxProps {
    position: Triplet
    stationary?: boolean
}

export const Box = ({ position, stationary }: BoxProps) => {
    const [ref] = useRigidBody(() => ({
        mass: 1,
        position,
        bodyType: stationary ? BodyType.STATIC : BodyType.DYNAMIC,
        shapeType: ShapeType.BOX,
    }))

    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={stationary ? 'gray' : 'orange'} />
        </mesh>
    )
}
