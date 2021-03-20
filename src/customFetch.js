export const customFetch = (path, options = {}) => {
    const API = "https://todo-apn.herokuapp.com"

    return fetch(`${API}/items${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}