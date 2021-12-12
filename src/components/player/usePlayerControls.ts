import { Api } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useKeyPress } from '../../hooks/useKeypress'
import { useSubscribePhysicValue } from '../../hooks/useSubscribePhysicValue'

const V_ZERO = new Vector3(0, 0, 0)
const MOVEMENT_SPEED = 0.5
const JUMP_FORCE = 0.5

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
            // .normalize() // TODO?
            .multiplyScalar(MOVEMENT_SPEED)

        const [velX, velZ, velY] = velocityRef.current

        const mv = new Vector3(direction.x, spaceKey ? JUMP_FORCE : 0, direction.z)

        const maxVel = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2))

        // if (maxVel < 5 && !mv.equals(V_ZERO)) {
            api.applyImpulse(mv.toArray(), [0, 0, 0])
        // }
    })
}
