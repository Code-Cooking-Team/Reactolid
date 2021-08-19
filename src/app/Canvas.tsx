import { OrbitControls } from '@react-three/drei'
import { Canvas as R3FCanvas } from '@react-three/fiber'
import React, { ReactNode } from 'react'

interface CanvasProps {
    children?: ReactNode
}

export const Canvas = ({ children }: CanvasProps) => {
    return (
        <R3FCanvas camera={{ position: [0, 10, 10], zoom: 1.2 }}>
            <ambientLight />
            <gridHelper />
            <axesHelper />

            <OrbitControlsAny enablePan enableZoom enableRotate />

            {children}
        </R3FCanvas>
    )
}

// TODO
const OrbitControlsAny = OrbitControls as any
