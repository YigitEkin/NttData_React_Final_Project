const calculateTotalPrice = (productsArray) => {
    const totalprice = productsArray.reduce((total, currentItem) => {
        const priceToAddFromCurrentItem = currentItem.price * currentItem.amount;
        return total + priceToAddFromCurrentItem;
    },0 )

    return totalprice;
}

export default calculateTotalPrice;