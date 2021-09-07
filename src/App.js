import React, {useEffect, useState} from "react";
import './App.css';
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./Custom_Functions/reducer"
import axios from "axios";
import {productsURL, companiesURL} from "./Data"
import List from "./Components/List";
import Sort from "./Components/Sort";
import Grid from '@material-ui/core/Grid';
import Cart from "./Components/Cart";
import Navbar from "./Components/Navbar";
import Hidden from '@material-ui/core/Hidden';

const initialValue = {
    companies: [],
    products: [],
    mugs: [],
    shirts: [],
    tags: [],
    countsByTag: [],
    countsByBrand:[],
    isMugDisplayed: true,
    productsPaginationIndex: 1,
    currentlyDisplayedProducts: [],
    filteredCompaniesBySearchBar: [],
    filteredTagsBySearchBar: [],
    cart: [],
    currentlyCheckedBrands: [],
    currentlyCheckedTags: [],
    totalPrice: 0,
    isSearchBrandActive: false,
    isSearchTagActive: false,
    sortType: "",
    isCartEmpty: true,
    isCartDisplayed: true
}

const store = createStore(reducer,  initialValue,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
    const [companies,setCompanies] = useState([]);
    const [products,setProducts] = useState([]);

    const fetchData = (companiesURL, productsURL) => {
            axios.get(companiesURL).then((response) => {
            const fetchedCompanyData = response.data.map( (company)=> {
                const {slug, name, address, city, state, zip, account, contact} = company;
                return {slug,name,address,city,state,zip,account,contact};
            })
            setCompanies(fetchedCompanyData);
        });
            axios.get(productsURL).then((product) => {
                const fetchedProductData = product.data.map( (product)=> {
                    const {tags, price, name, description, slug, added, manufacturer, itemType} = product;
                    return {tags, price, name, description, slug, added, manufacturer, itemType};
                });
            setProducts(fetchedProductData);
        });
    }

    useEffect(()=> {
        fetchData(companiesURL, productsURL);
    },[]);

    useEffect(()=> {
        store.dispatch({type:"ASSIGN_PRODUCT_DATA", payload: {products}});
    },[products]);

    useEffect(()=> {
        store.dispatch({type:"ASSIGN_COMPANY_DATA", payload: {companies}});
    },[companies]);

    return (
    <Provider store={store}>
        <Navbar/>
        <Grid container item spacing={3} justifyContent="space-between" direction="row" style={{backgroundColor:"#E5E5E5"}}>
            <Grid container item spacing={3} xs={12} sm={12} md={4} alignItems="center" justifyContent="space-between" direction="column">
        <Sort/>
            </Grid>
            <Grid container item spacing={3} xs={12}  sm={12} md={4} alignItems="center" justifyContent="space-between" direction="row">
        <List/>
            </Grid>
                <Grid container item spacing={3} md={4} alignItems="flex-start" justifyContent="space-between" direction="row">
                    <Cart/>
                </Grid>
        </Grid>
    </Provider>
    )
}

export default App;
