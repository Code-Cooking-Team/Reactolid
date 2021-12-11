import { useMeshBody } from '+hooks/useMeshBody'
import { findMeshes } from '+lib/GLTF'
import { useGLTF } from '@react-three/drei'
import React, { useMemo } from 'react'
import gltfUrl from './devroom.gltf?url'

export function Devroom({ ...props }: JSX.IntrinsicElements['group']) {
    const gltf = useGLTF(gltfUrl)
    const meshes = useMemo(() => findMeshes(gltf), [gltf])

    const [ref] = useMeshBody({ gltf })

    return (
        <group ref={ref}>
            {meshes.map((mesh) => (
                <mesh
                    key={mesh.name}
                    geometry={mesh.geometry}
                    rotation={mesh.rotation}
                    scale={mesh.scale}
                    position={mesh.position}
                    material={mesh.material}
                />
            ))}
        </group>
    )
}
