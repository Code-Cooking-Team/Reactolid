import { Api } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3 } from 'three'
import { RigidbodyApi } from 'use-ammojs'
import { useKeyPress } from '../../hooks/useKeypress'
import { useSubscribePhysicValue } from '../../hooks/useSubscribePhysicValue'

const MOVEMENT_SPEED = 1
const JUMP_FORCE = 4

export const usePlayerControls = (api: RigidbodyApi) => {
    const wKey = useKeyPress('w')
    const sKey = useKeyPress('s')
    const aKey = useKeyPress('a')
    const dKey = useKeyPress('d')
    const spaceKey = useKeyPress(' ')

    // const velocityRef = useSubscribePhysicValue(api.velocity)

    useFrame(() => {
        const direction = new Vector3()

        const frontVector = new Vector3(0, 0, Number(sKey) - Number(wKey))
        const sideVector = new Vector3(Number(aKey) - Number(dKey), 0, 0)

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(MOVEMENT_SPEED)

        // const [velX, velY, velZ] = api. velocityRef.current

        api.applyImpulse(direction)
        // api.velocity.set(direction.x, velY, direction.z)

        if (spaceKey) {
            api.applyImpulse(new Vector3(0, JUMP_FORCE, 0))
            // api.velocity.set(velX, JUMP_FORCE, velZ)
        }
    })
}
