import React from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import styles from "../../assets/jss/material-kit-react/components/cardNavigationStyle";
const useStyles = makeStyles(styles);

const CardNavigation = props => {
    const classes = useStyles();
    const { className, children, color, menuCount, ...rest } = props;
    const cardNavigationClasses = classNames({
        [classes.cardNavigationRoot]: true,
        [classes[color + "CardNavigation"]]: color,
        [className]: className !== undefined
    });
    return (
        <div className={cardNavigationClasses} {...rest}>
            {children}
        </div>
    )
}

CardNavigation.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(["warning", "success", "danger", "info", "primary"]),
    menuCount: PropTypes.number,
    children: PropTypes.node
};

export default CardNavigation;
