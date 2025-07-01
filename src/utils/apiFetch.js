
export const apiFetch = (url, method = "GET", header = {}, body = {}) => {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json', ...header },
    };

    if (method === "POST" || method === "PUT") {
        options.body = JSON.stringify(body);
    }

    return fetch(url, options)
        .then(async res => {
            if (res.ok) return res.json();
            throw await res.json();
        })
        .catch(err => {
            throw err;
        });
};
