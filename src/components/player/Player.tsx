import { Triplet, useBox, useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useKeyPress } from '../../hooks/useKeypress'

interface PlayerProps {
    position: Triplet
}

export const Player = ({ position }: PlayerProps) => {
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        fixedRotation: true,
        position,
    }))

    const wKey = useKeyPress('w')
    const sKey = useKeyPress('s')
    const aKey = useKeyPress('a')
    const dKey = useKeyPress('d')
    const spaceKey = useKeyPress(' ')

    const velocityRef = useRef([0, 0, 0])
    const positionRef = useRef([0, 0, 0])

    useEffect(() => {
        api.velocity.subscribe((v) => (velocityRef.current = v))
        api.position.subscribe((v) => (positionRef.current = v))
    }, [])

    useFrame(({ camera }) => {
        const direction = new Vector3()

        const frontVector = new Vector3(0, 0, Number(sKey) - Number(wKey))
        const sideVector = new Vector3(Number(aKey) - Number(dKey), 0, 0)

        direction //
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(10)
        // .applyEuler(camera.rotation)

        api.velocity.set(direction.x, velocityRef.current[1], direction.z)

        if (spaceKey) {
            api.velocity.set(velocityRef.current[0], 4, velocityRef.current[2])
        }

        camera.lookAt(new Vector3(...positionRef.current!))
        camera.position.x = positionRef.current![0]
        camera.position.z = positionRef.current![2] + 10
    })

    return (
        <mesh ref={ref} scale={[1, 1.5, 1]} castShadow>
            <sphereGeometry attach="geometry" args={[1, 16, 16]} />
            <meshStandardMaterial
                attach="material"
                color="gray"
                transparent
                roughness={0.1}
                metalness={0.1}
            />
        </mesh>
    )
}
