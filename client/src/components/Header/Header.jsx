import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

const Header = ({ setCoordinates, setUser }) => {
  const classes = useStyles();
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

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

          <Box display="flex">
            <Typography variant="h6" className={classes.titleTwo}>
              Find your next destination
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Autocomplete>
          </Box>

          <Box>
            <Button className={classes.buttonPlaces} href="/myplaces">
              My Places
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

export default Header;
