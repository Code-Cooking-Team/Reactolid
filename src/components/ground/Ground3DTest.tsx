import { useGLTF } from '@react-three/drei'
import React from 'react'
import { BodyType, ShapeType, useRigidBody } from 'use-ammojs'
import ground from './assets/ground.glb?url'

interface Ground3DTestProps {}

export const Ground3DTest = ({}: Ground3DTestProps) => {
    const groundModel = useGLTF(ground)

    const gltf = groundModel as any

    const { geometry } = gltf.nodes.Plane

    const [ref] = useRigidBody(() => ({
        shapeType: ShapeType.MESH,
        type: BodyType.STATIC,
    }))

    return (
        <mesh ref={ref} geometry={geometry}>
            <meshStandardMaterial color="darkgreen" />
        </mesh>
    )
}
