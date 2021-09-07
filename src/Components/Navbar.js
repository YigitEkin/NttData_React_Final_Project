import React from "react";
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    navbar: {
        height: "76.64px",
        background: "#1EA4CE",
        backgroundImage: "url(https://60e220e7a8b90f00086c600e--sharp-chandrasekhar-67f159.netlify.app/images/Logo.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "720px 8px"
    },
    basket: {
        display: "flex",
        height: "76.64px",
        width: "129px",
        background: "#147594",
        marginLeft: "auto",
        marginRight: "100px",
        alignItems: "right",
        justifyContent: "center",
    },
    basketPrice: {
        marginTop: "25px",
        fontFamily: "Open Sans",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: "18px",
        letterSpacing: "0.1599999964237213px",
        color: "#FFF"
    },
    basketImg: {
        margin: "15px 5px",
        width: "30px",
        height: "30px",

    },
    logo: {
    }
}))

const Navbar = ({total, toggle_display_cart, isCartEmpty}) => {
    const classes = useStyles();
  return(
      <div className={classes.navbar}>
          <button onClick={toggle_display_cart} className={classes.basket}>
              <img src="https://60e220e7a8b90f00086c600e--sharp-chandrasekhar-67f159.netlify.app/images/basket.png" alt="" className={classes.basketImg}/>
              {<h1 className={classes.basketPrice}>{"₺" + (isCartEmpty?"0":total.toFixed(2))}</h1>}
          </button>
      </div>
  )
}

const mapStateToProps = (state) => {
    return {total: state.total, isCartDisplayed: state.isCartDisplayed, isCartEmpty: state.isCartEmpty}
}

const mapDispatchToProps = (dispatch) => {
    return {toggle_display_cart: ()=> dispatch({type:"TOOGLE_DISPLAY_CART"})}
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);