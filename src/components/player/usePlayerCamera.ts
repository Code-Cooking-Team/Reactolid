import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { RigidbodyApi } from 'use-ammojs'

const CAMERA_SMOOTHNESS = 15

export const usePlayerCamera = (api: RigidbodyApi) => {
    useFrame(({ camera }) => {
        const pos = api.getPosition()
        const { x, y, z } = api.getPosition()

        camera.position.x += (x - camera.position.x) / CAMERA_SMOOTHNESS
        camera.position.z += (z - camera.position.z + 10) / CAMERA_SMOOTHNESS

        camera.lookAt(x, y, z)
    })
}
