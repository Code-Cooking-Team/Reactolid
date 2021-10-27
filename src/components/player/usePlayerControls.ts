import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { RigidbodyApi, useAmmo } from 'use-ammojs'
import { useKeyPress } from '../../hooks/useKeypress'

const MOVEMENT_SPEED = 0.5
const JUMP_VECTOR = new Vector3(0, 0.5, 0)
const JUMP_RAY_VECTOR = new Vector3(0, -1, 0)

const ZERO = new Vector3(0, 0, 0)

export const usePlayerControls = (api: RigidbodyApi) => {
    const wKey = useKeyPress('w')
    const sKey = useKeyPress('s')
    const aKey = useKeyPress('a')
    const dKey = useKeyPress('d')
    const spaceKey = useKeyPress(' ')

    const { rayTest } = useAmmo()

    useFrame(async () => {
        const direction = new Vector3()

        const frontVector = new Vector3(0, 0, Number(sKey) - Number(wKey))
        const sideVector = new Vector3(Number(aKey) - Number(dKey), 0, 0)

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(MOVEMENT_SPEED)

        if (!direction.equals(ZERO)) {
            api.applyImpulse(direction)
        }

        if (spaceKey) {
            const from = api.getPosition()
            const to = api.getPosition().clone().add(JUMP_RAY_VECTOR)
            const hit = await rayTest({ from, to })

            if (hit.length) {
                api.applyImpulse(JUMP_VECTOR)
            }
        }
    })
}
