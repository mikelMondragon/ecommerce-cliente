import React from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'


export const Model = ({ model, visible = true }) => {
    const { scene } = useGLTF(model.url)
    //Change models color. DONT LOAD FILES WITH EMBEDED TEXTURES.
    scene.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ color: 'orange' })
        }
    })
    return (
        <primitive object={scene} position={[0, -1, 0]} visible={visible} />
    )
}
