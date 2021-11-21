import { Api } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useSubscribePhysicValue } from '../../hooks/useSubscribePhysicValue'

const CAMERA_SMOOTHNESS = 15

export const usePlayerCamera = (api: Api[1]) => {
    const positionRef = useSubscribePhysicValue(api.position)

    useFrame(({ camera }) => {
        const [posX, posY, posZ] = positionRef.current

        camera.position.x += (posX - camera.position.x) / CAMERA_SMOOTHNESS
        camera.position.z += (posZ - camera.position.z + 5) / CAMERA_SMOOTHNESS

        camera.lookAt(new Vector3(posX, posY, posZ))
    })
}
