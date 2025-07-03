import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Model } from './Model'

export const ConfiguratorVisualizer = ({ slots }) => {
    console.log({ slots })
    return (
        <div>
            <Canvas style={{ background: '#FFFF' }} camera={{ position: [2, 2, 2] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />

                {slots.map((slot, i) =>
                    slot.files.length > 0 && slot.slot !== '' ? (
                        <Model key={`${slot.slot}-${i}`} model={slot.previews[0]} />
                    ) : null
                )}

                <OrbitControls />
            </Canvas>

        </div>
    )
}
