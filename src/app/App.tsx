import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { Box } from '../components/dev/Box'

export const App = () => {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            <OrbitControlsAny enablePan enableZoom enableRotate />
        </Canvas>
    )
}

// TODO
const OrbitControlsAny = OrbitControls as any
