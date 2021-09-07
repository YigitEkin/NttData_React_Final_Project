import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";

const useStyles = makeStyles(() => ({
    buttonMenu: {
        marginBottom: "16px"
    },
    activeButton: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "6px 16px",
        background: "#1EA4CE",
        borderRadius: "2px",
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "13px",
        lineHeight: "18px",
        textAlign: "center",
        color: "#F2F0FD",
    },
    button: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "6px 16px",
        background: "#F2F0FD",
        borderRadius: "2px",
        fontFamily: "Open Sans",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "13px",
        lineHeight: "18px",
        textAlign: "center",
        color: "#1EA4CE",
    }
}));

const TabButtonMenu = ({mug, shirt, isMugDisplayed}) => {
    const classes = useStyles();
    return (
        <div>
            <ButtonGroup size="small" aria-label="Tab Button Menu" className={ classes.buttonMenu}>
                <Button onClick={mug} className={isMugDisplayed ? classes.activeButton: classes.button}>Mug</Button>
                <Button onClick={shirt} className={isMugDisplayed ? classes.button: classes.activeButton}>Shirt</Button>
            </ButtonGroup>
        </div>
    )
}

const mapStateToProps = state => {
    return {isMugDisplayed: state.isMugDisplayed}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {mug: () => dispatch({type:"MUG_FILTER"}), shirt: () => dispatch({type:"SHIRT_FILTER"})};
}
export default connect(mapStateToProps, mapDispatchToProps)(TabButtonMenu);