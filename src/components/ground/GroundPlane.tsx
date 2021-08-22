import { Triplet, usePlane } from '@react-three/cannon'
import React from 'react'
import { BodyType, ShapeType, useRigidBody } from 'use-ammojs'

interface GroundPlaneProps {
    position: Triplet
}

export const GroundPlane = ({ position }: GroundPlaneProps) => {
    // const [ref] = user(() => ({ rotation: [-Math.PI / 2, 0, 0], position }))

    const [ref] = useRigidBody(() => ({
        mass: 1,
        position,
        bodyType: BodyType.STATIC,
        shapeType: ShapeType.BOX,
    }))

    return (
        <mesh ref={ref} rotation-x={-Math.PI / 2} position={position}>
            <boxGeometry args={[20, 20, 0.1]} />
            <meshStandardMaterial color="darkgreen" />
        </mesh>
    )
}
