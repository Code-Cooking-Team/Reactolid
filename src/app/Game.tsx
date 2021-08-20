import { Physics } from '@react-three/cannon'
import { useHelper } from '@react-three/drei'
import React, { useRef } from 'react'
import { PointLightHelper } from 'three'
import { Box } from '../components/dev/Box'
import { GroundPlane } from '../components/ground/GroundPlane'
import { Player } from '../components/player/Player'

export const Game = () => {
    const pointLightRef = useRef()

    useHelper(pointLightRef, PointLightHelper, 0.5, 'hotpink')

    return (
        <Physics>
            <pointLight
                ref={pointLightRef}
                color="white"
                position={[4, 4, 0]}
                intensity={1}
            />

            <Box position={[-1.2, 1, 0]} />
            <Box position={[1.2, 1, 0]} />

            <Player position={[0, 1, 2]} />

            <GroundPlane position={[0, -1, 0]} />
        </Physics>
    )
}
