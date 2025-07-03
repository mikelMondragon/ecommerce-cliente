
export const apiFetch = (url, method = "GET", header = {}, body = null) => {
    const options = {
        method,
        headers: { ...header },
    };

    if (body && !(body instanceof FormData)) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    } else if (body instanceof FormData) {
        options.body = body;
    }

    return fetch(url, options)
        .then(async res => {
            if (res.ok) return await res.json();
            throw await res.json();
        })
        .catch(err => {
            throw err;
        });
};
