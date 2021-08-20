import { Api } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { useKeyPress } from '../../hooks/useKeypress'
import { useSubscribePhysicValue } from '../../hooks/useSubscribePhysicValue'

const CAMERA_SMOOTHNESS = 15
const MOVEMENT_SPEED = 10
const JUMP_FORCE = 4

export const usePlayerControls = (api: Api[1]) => {
    const wKey = useKeyPress('w')
    const sKey = useKeyPress('s')
    const aKey = useKeyPress('a')
    const dKey = useKeyPress('d')
    const spaceKey = useKeyPress(' ')

    const velocityRef = useSubscribePhysicValue(api.velocity)

    useFrame(() => {
        const direction = new Vector3()

        const frontVector = new Vector3(0, 0, Number(sKey) - Number(wKey))
        const sideVector = new Vector3(Number(aKey) - Number(dKey), 0, 0)

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(MOVEMENT_SPEED)

        const [velX, velY, velZ] = velocityRef.current

        api.velocity.set(direction.x, velY, direction.z)

        if (spaceKey) {
            api.velocity.set(velX, JUMP_FORCE, velZ)
        }
    })
}
