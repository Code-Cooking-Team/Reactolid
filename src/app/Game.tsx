import { Something } from '+components/dev/Something'
import { GroundPlane } from '+components/ground/GroundPlane'
import { Player } from '+components/player/Player'
import { Rock } from '+components/rocks/Rock'
import { Stairs } from '+components/stairs/Stairs'
import { Devroom } from '+maps/Devroom'
import { Debug, Physics } from '@react-three/cannon'
import { OrbitControls, Stats, useHelper } from '@react-three/drei'
import React, { useRef } from 'react'
import { PointLightHelper } from 'three'
import { Box } from '../components/dev/Box'

export const Game = () => {
    const pointLightRef = useRef()

    useHelper(pointLightRef, PointLightHelper, 0.5, 'hotpink')

    return (
        <Physics>
            <Debug color="black" scale={1.1}>
                <Stats />
                <OrbitControls />

                <pointLight
                    ref={pointLightRef}
                    color="white"
                    position={[4, 4, 0]}
                    intensity={1}
                />

                {/* <Rock position={[0, 10, 0]} /> */}

                {/* <Devroom /> */}

                <Player position={[0, 10, 4]} />

                <Box position={[-1.2, 10, -30]} />
                <Box position={[-1.2, 10, -20]} />
                <Box position={[-1.2, 10, -10]} />
                <Box position={[1.2, 10, 0]} />

                <Box position={[2, 0, 4]} stationary />

                <GroundPlane position={[0, -1, 0]} />

                {/* <Stairs position={[0, 0, 5]} /> */}
                {/* {Array.from(Array(10).keys()).map((z) => (
                    <Something position={[0, z * 8 + 5, 0]} key={z} />
                ))} */}
            </Debug>
        </Physics>
    )
}
