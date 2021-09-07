import React from "react";
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme) => ({
    root: {
        border: "solid #1EA4CE 8px",
        backgroundColor: "#FFF",
        top: "120px",
        right: "60px",
        padding: "10px",
        position: "absolute",
        zIndex: 3
    },
    itemButtonSection: {
        display: "flex",
        flexDirection: "row",
        marginLeft: "10px",
        justifyContent: "space-between",
        padding: "20px"
    },
    itemName: {
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.16px",
        color: "#191919",
    },
    itemPrice: {
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.16px",
        color: "#1EA4CE",
    },
    operationsSection: {
        display: "flex",
        flexDirection: "row",
        margin: "auto 10px"
    },
    operationButton: {
        color: "#1EA4CE",
        background: "#fff",
        border: "none",
        boxShadow: "none",
        marginInline: "3px"
    },
    itemAmount: {
        fontFamily:"Open Sans",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize:"15px",
        lineHeight: "20px",
        textAlign: "center",
        margin: "auto",
        paddingTop: "5px",
        color: "#FFFFFF",
        width: "32px",
        height: "32px",
        background: "#1EA4CE;"
    },
    total: {
        background: "#FFFFFF",
        border: "2px solid #1EA4CE",
        boxSizing: "border-box",
        borderRadius: "2px",
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "16px",
        textAlign: "left",
        color: "#1EA4CE",
        padding: "30px 60px 30px 20px",
        width: "51px",
        margin: "auto 35px 30px auto",
    },
    errorLogo: {
        color: "orange",
        margin: "auto 10px",

    },
    emptyLabel: {
        color: "orange",
        marginRight: "10px"
    }
}));

const Cart = ({total, cart,add_to_cart, remove_from_cart, isCartEmpty}) => {
        const classes = useStyles();

        return (
            <>
                <div className={classes.root}>
                    <Paper variant="outlined"/>
                    {
                        isCartEmpty? (
                            <>
                            <p className={classes.emptyLabel}> <ErrorIcon className={classes.errorLogo} />  Sepetinizde ürün bulunmamaktadır</p>
                        </>
                        ) :cart.map((item) => {
                            return (
                                <section className={classes.itemButtonSection}>
                                    <div>
                                        <h2 className={classes.itemName}>{item.name}</h2>
                                        <h2 className={classes.itemPrice}>{item.price}</h2>
                                    </div>
                                    <div className={classes.operationsSection}>
                                        <button onClick={() => remove_from_cart(item)}
                                                className={classes.operationButton}><p
                                            className={classes.operationButton}>-</p></button>
                                        <p className={classes.itemAmount}>{item.amount}</p>
                                        <button onClick={() => add_to_cart(item)} className={classes.operationButton}><p className={classes.operationButton}>+</p></button>
                                    </div>
                                </section>
                            )
                        })
                    }
                    {!isCartEmpty && <p className={classes.total}>{"₺" + (total.toFixed(2))}</p>}
                    <Paper variant="outlined" square/>
                </div>}
            </>
        );
}


const mapStateToProps = (state) => {
    return {total: state.total, cart: state.cart, isCartEmpty: state.isCartEmpty}
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_to_cart: (cartItem) => dispatch({type:"ADD_TO_CART", payload: cartItem}),
        remove_from_cart: (cartItem) => dispatch({type:"REMOVE_FROM_CART", payload: cartItem})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);