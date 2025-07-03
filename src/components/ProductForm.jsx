import React from 'react'
import { useCreateProductForm } from "../hooks/useProductForm";
import { ConfiguratorVisualizer } from "./ConfiguratorVisualizer";

export const ProductForm = (initialData) => {
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const {
        slots,
        imagePreviews,
        formErrors,
        isSubmitting,
        onSubmitHandler,
        onImageChangeHandler,
        updateSlotName,
        updateSlotFiles,
        addNewSlot,
    } = useCreateProductForm(urlBase);

    return (
        <form encType="multipart/form-data" onSubmit={onSubmitHandler} noValidate>
            <label htmlFor="name">Product name: </label>
            <input name="name" placeholder="Product name" required />
            <br />
            <label htmlFor="category">Category: </label>
            <select name="category" required>
                <option value="Miniatures">Miniatures</option>
                <option value="Paints">Paints</option>
                <option value="Tools">Tools</option>
            </select>
            <br />
            <label htmlFor="description">Description: </label>
            <textarea name="description" placeholder="Description" required />
            <br />
            <label htmlFor="description">Price: </label>
            <input type="number" name="price" placeholder="Price" min="0" step="0.01" required />
            <br />
            <label htmlFor="stock">Stock: </label>
            <input type="number" name="stock" placeholder="Stock" min="0" step="1" required />

            <p>Images:</p>
            <div>
                {imagePreviews.map((preview, idx) => (
                    <img
                        key={preview.url}
                        src={preview.url}
                        alt={`preview-${idx}`}
                        className="w-32 h-32 object-cover rounded border"
                    />
                ))}
            </div>

            <input name="images" type='file' placeholder="Image URL 1" multiple
                onChange={(ev) => onImageChangeHandler(ev.target.files)}
                accept="image/png, image/jpeg, image/jpg, image/gif" />


            <p>Models:</p>
            {slots.map((slotData, i) => (
                <div key={`slot${i}`}>
                    <label htmlFor="slotName">Slot name: </label>
                    <input
                        type="text"
                        placeholder="Nombre del slot (e.g. head)"
                        value={slotData.slot}
                        onChange={(e) => updateSlotName(i, e.target.value)}
                    />
                    {/* {slotData.previews?.map((preview) => (
                        <ModelVisualizer key={preview.url} model={preview} />
                    ))} */}
                    <br />
                    <input
                        type="file"
                        name={`models[${slotData.slot}]`}
                        multiple
                        accept=".glb,.gltf"
                        onChange={(e) => updateSlotFiles(i, e.target.files)}
                        disabled={!slotData.slot}
                    />
                    <br />
                </div>
            ))}

            <button type="button" onClick={addNewSlot} >Add slot</button>
            <br />

            <ConfiguratorVisualizer slots={slots} />




            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Product"}
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
}
