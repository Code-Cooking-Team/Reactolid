import { Api } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'

const CAMERA_SMOOTHNESS = 15

export const usePlayerCamera = (api: Api[1]) => {
    const positionRef = useRef([0, 0, 0])

    useEffect(() => {
        api.position.subscribe((v) => (positionRef.current = v))
    }, [])

    useFrame(({ camera }) => {
        const [posX, posY, posZ] = positionRef.current

        camera.position.x += (posX - camera.position.x) / CAMERA_SMOOTHNESS
        camera.position.z += (posZ - camera.position.z + 10) / CAMERA_SMOOTHNESS

        camera.lookAt(new Vector3(posX, posY, posZ))
    })
}
