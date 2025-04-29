export const getProducts = sortBy => {
    return fetch(`http://localhost:8000/api/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            }, 
    })
        .then(response => {
             console.log(response.json())
        })
        .catch(err => console.log(err));
};