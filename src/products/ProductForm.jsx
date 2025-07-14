import React, { useEffect, useRef } from 'react';
import { useCreateProductForm } from "./hook/useProductForm";
import { ConfiguratorVisualizer } from "./components/ConfiguratorVisualizer";

export const ProductForm = ({ initialData = null }) => {
    const formRef = useRef(null);
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const {
        slots,
        imagePreviews,
        existingSlots,
        existingImagePreviews,
        formErrors,
        isSubmitting,
        onSubmitHandler,
        onImageChangeHandler,
        updateSlotName,
        updateSlotFiles,
        removeExistingSlot,
        removeExistingImage,
        addNewSlot,
        populateForm
    } = useCreateProductForm(urlBase, initialData ? "edit" : "create");

    const setInitialDataValues = () => {
        if (initialData) {
            populateForm(initialData);
            if (formRef.current) {
                formRef.current.name.value = initialData.name || "";
                formRef.current.category.value = initialData.category || "";
                formRef.current.description.value = initialData.description || "";
                formRef.current.price.value = initialData.price || "";
                formRef.current.stock.value = initialData.stock || "";
            }
        }
    };

    useEffect(() => {
        setInitialDataValues();
    }, [initialData]);

    return (
        <form
            ref={formRef}
            encType="multipart/form-data"
            onSubmit={onSubmitHandler}
            noValidate
            className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-md space-y-6"
        >
            {initialData?._id && <input type="hidden" name="id" value={initialData?._id} />}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product name:</label>
                <input name="name" placeholder="Product name" required className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                <select name="category" required className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                    <option value="Miniatures">Miniatures</option>
                    <option value="Paints">Paints</option>
                    <option value="Tools">Tools</option>
                </select>
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea name="description" placeholder="Description" required className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                <input type="number" name="price" placeholder="Price" min="0" step="0.01" required className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>

            <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock:</label>
                <input type="number" name="stock" placeholder="Stock" min="0" step="1" required className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
            </div>

            <div>
                <p className="text-sm font-semibold">Old Images:</p>
                <div className="flex flex-wrap gap-4">
                    {existingImagePreviews.map((preview, idx) => (
                        <div key={"preview" + preview.url} className="relative">
                            <img src={preview.url} alt={`preview-${idx}`} className="w-32 h-32 object-cover rounded border" />
                            <button type="button" onClick={() => removeExistingImage(preview.url)} className="absolute top-1 right-1 text-white bg-red-500 rounded-full px-2 py-1 text-xs">Delete</button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-sm font-semibold">New Images:</p>
                <div className="flex flex-wrap gap-4">
                    {imagePreviews.map((preview, idx) => (
                        <img key={preview.url} src={preview.url} alt={`preview-${idx}`} className="w-32 h-32 object-cover rounded border" />
                    ))}
                </div>
            </div>

            <input name="images" type="file" multiple onChange={(ev) => onImageChangeHandler(ev.target.files)} accept="image/png, image/jpeg, image/jpg, image/gif" className="block mt-2" />

            <div>
                <p className="text-sm font-semibold">Models:</p>
                {slots.map((slotData, i) => (
                    <div key={`slot${i}`} className="space-y-2">
                        <input
                            type="text"
                            placeholder="Slot name (e.g. head)"
                            value={slotData.slot}
                            onChange={(e) => updateSlotName(i, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="file"
                            name={`models[${slotData.slot}]`}
                            multiple
                            accept=".glb,.gltf"
                            onChange={(e) => updateSlotFiles(i, e.target.files)}
                            disabled={!slotData.slot}
                            className="block"
                        />
                    </div>
                ))}

                {existingSlots.map((slotData) => (
                    <div key={slotData.slot} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <p>{slotData.slot}</p>
                        <button type="button" onClick={() => removeExistingSlot(slotData.slot)} className="text-red-500">Delete</button>
                    </div>
                ))}

                <button type="button" onClick={addNewSlot} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Add slot</button>
            </div>

            <ConfiguratorVisualizer slots={[...slots, ...existingSlots]} />

            <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                {isSubmitting ? "Saving..." : "Save"}
            </button>

            <ul className="text-red-500 text-sm list-disc list-inside mt-4">
                {Object.entries(formErrors).map(([field, errorObj]) => (
                    <li key={field}>
                        <strong>{field}:</strong> {errorObj.msg}
                    </li>
                ))}
            </ul>
        </form>
    );
};
