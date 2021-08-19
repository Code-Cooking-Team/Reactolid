import { useFrame, Vector3 } from '@react-three/fiber'
import React, { useRef, useState } from 'react'

interface BoxProps {
    position: Vector3
}

export const Box = ({ position }: BoxProps) => {
    const ref = useRef<any>()
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    useFrame(() => {
        ref.current.rotation.y += 0.01
    })

    return (
        <mesh
            ref={ref}
            position={position}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}
