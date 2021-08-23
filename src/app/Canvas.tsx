import { MapControls } from '@react-three/drei'
import { Canvas as R3FCanvas } from '@react-three/fiber'
import React, { ReactNode, Suspense } from 'react'
import { useKeyPress } from '../hooks/useKeypress'

interface CanvasProps {
    children?: ReactNode
}

export const Canvas = ({ children }: CanvasProps) => {
    const dot = useKeyPress('.')

    return (
        <R3FCanvas camera={{ position: [0, 10, 10], zoom: 1.2 }}>
            <Suspense fallback={null}>
                <ambientLight />
                <gridHelper />
                <axesHelper />

                {dot && <CameraControls enablePan enableZoom enableRotate />}

                {children}
            </Suspense>
        </R3FCanvas>
    )
}

// TODO
const CameraControls = MapControls as any
