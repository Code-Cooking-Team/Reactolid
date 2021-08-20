import { WorkerApi } from '@react-three/cannon'
import { useEffect, useRef } from 'react'

type CannonWorker = WorkerApi['position'] // unexposed WorkerVec type…

export const useSubscribePhysicValue = (worker: CannonWorker, initial = [0, 0, 0]) => {
    const ref = useRef(initial)

    useEffect(() => {
        return worker.subscribe((value) => (ref.current = value))
    }, [])

    return ref
}
