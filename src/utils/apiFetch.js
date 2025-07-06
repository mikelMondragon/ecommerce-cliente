
export const apiFetch = (url, method = "GET", header = {}, body = null) => {
    const options = {
        method,
        headers: { ...header },
        credentials: "include",
    };

    if (method === "POST" || method === "PUT") {
        if (body && !(body instanceof FormData)) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        } else if (body instanceof FormData) {
            options.body = body;
        }
    }

    return fetch(url, options)
        .then(async res => {
            if (res.status === 401) {
                // logout en cliente
                console.warn("Token expirado. Cerrando sesión...");
                //TODO: clean cookies
                window.location.href = "/login";
            }
            if (res.ok) return await res.json();
            throw await res.json();
        })
        .catch(err => {
            throw err;
        });
};
