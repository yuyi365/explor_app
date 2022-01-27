import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router";
import useStyles from "./styles";

const HeaderNonUser = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            Explor
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              className={classes.button}
              onClick={() => history.push("/")}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default HeaderNonUser;
