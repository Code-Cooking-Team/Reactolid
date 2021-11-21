import { Triplet, usePlane } from '@react-three/cannon'
import React from 'react'

interface GroundPlaneProps {
    position: Triplet
}

export const GroundPlane = ({ position }: GroundPlaneProps) => {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position,
        material: {
            friction: 0.4,
        },
    }))

    return (
        <mesh ref={ref} rotation-x={-Math.PI / 2} position={position}>
            <planeBufferGeometry args={[10, 10]} />
            <meshStandardMaterial color="darkgreen" />
        </mesh>
    )
}
