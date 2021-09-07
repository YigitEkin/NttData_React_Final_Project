import sortProducts from "./sortProducts";
import calculateTotalPrice from "./calculateTotalPrice";


const reducer =  (state,action) =>{
    const filterProducts = (currentBrands, currentTags, isMugDisplayed, sortType) => {
        const productType = isMugDisplayed ? state.mugs: state.shirts;
        let filteredProducts = productType;

        if (currentBrands.length !== 0) {
            filteredProducts = productType.filter( (item) => currentBrands.includes(item.manufacturer));
        }

        if (currentTags.length !== 0) {
            filteredProducts = filteredProducts.filter((item) => {
                const tagsOfCurrentItem = [...item.tags];
                let isThereATagMatch = false;

                for (let i = 0; i < tagsOfCurrentItem.length; i++) {
                    if (currentTags.includes(tagsOfCurrentItem[i])) {
                        isThereATagMatch = true;
                    }
                }
                return isThereATagMatch;
            })
        }

        return sortProducts(sortType, filteredProducts);

    }
    if (action.type === "ASSIGN_PRODUCT_DATA") {
        //assigning mugs and shirts
        const filteredMugs = action.payload.products.filter((item)=> item.itemType === "mug");
        const filteredShirts = action.payload.products.filter((item)=> item.itemType === "shirt");

        //assigning tag values
        let allTagsArray = [];
        for (let i = 0; i < action.payload.products.length; i++) {
            allTagsArray = new Set([...allTagsArray, ...action.payload.products[i].tags]);
        }
        const sortedTagsArray = Array.from(allTagsArray).sort((first,second) => first.localeCompare(second));

        //finding hardcoded tag counts
        let tagCounts = []
        for (let i = 0; i < action.payload.products.length; i++) {
            tagCounts.concat(0);
        }
        const initiallyDisplayedProducts= Array.from(sortProducts("high_to_low",filteredMugs))
        return {
            ...state,
            products: action.payload.products,
            mugs: filteredMugs,
            shirts: filteredShirts,
            currentlyDisplayedProducts: initiallyDisplayedProducts, //paginate
            tags: sortedTagsArray,
            filteredTagsBySearchBar: sortedTagsArray,
            sortType: "low_to_high"
        }
    }

    if (action.type === "ASSIGN_COMPANY_DATA") {
        const sortedCompanies = action.payload.companies.sort((first,second) => {
            return first.name.localeCompare(second.name);
        });

        return {
            ...state,
            companies: sortedCompanies,
            filteredCompaniesBySearchBar: action.payload.companies
        }
    }

    if (action.type === "SORT") {
        const sortedProducts = sortProducts(state.sortType,state.currentlyDisplayedProducts);
        return {
            ...state,
            currentlyDisplayedProducts: Array.from(sortedProducts),
            sortType: action.payload
        }
    }

    if (action.type === "SHIRT_FILTER") {
        let filteredProducts = filterProducts(state.currentlyCheckedBrands, state.currentlyCheckedTags, false, state.sortType)
            return  {
                ...state,
                currentlyDisplayedProducts: filteredProducts,
                isMugDisplayed: false,
                productsPaginationIndex: 1
            }
    }

    if (action.type === "MUG_FILTER") {
        let filteredProducts = filterProducts(state.currentlyCheckedBrands, state.currentlyCheckedTags, true, state.sortType)
        return  {
            ...state,
            currentlyDisplayedProducts: filteredProducts,
            isMugDisplayed: true,
            productsPaginationIndex: 1
        }
    }


    if (action.type === "FILTER_BRAND") {
        if (action.payload.checked === true) {
            const currentBrands = [...state.currentlyCheckedBrands, action.payload.brandName];
            const filteredProducts = filterProducts(currentBrands, state.currentlyCheckedTags, state.isMugDisplayed, state.sortType)
            return {
                ...state,
                currentlyCheckedBrands: currentBrands,
                currentlyDisplayedProducts: filteredProducts,
                productsPaginationIndex: 1
            }
        } else { //remove the brand from the list
            const currentBrands = state.currentlyCheckedBrands.filter((item) => {
                return item !== action.payload.brandName
            } );

            const filteredProducts = filterProducts(currentBrands, state.currentlyCheckedTags, state.isMugDisplayed, state.sortType)
            return {
                ...state,
                currentlyCheckedBrands: currentBrands,
                currentlyDisplayedProducts: filteredProducts,
                productsPaginationIndex: 1
            }
        }
    }

    if (action.type === "FILTER_TAG") {
        // if the checkbox is active add the tag to the list
        if (action.payload.checked === true) {
            const currentTags = [...state.currentlyCheckedTags, action.payload.tagName];
            const filteredProducts = filterProducts(state.currentlyCheckedBrands, currentTags, state.isMugDisplayed, state.sortType)
            return {
                ...state,
                currentlyCheckedTags: currentTags,
                currentlyDisplayedProducts: filteredProducts,
                productsPaginationIndex: 1
            }
        } else { //remove the tag from the list
            const currentTags = state.currentlyCheckedTags.filter((item) => {
                return item !== action.payload.tagName
            } );


            const filteredProducts = filterProducts(state.currentlyCheckedBrands, currentTags, state.isMugDisplayed, state.sortType)
            return {
                ...state,
                currentlyCheckedTags: currentTags,
                currentlyDisplayedProducts: filteredProducts,
                productsPaginationIndex: 1
            }
        }
    }

    if (action.type === "SEARCH_BRAND") {
        const isActiveSearch = (action.payload !== "")
        const filteredBrands = state.companies.filter( (item) => {
             return item.slug.toString().toLowerCase().includes(action.payload.toString().toLowerCase());
        } )
        return {
            ...state,
            filteredCompaniesBySearchBar: filteredBrands,
            isSearchBrandActive: isActiveSearch
        }
    }

    if (action.type === "SEARCH_TAG") {
        const isActiveSearch = (action.payload !== "")
        const filteredTags = state.tags.filter( (item) => {
            return item.toLowerCase().includes(action.payload.toLowerCase());
        } )
        return {
            ...state,
            filteredTagsBySearchBar: filteredTags,
            isSearchTagActive: isActiveSearch
        }
    }

    if (action.type === "ADD_TO_CART"){
        let itemAddedCart = state.cart;
        let indexToAdd = -1;
        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].added === action.payload.added) {
                indexToAdd = i;
            }
        }

        if (indexToAdd === -1) {
            itemAddedCart = [...state.cart, {name: action.payload.name, amount: 1, price: action.payload.price, added: action.payload.added}];
            const currentPriceTotal = calculateTotalPrice(itemAddedCart);
            return {
                ...state,
                cart: Array.from(itemAddedCart),
                total: currentPriceTotal,
                isCartEmpty: false,
                isCartDisplayed: false
            }
        } else {
            itemAddedCart[indexToAdd].amount++;
            const currentPriceTotal = calculateTotalPrice(itemAddedCart);
            return {
                ...state,
                cart: Array.from(itemAddedCart),
                total: currentPriceTotal,
                isCartEmpty: false,
                isCartDisplayed: false
            }
        }
    }


    if (action.type === "REMOVE_FROM_CART") {
        let itemRemovedCart = state.cart;
        let indexToRemove = -1;

        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i].added === action.payload.added) {
                indexToRemove = i;
            }
        }

        if (state.cart[indexToRemove].amount === 1) {
            const itemToRemove = state.cart[indexToRemove];
            itemRemovedCart = state.cart.filter((item) => item.added !== itemToRemove.added);
            const currentPriceTotal = calculateTotalPrice(itemRemovedCart);
            const isCartEmpty = (itemRemovedCart.length === 0)
            return {
                ...state,
                cart: Array.from(itemRemovedCart),
                total: currentPriceTotal,
                isCartEmpty: isCartEmpty,
                isCartDisplayed: isCartEmpty
            }
        }
        else {
            itemRemovedCart[indexToRemove].amount--;
            const currentPriceTotal = calculateTotalPrice(itemRemovedCart);
            return {
                ...state,
                cart: Array.from(itemRemovedCart),
                total: currentPriceTotal
            }
        }
    }

    if (action.type === "TOOGLE_DISPLAY_CART") {
        const newState = !state.isCartDisplayed
        return {
            ...state,
            isCartDisplayed: newState
        }
    }

    if (action.type === "CHANGE_PAGINATION_INDEX") {
        return {
            ...state,
            productsPaginationIndex: action.payload
        }
    }

    return state;
}


export default reducer;