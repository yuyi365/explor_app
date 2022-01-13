import * as React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@material-ui/core";

import useStyles from "./styles";

const HeaderNonUser = ({ setUser }) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.title}>
            Explor
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Button className={classes.button} href="/">
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default HeaderNonUser;
