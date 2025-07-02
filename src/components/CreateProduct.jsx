import React, { useState } from 'react'
import { apiFetch } from "../utils/apiFetch"
import { ModelVisualizer } from './ModelVisualizer';
// import { onSubmit } from "../hooks/useForm"
export const CreateProduct = () => {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [modelPreviews, setModelPrevies] = useState([])

    const onSubmitHandler = async (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
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
            {modelPreviews.map((element) => (
                <ModelVisualizer key={element.url} model={element} />
            ))}

            < input type="file" name="models" multiple accept='.glb, .gltf'
                onChange={(ev) => onModelsChangeHandler(ev.target.files)} />
            <br />
            <button type="submit">Create Product</button>
        </form>
    );
}
