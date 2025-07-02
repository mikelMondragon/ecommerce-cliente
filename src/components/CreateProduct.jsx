import React, { useState } from 'react'
import { apiFetch } from "../utils/apiFetch"
import { ModelVisualizer } from './ModelVisualizer';
import { ConfiguratorVisualizer } from './ConfiguratorVisualizer';
// import { onSubmit } from "../hooks/useForm"
export const CreateProduct = () => {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [modelPreviews, setModelPrevies] = useState([]);
    const [slots, setSlots] = useState([
        { slot: "", files: [], previews: [] }
    ])

    const onSubmitHandler = async (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        slots.forEach(({ slot, files }) => {
            files.forEach(file => {
                formData.append(`models[${slot}]`, file);
            });
        });
        try {
            const result = await fetch("http://localhost:5000/api/v1/products", {
                method: "POST",
                body: formData
            })
            const data = await result.json();
            if (result.ok) {
                console.log({ data })
                ev.target.reset()
            } else {
                throw data;
            }

        } catch (error) {
            console.log({ error })
        }

    }

    const onImageChangeHandler = (files) => {
        const filesArray = Array.from(files);
        const newImagePreviews = filesArray.map(element => ({
            element,
            url: URL.createObjectURL(element),
        }));
        console.log(newImagePreviews);
        setImagePreviews(newImagePreviews);
    }

    const onModelsChangeHandler = (files) => {
        const filesArray = Array.from(files);
        const newModelPreviews = filesArray.map(element => ({
            element,
            url: URL.createObjectURL(element),
        }));
        setModelPrevies(newModelPreviews)
    }


    const updateSlotName = (index, value) => {
        const copy = [...slots]
        copy[index].slot = value
        setSlots(copy)
    }

    const updateSlotFiles = (index, fileList) => {
        const filesArray = Array.from(fileList)

        const previews = filesArray.map(file => ({
            file,
            url: URL.createObjectURL(file)
        }))

        const copy = [...slots]
        copy[index].files = filesArray
        copy[index].previews = previews
        setSlots(copy)
    }

    const addNewSlot = () => {
        setSlots([...slots, { slot: "", files: [] }])
    }

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
            <label htmlFor="description">Stock: </label>
            <input type="number" name="stock" placeholder="Stock" min="0" step="1" required />

            <p>Images:</p>
            <div>
                {imagePreviews.map((preview, idx) => (
                    <img
                        key={preview.ur}
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
                        name='slotName'
                        type="text"
                        placeholder="Nombre del slot (e.g. head)"
                        value={slotData.slot}
                        onChange={(e) => updateSlotName(i, e.target.value)}
                    />
                    {slotData.previews?.map((preview, i) => (
                        <ModelVisualizer key={preview.url} model={preview} />
                    ))}
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

            {/* <ConfiguratorVisualizer slots={slots} /> */}
            {/*  */}
            {/* {modelPreviews.map((element) => (
                <ModelVisualizer key={element.url} model={element} />
            ))}

            < input type="file" name="models" multiple accept='.glb, .gltf'
                onChange={(ev) => onModelsChangeHandler(ev.target.files)} />
            <br /> */}




            <button type="submit">Create Product</button>
        </form>
    );
}
