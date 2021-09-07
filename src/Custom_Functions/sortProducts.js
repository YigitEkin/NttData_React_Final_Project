const sortProducts = (sortType,data) => {
    if (sortType === "low_to_high") {
        const sortedProducts = data.sort((first, second) => {
            return (second.price - first.price)
        });
        return sortedProducts

    }

    else if (sortType === "high_to_low") {
        const sortedProducts = data.sort((first, second) => {
            return (first.price - second.price)
        });
        return sortedProducts;
    }

    else if (sortType === "new_to_old") {
        const sortedProducts = data.sort((first, second) => {
            return (second.added - first.added);
        });
        return sortedProducts;
    }

    else if (sortType === "old_to_new") {
        const sortedProducts = data.sort((first, second) => {
            return (first.added - second.added)
        })
        return sortedProducts;
    }
}

export default sortProducts;