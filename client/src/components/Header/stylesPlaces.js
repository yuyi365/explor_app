import { alpha, makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  titleOne: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      marginLeft: theme.spacing(4),
    },
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
  },
  buttonSearch: {
    position: "relative",
    color: "white",

    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(50),
      width: "50%",
    },
  },
}));
