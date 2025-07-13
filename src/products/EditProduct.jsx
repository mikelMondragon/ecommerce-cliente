import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../utils/apiFetch';
import { ProductForm } from '../products/ProductForm';
import { useFetch } from '../hooks/useFetch';

export const EditProduct = () => {
    const { id } = useParams();
    console.log("edit product id: ", id)
    const [initialData, setInitialData] = useState(null);
    const urlBase = import.meta.env.VITE_SERVER_URL_BASE;
    const { data, loading, error } = useFetch(`${urlBase}/api/v1/products/${id}`);

    if (!data) return <p>Loading...</p>;
    if (data) console.log(data)
    return (
        loading
            ? <p>Cargando productos...</p>
            : error
                ? <p>Error: {error}</p>
                : (
                    <ProductForm
                        initialData={data.product}
                    />
                )
    );
};
