import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch"; // Ajusta el path si es necesario

export const useFetch = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(endpoint);
            const data = await res.json();

            if (!res.ok) throw new Error(data.msg || 'Error loading products');

            setData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!endpoint) return;

        fetchData();
    }, [endpoint]);

    return { data, loading, error };
};