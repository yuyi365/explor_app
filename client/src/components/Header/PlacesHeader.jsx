import { AppBar, Toolbar, Typography, Box, Button } from "@material-ui/core";

import useStyles from "./stylesPlaces";

const PlacesHeader = ({ setUser }) => {
  const classes = useStyles();

  const handleLogout = () => {
    setUser(null);
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.titleOne}>
            Explor
          </Typography>

          <Box>
            <Button className={classes.buttonSearch} href="/">
              Search For Places
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={handleLogout}
              className={classes.buttonLogout}
              href="/"
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PlacesHeader;
