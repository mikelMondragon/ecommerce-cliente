import React from 'react'
import { apiFetch } from "../utils/apiFetch"
// import { onSubmit } from "../hooks/useForm"
export const CreateProduct = () => {
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
            <input name="images" type='file' placeholder="Image URL 1" multiple accept="image/png, image/jpeg, image/jpg, image/gif" />

            <p>Models:</p>
            <input type="file" name="models" multiple accept='.glb, .gltf' />
            <br />
            <button type="submit">Create Product</button>
        </form>
    );
}
