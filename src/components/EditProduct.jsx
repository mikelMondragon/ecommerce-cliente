import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../utils/apiFetch';
import { ProductForm } from './ProductForm';

export const EditProduct = () => {
    const { id } = useParams();
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        apiFetch(`/api/v1/products/${id}`, "PUT")
            .then(data => setInitialData(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!initialData) return <p>Loading...</p>;

    return (
        <ProductForm
            onSubmitApiEndpoint={`/api/v1/products/${id}`}
            method="PUT"
            initialData={initialData}
            isEditing={true}
        />
    );
};
