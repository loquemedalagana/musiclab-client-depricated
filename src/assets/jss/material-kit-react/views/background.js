import { makeStyles } from "@material-ui/core/styles";
import mobileBackgroundImg from '../../../images/background2.jpg';
import desktopBackgroundImg from '../../../images/background1.jpg';
//import upperBackgroundImg from '../../../images/background3.jpg';

export const loginSignupUpdateStyles = makeStyles(theme => ({
    root: {
        backgroundImage: "url(" + mobileBackgroundImg + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",

        [theme.breakpoints.up('md')]: {
            backgroundImage: 'url(' + desktopBackgroundImg + ')',
            backgroundPosition: 'right',
        },
    }
}));