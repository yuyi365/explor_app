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
  titleTwo: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      marginLeft: theme.spacing(42),
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "150%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
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
      display: "block",
      marginRight: theme.spacing(3),
    },
  },
  buttonPlaces: {
    position: "relative",
    color: "white",
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(20),
    },
  },
}));
