import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch"; // Ajusta el path si es necesario

export const useFetch = (endpoint, method = "GET", header = {}, body = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await apiFetch(endpoint, method, header, body);
            if (!data.ok) throw new Error(data.msg || 'Error loading data');
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

    return { data, setData, loading, error };
};