const paginate = (products) => {
    const itemsPerPage = 16;
    const pages = Math.ceil(products.length / itemsPerPage);
    const paginatedProducts = Array.from({ length: pages }, (_, index) => {
        const start = index * itemsPerPage;
        return products.slice(start, start + itemsPerPage);
    })
    return paginatedProducts;
}

export default paginate