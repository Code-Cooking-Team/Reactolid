import { Triplet, useBox } from '@react-three/cannon'
import React from 'react'

interface BoxProps {
    position: Triplet
    stationary?: boolean
}

export const Box = ({ position, stationary }: BoxProps) => {
    const [ref] = useBox(() => ({
        type: stationary ? 'Static' : 'Dynamic',
        mass: 1,
        position,
        // args: [1, 2, 3],
    }))

    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={stationary ? 'gray' : 'orange'} />
        </mesh>
    )
}
