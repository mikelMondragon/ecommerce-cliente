import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

export const ModelVisualizer = ({ model }) => {
    console.log(model.url)
    const { scene } = useGLTF(model.url)
    return (
        <Canvas style={{ background: '#FFFF' }} camera={{ position: [2, 2, 2] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <primitive object={scene} position={[0, -1, 0]} color="orange" />
            <OrbitControls />
        </Canvas>
    )
}
