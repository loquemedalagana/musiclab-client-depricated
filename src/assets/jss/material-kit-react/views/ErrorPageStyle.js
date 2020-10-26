import { container } from '../../material-kit-react';
import customInputStyle from '../components/customInputStyle';
import customCheckboxRadioSwitch from "../components/customCheckboxRadioSwitch.js";

export default {
    container: {
        ...container,
        zIndex: "2",
        position: "relative",
        paddingTop: "10vh",
        paddingBottom: "200px"
    },
    cardHidden: {
        opacity: "0",
        transform: "translate3d(0, -60px, 0)"
    },
    pageHeader: {
        minHeight: "100vh",
        height: "auto",
        display: "inherit",
        position: "relative",
        flexDirection: 'row',
        margin: "0",
        padding: "0",
        border: "0",
        alignItems: "center",

        "&:before": {
            background: "linear-gradient(-140deg, rgba(255, 137, 215, 0.3),rgba(163, 216, 244, 0.5))"
        },
        "&:before,&:after": {
            position: "absolute",
            zIndex: "1",
            width: "100%",
            height: "100%",
            display: "block",
            left: "0",
            top: "0",
            content: '""'
        },
        "& footer li a,& footer li a:hover,& footer li a:active": {
            
        },
        "& footer": {
            position: "absolute",
            bottom: "0",
            width: "100%"
        },
    },
    brand: {
        color: "rgba(26, 26, 46, )",
        textAlign: "left"
    },
    title: {
        fontSize: "4.2rem",
        fontWeight: "600",
        display: "inline-block",
        position: "relative"
    },
    subtitle: {
        fontSize: "1.313rem",
        maxWidth: "500px",
        margin: "10px 0 0"
    },
    ...customCheckboxRadioSwitch,
    ...customInputStyle
};