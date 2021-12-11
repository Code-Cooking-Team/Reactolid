import { Debug, Physics } from '@react-three/cannon'
import { Stats, useHelper } from '@react-three/drei'
import React, { useRef } from 'react'
import { PointLightHelper } from 'three'
import { Box } from '../components/dev/Box'
import { Ground3DTest } from '../components/ground/Ground3DTest'
import { GroundPlane } from '../components/ground/GroundPlane'
import { Player } from '../components/player/Player'
import { Stairs } from '../components/stairs/Stairs'

export const Game = () => {
    const pointLightRef = useRef()

    useHelper(pointLightRef, PointLightHelper, 0.5, 'hotpink')

    return (
        <Physics>
            <Debug color="black" scale={1.1}>
                <Stats />
                <pointLight
                    ref={pointLightRef}
                    color="white"
                    position={[4, 4, 0]}
                    intensity={1}
                />

                <Box position={[-1.2, 10, 0]} />
                <Box position={[1.2, 10, 0]} />

                <Box position={[2, 0, 4]} stationary />

                <Player position={[0, 5, 4]} />

                <GroundPlane position={[0, -1, 0]} />

                <Stairs position={[0, 0, 5]} />
                {/* {Array.from(Array(10).keys()).map((z) => (
                    <Stairs key={z} position={[0, 0, z * 5]} />
                ))} */}
            </Debug>
        </Physics>
    )
}
