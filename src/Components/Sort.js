import React, {useState} from "react";
import {connect} from "react-redux";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {Grid, makeStyles} from "@material-ui/core";
import Filter from "./Filter";

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        background: "#FFFFFF",
        boxShadow: "0px 6px 24px rgba(93, 62, 188, 0.04)",
        padding: "25px",
        marginBottom: "20px"
    },
    sortSection:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    formControl: {
        height: "296px",
        overflow: "auto"
    },
    sortLabel: {
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "13px",
        lineHeight: "18px",
        color: "#697488",
        marginTop: "25px",
        marginBottom: "5px"
    },
    sortRadioLabel: {
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "18px",
        color: "#525252",
    },
    searchBar: {
        border: "2px solid #E0E0E0",
        boxSizing: "border-box",
        borderRadius: "2px",
        padding: "10px"
    }
}));

const  Sort = ({   products,
                   isSearchBrandActive,
                   filteredCompaniesBySearchBar,
                   sort,
                   filter_brand,
                   search_brand,
                   currentlyDisplayedProducts,
                   tags,
                   search_tag,
                   filteredTagsBySearchBar,
                   isSearchTagActive,
                   filter_tag,
               }) => {

    const classes = useStyles();

    const handleChangeSort = (event) => {
        sort(event.target.value);
    };
    return (
        <Grid container item xs={6}  sm={6}>
        <section className={classes.sortSection}>
            <h2 className={classes.sortLabel}>Sorting</h2>
        <FormControl component="fieldset" className={classes.card}>
            <RadioGroup aria-label="gender" name="gender1" onChange={handleChangeSort}>
                <FormControlLabel  className={classes.sortRadioLabel} value="low_to_high" control={<Radio color="primary" />} label="Price low to high" />
                <FormControlLabel className={classes.sortRadioLabel} value="high_to_low" control={<Radio color="primary"/>} label="Price high to low" />
                <FormControlLabel className={classes.sortRadioLabel} value="new_to_old" control={<Radio color="primary"/>} label="New to old" />
                <FormControlLabel className={classes.sortRadioLabel} value="old_to_new" control={<Radio color="primary" />} label="Old to new" />
            </RadioGroup>
        </FormControl>

            <Filter/>
        </section>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        currentlyDisplayedProducts: state.currentlyDisplayedProducts,
        filteredCompaniesBySearchBar: state.filteredCompaniesBySearchBar,
        isSearchBrandActive: state.isSearchBrandActive,
        tags: state.tags,
        filteredTagsBySearchBar: state.filteredTagsBySearchBar,
        isSearchTagActive: state.isSearchTagActive,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filter_brand: (brandName,checked)=>dispatch({type:"FILTER_BRAND", payload: {brandName,checked}}),
        filter_tag: (tagName,checked)=>dispatch({type:"FILTER_TAG", payload: {tagName,checked}}),
        sort: (buttonValue)=>dispatch({type:"SORT", payload: buttonValue}),
        search_brand: (searchText) => dispatch({type:"SEARCH_BRAND", payload: searchText}),
        search_tag: (searchText) => dispatch({type:"SEARCH_TAG", payload: searchText}),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);