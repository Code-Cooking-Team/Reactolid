import { Triplet } from '+types/3D'
import { Api, context } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useContext } from 'react'
import { MathUtils, Vector3 } from 'three'
import { useKeyPress } from '../../hooks/useKeypress'
import { useSubscribePhysicValue } from '../../hooks/useSubscribePhysicValue'

const V_ZERO = new Vector3(0, 0, 0)

const M = 100
const MOVEMENT_SPEED = 0.8 * M
const AIR_MOVEMENT_SPEED = 0.2 * M
const JUMP_FORCE = 5 * M

export const usePlayerControls = (api: Api[1]) => {
    const wKey = useKeyPress('w')
    const sKey = useKeyPress('s')
    const aKey = useKeyPress('a')
    const dKey = useKeyPress('d')
    const spaceKey = useKeyPress(' ')

    const velocityRef = useSubscribePhysicValue(api.velocity)
    const positionRef = useSubscribePhysicValue(api.position)

    const getRay = () => {
        const [x, y, z] = positionRef.current

        // TODO
        const fromRey: Triplet = [x + 1, y - 0, z]
        const toRey: Triplet = [x + 1, y - 0.6, z]

        return { fromRey, toRey }
    }

    const { worker, events } = useContext(context)

    const raycast = () => {
        const { fromRey, toRey } = getRay()

        return new Promise((resolve) => {
            const uuid = MathUtils.generateUUID()

            events[uuid] = {
                rayhit: (response) => {
                    resolve(response.hasHit)
                    worker.postMessage({ op: 'removeRay', uuid })
                    delete events[uuid]
                },
            }

            worker.postMessage({
                op: 'addRay',
                uuid,
                props: { mode: 'Closest', from: fromRey, to: toRey },
            })
        })
    }

    useFrame(async (_, delta) => {
        const inAir = !(await raycast())

        const jumpForce = JUMP_FORCE * delta
        const airMovementSpeed = AIR_MOVEMENT_SPEED * delta
        const movementSpeed = MOVEMENT_SPEED * delta

        const direction = new Vector3()

        const frontVector = new Vector3(0, 0, Number(sKey) - Number(wKey))
        const sideVector = new Vector3(Number(aKey) - Number(dKey), 0, 0)

        direction
            .subVectors(frontVector, sideVector)
            // .normalize() // TODO?
            .multiplyScalar(inAir ? airMovementSpeed : movementSpeed)

        const [velX, velY, velZ] = velocityRef.current

        const jumpY = spaceKey && !inAir ? jumpForce : 0

        const mv = new Vector3(direction.x, direction.y + jumpY, direction.z)

        const currVec = new Vector3(velX, velY, velZ)
        const moveVec = new Vector3().addVectors(mv, currVec)

        // const maxVel = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2))
        // maxVel < 5 &&
        if (!mv.equals(V_ZERO)) {
            api.velocity.copy(moveVec)
        }
    })

    return getRay()
}
