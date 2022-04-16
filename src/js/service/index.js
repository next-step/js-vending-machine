export const setProducts = (products) => {
    localStorage.setItem("product", products);
}

export const getProducts = () => {
    return localStorage.getItem("product");
}