import { Triplet, useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'

interface BoxProps {
    position: Triplet
}

export const Box = ({ position }: BoxProps) => {
    const [ref] = useBox(() => ({ mass: 1, position }))

    return (
        <mesh ref={ref} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    )
}
