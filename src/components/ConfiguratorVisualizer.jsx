import React, { useEffect, useState, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Model } from './Model'

export const ConfiguratorVisualizer = ({ slots }) => {
    const [slotIndices, setSlotIndices] = useState({})

    // Inicializar los índices
    useEffect(() => {
        const initial = {}
        slots.forEach(slot => {
            initial[slot.slot] = 0
        })
        setSlotIndices(initial)
    }, [slots])

    // Precrear todos los modelos
    const loadedModels = useMemo(() => {
        const result = {}
        slots.forEach(slot => {
            result[slot.slot] = slot.previews?.map((preview, i) => (
                <Model
                    key={`${slot.slot}-${i}`}
                    model={preview}
                    visible={false} // Ocultos por defecto
                />
            ))
        })
        return result
    }, [slots])

    // Cambiar índice
    const handleNext = (slotName, max) => {
        setSlotIndices(prev => ({
            ...prev,
            [slotName]: (prev[slotName] + 1) % max
        }))
    }

    const handlePrev = (slotName, max) => {
        setSlotIndices(prev => ({
            ...prev,
            [slotName]: (prev[slotName] - 1 + max) % max
        }))
    }

    return (
        <div>
            <Canvas style={{ background: '#FFFF' }} camera={{ position: [2, 2, 2] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />

                {/* Mostrar solo el modelo actual de cada slot */}
                {Object.entries(loadedModels).map(([slotName, models]) => {
                    const currentIndex = slotIndices[slotName] || 0
                    return models?.map((model, i) =>
                        React.cloneElement(model, {
                            visible: i === currentIndex,
                        })
                    )
                })}

                <OrbitControls />
            </Canvas>

            {/* Controles */}
            <div style={{ marginTop: '1rem' }}>
                {slots.map((slot, i) => (
                    <div key={`controls-${slot.slot}`} style={{ marginBottom: '0.5rem' }}>
                        <button type="button" onClick={() => handlePrev(slot.slot, slot.files.length)}>Prev</button>
                        <strong style={{ margin: '0 1rem' }}>{slot.slot}</strong>
                        <button type="button" onClick={() => handleNext(slot.slot, slot.files.length)}>Next</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
