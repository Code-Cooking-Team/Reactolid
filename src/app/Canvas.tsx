import { MapControls } from '@react-three/drei'
import { Canvas as R3FCanvas } from '@react-three/fiber'
import React, { ReactNode, useRef } from 'react'

interface CanvasProps {
    children?: ReactNode
}

export const Canvas = ({ children }: CanvasProps) => {
    const ref = useRef(null)
    return (
        <R3FCanvas camera={{ position: [0, 10, 10], zoom: 1.2 }}>
            <ambientLight />
            <gridHelper />
            <axesHelper />

            {/* <CameraControls enablePan enableZoom enableRotate /> */}

            {children}
        </R3FCanvas>
    )
}

// TODO
const CameraControls = MapControls as any
