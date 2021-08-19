import { useHelper } from '@react-three/drei'
import React, { useRef } from 'react'
import { PointLightHelper } from 'three'
import { Box } from '../components/dev/Box'

export const Game = () => {
    const pointLight = useRef()

    useHelper(pointLight, PointLightHelper, 0.5, 'hotpink')

    return (
        <>
            <pointLight
                ref={pointLight}
                color="white"
                position={[4, 4, 0]}
                intensity={5}
            />

            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </>
    )
}
