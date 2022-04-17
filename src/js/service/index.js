const PRODUCT_ID = "VENDING_MACHINE_PRODUCT";

export const setProducts = (products) => {
    localStorage.setItem(PRODUCT_ID, JSON.stringify(products));
};

export const getProducts = () => {
    const productData = localStorage.getItem(PRODUCT_ID);
    return productData ? JSON.parse(productData) : [];
};
