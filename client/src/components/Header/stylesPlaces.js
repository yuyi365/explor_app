import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  titleOne: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      marginLeft: theme.spacing(3),
    },
    fontFamily: "Mochiy Pop P One",
    fontSize: "175%",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonLogout: {
    display: "block",
    color: "white",
    backgroundColor: alpha(theme.palette.common.white, 0),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(3),
    },
  },
  buttonSearch: {
    position: "relative",
    color: "white",
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(75),
      width: "40%",
    },
  },
}));
