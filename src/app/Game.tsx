import { Line, Stats, useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { PointLightHelper, Vector3 } from 'three'
import { Physics, PhysicsStats, useAmmo } from 'use-ammojs'
import { Box } from '../components/dev/Box'
import { Ground3DTest } from '../components/ground/Ground3DTest'
import { GroundPlane } from '../components/ground/GroundPlane'
import { Player } from '../components/player/Player'

export const Game = () => {
    const pointLightRef = useRef()

    useHelper(pointLightRef, PointLightHelper, 0.5, 'hotpink')

    return (
        <Physics>
            <Stats />
            <PhysicsStats top={50} />
            <pointLight
                ref={pointLightRef}
                color="white"
                position={[4, 4, 0]}
                intensity={1}
            />

            <Box position={[-1.2, 1, 0]} />
            <Box position={[1.2, 1, 0]} />

            <Box position={[-6, 4, -6]} />

            <Box position={[2, 0, 4]} stationary />

            <Player position={[15, 7, -5]} />

            <GroundPlane position={[0, -1, 0]} />

            {/* <OrbitControls /> */}

            <Ground3DTest />
        </Physics>
    )
}
