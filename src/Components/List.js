import React from "react";
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TabButtonMenu from "./TabButtonMenu";
import paginate from "../Custom_Functions/paginate";
import {Pagination} from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
    productsSection: {
        display: "flex",
        flexDirection: "column",
    },
    mainSection: {
        display: "flex",
        flexDirection: "row",
        margin: "auto",
        background: "#fff",
        padding: 0,
        minWidth: "600px"
    },
    productsMainLabel: {
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "20px",
        lineHeight: "26px",
        letterSpacing: "0.25px",
        color: "#6F6F6F",
    },
    paper: {
        padding: 0,
        textAlign: 'center',
        minWidth: "125px",
        minHeight: "225px",
        position: "relative",
        margin: "0px 0px 10px 0px"
    },
    media: {
        height: "70px",
        width: "70px",
        border: "1.17666px solid #F3F0FE",
        padding: "24px",
        margin:"auto"
    },
    price: {
        fontFamily: "Helvetica",
        fontStyle: "normal",
        fontSize: "14px",
        lineHeight: "20px",
        color: "#1EA4CE",
        textAlign: "left",
        fontWeight: 700,
        margin: "10px"
},
    productName: {
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#191919",
        textAlign: "left",
        margin: "auto 2px 10px 10px"
},
    addButton: {
        display: "block",
        position: "absolute",
        bottom:"0px",
        left: "9px",
        width: "90%",
        height: "22px",
        background: "#1EA4CE",
        color:"FFF",
        borderRadius: "2px",
        padding:"0px",
        textAlign: "center",
        marginInline: "auto"
    },
    addButtonText: {
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "12px",
        lineHeight: "20px",
        color: "#FFFFFF",
    },
    pagination: {
        margin: "auto",
        display: "block"
    },
    paperItem: {
        padding: "15px",
        marginTop: "22px"
    }
}));


const List = ({currentlyDisplayedProducts, productsPaginationIndex, add_to_cart, change_pagination_index}) => {
    const classes = useStyles();
    const paginatedDisplayArray = paginate(currentlyDisplayedProducts);
    const thePageArray = paginatedDisplayArray.length ? (paginatedDisplayArray[productsPaginationIndex - 1]) : ([]);

    const handlePagination = (event, value) => {
        change_pagination_index(value)
    }

    return(
        <section className={classes.productsSection}>
        <h3 className={classes.productsMainLabel}>Products</h3>
            <TabButtonMenu/>
        <Grid container className={classes.mainSection}>
            {
                thePageArray.map( (product) => {
                        const {price, name} = product;
                        return (
                            <Grid item xs={4} sm={3} md={3} key={product.id} className={classes.paperItem}>
                                    <Paper elevation={0} className={classes.paper} >
                                                <img
                                                    className={classes.media}
                                                    src="https://60e220e7a8b90f00086c600e--sharp-chandrasekhar-67f159.netlify.app/images/ayi.png"
                                                    title={name}
                                                />
                                                    <h2 className={classes.price}>
                                                        {"₺ " + price}
                                                    </h2>

                                                    <h2 className={classes.productName} >
                                                        {name}
                                                    </h2>
                                                    <Button size="small" color="#FFF" className={classes.addButton} onClick={()=>add_to_cart(product)}>
                                                        <span className={classes.addButtonText}> Add</span>
                                                    </Button>
                                    </Paper>
                            </Grid>
                        )
            }
            )
            }
        </Grid>
            {(currentlyDisplayedProducts.length !== 0) && <Pagination className={classes.pagination}
                                                                      count={thePageArray.length ? (paginatedDisplayArray.length) : (1)} color="primary"
                                                                      shape="rounded" page={productsPaginationIndex} onChange={handlePagination}/>}
        </section>
    )
}
const mapStateToProps = (state) => {
    return {currentlyDisplayedProducts: state.currentlyDisplayedProducts, productsPaginationIndex: state.productsPaginationIndex }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        add_to_cart: (cartItem) => dispatch({type:"ADD_TO_CART", payload: cartItem}),
        change_pagination_index: (index) => dispatch({type: "CHANGE_PAGINATION_INDEX", payload: index })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)