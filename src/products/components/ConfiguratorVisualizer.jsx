import React, { useEffect, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './Model';

export const ConfiguratorVisualizer = ({ slots }) => {
    const [slotIndices, setSlotIndices] = useState({});

    useEffect(() => {
        const initial = {};
        slots.forEach(slot => {
            initial[slot.slot] = 0;
        });
        setSlotIndices(initial);
    }, [slots]);

    const loadedModels = useMemo(() => {
        const result = {};
        slots.forEach(slot => {
            result[slot.slot] = slot.previews?.map((preview, i) => (
                <Model
                    key={`${slot.slot}-${i}`}
                    model={preview}
                    visible={false}
                />
            ));
        });
        return result;
    }, [slots]);

    const handleNext = (slotName, max) => {
        setSlotIndices(prev => ({
            ...prev,
            [slotName]: (prev[slotName] + 1) % max,
        }));
    };

    const handlePrev = (slotName, max) => {
        setSlotIndices(prev => ({
            ...prev,
            [slotName]: (prev[slotName] - 1 + max) % max,
        }));
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="aspect-video rounded-xl overflow-hidden border shadow-md">
                <Canvas className="bg-white" camera={{ position: [2, 2, 2] }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} />

                    {Object.entries(loadedModels).map(([slotName, models]) => {
                        const currentIndex = slotIndices[slotName] || 0;
                        return models?.map((model, i) =>
                            React.cloneElement(model, {
                                visible: i === currentIndex,
                            })
                        );
                    })}

                    <OrbitControls />
                </Canvas>
            </div>

            {/* Controls */}
            <div className="mt-6 space-y-4">
                {slots.map((slot, i) => (
                    <div
                        key={`controls-${slot.slot}${i}`}
                        className="flex items-center justify-center gap-4"
                    >
                        {slot.files.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handlePrev(slot.slot, slot.files.length)}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                Prev
                            </button>
                        )}
                        <strong className="text-lg capitalize">{slot.slot}</strong>
                        {slot.files.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleNext(slot.slot, slot.files.length)}
                                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                            >
                                Next
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
