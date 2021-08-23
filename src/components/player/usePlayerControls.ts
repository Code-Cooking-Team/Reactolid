import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { RigidbodyApi } from 'use-ammojs'
import { useKeyPress } from '../../hooks/useKeypress'

const MOVEMENT_SPEED = 0.5
const JUMP_FORCE = 1

export const usePlayerControls = (api: RigidbodyApi) => {
    const wKey = useKeyPress('w')
    const sKey = useKeyPress('s')
    const aKey = useKeyPress('a')
    const dKey = useKeyPress('d')
    const spaceKey = useKeyPress(' ')

    useFrame(() => {
        const direction = new Vector3()

        const frontVector = new Vector3(0, 0, Number(sKey) - Number(wKey))
        const sideVector = new Vector3(Number(aKey) - Number(dKey), 0, 0)

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(MOVEMENT_SPEED)

        api.applyImpulse(direction)

        if (spaceKey) {
            api.applyImpulse(new Vector3(0, JUMP_FORCE, 0))
        }
    })
}
