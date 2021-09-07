import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {connect} from "react-redux";
import {Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        background: "#FFFFFF",
        boxShadow: "0px 6px 24px rgba(93, 62, 188, 0.04)",
        padding: "25px",
        marginBottom: "20px"
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
}));

const Filter = (
    {
        isSearchBrandActive,
        products,
        filteredCompaniesBySearchBar,
        isSearchTagActive,
        filteredTagsBySearchBar,
        filter_brand,
        search_brand,
        filter_tag,
        search_tag}) => {
    const classes = useStyles();


    const handleChangeBrands = (event) => {
        const brandName = event.target.value;
        const checked = event.target.checked;
        filter_brand(brandName,checked);
    }

    const handleChangeTags= (event) => {
        const brandName = event.target.value;
        const checked = event.target.checked;
        filter_tag(brandName,checked);
    }

    const handleSearchBrand = (event) => {
        const searchAreaText = event.target.value;
        search_brand(searchAreaText)
    }

    const handleSearchTag = (event) => {
        const searchAreaText = event.target.value;
        search_tag(searchAreaText)
    }

    return(
        <Grid container item>
            <Grid container item xs={12}  sm={10} md={11}>
    <FormLabel component="legend" className={classes.sortLabel}>Brands</FormLabel>
    <FormControl component="fieldset" className={clsx(classes.card, classes.formControl)}>
        <TextField id="standard-search" type="search" placeholder="Search Brand" onChange={handleSearchBrand} className={classes.searchBar}/>
        <FormGroup>
            {isSearchBrandActive || <FormControlLabel
                control={<Checkbox  name="all" value="all" color="primary"/>}
                label={"All " + "(" + products.length + ")"}
            />}
            {
                filteredCompaniesBySearchBar.map((company)=> {
                    return (
                        <FormControlLabel
                            control={<Checkbox key={company.id} onChange={handleChangeBrands} name={company.name} value={company.slug} color="primary"/>}
                            label={company.name}
                        />
                    )
                })
            }
        </FormGroup>
    </FormControl>
            </Grid>
            <Grid container item xs={11}  sm={6} md={11}>
    <FormLabel component="legend" className={classes.sortLabel}>Tags </FormLabel>
    <FormControl component="fieldset" className={clsx(classes.card, classes.formControl)}>
        <TextField id="standard-search" type="search" placeholder="Search Tag" onChange={handleSearchTag} className={classes.searchBar}/>
        <FormGroup>
            {isSearchTagActive || <FormControlLabel
                control={<Checkbox name="all" value="all" color="primary"/>}
                label={"All " + "(" + products.length + ")"}
            />}
            {
                filteredTagsBySearchBar.map((tag,index)=> {
                    return (
                        <FormControlLabel
                            control={<Checkbox key={index} onChange={handleChangeTags} name={tag} value={tag} color="primary"/>}
                            label={tag}
                        />
                    )
                })
            }
        </FormGroup>
    </FormControl>
        </Grid>
    </Grid>
)
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        filteredCompaniesBySearchBar: state.filteredCompaniesBySearchBar,
        isSearchBrandActive: state.isSearchBrandActive,
        filteredTagsBySearchBar: state.filteredTagsBySearchBar,
        isSearchTagActive: state.isSearchTagActive,
        sortType: state.sortType
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        filter_brand: (brandName,checked)=>dispatch({type:"FILTER_BRAND", payload: {brandName,checked}}),
        filter_tag: (tagName,checked)=>dispatch({type:"FILTER_TAG", payload: {tagName,checked}}),
        sort: (buttonValue)=>dispatch({type:"SORT", payload: buttonValue}),
        search_brand: (searchText) => dispatch({type:"SEARCH_BRAND", payload: searchText}),
        search_tag: (searchText) => dispatch({type:"SEARCH_TAG", payload: searchText}),
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Filter);