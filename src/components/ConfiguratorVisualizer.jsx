import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const ConfiguratorVisualizer = ({ slots }) => {
    const SlotModel = ({ url }) => {
        const gltf = useGLTF(url)

        useEffect(() => {
            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({ color: 'orange' })
                    // Opcional: eliminar texturas si da errores
                    child.material.map = null
                }
            })
        }, [gltf])

        return <primitive object={gltf.scene} position={[0, -1, 0]} />
    }

    return (
        <div>
            <Canvas style={{ background: '#FFFF' }} camera={{ position: [2, 2, 2] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />

                {slots.map((slot, i) =>
                    slot.files.length > 0 && slot.slot !== '' ? (
                        <SlotModel key={`${slot.slot}-${i}`} url={slot.files[0]} />
                    ) : null
                )}

                <OrbitControls />
            </Canvas>
        </div>
    )
}
