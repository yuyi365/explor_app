import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import Logout from "@mui/icons-material/Logout";
import Face from "@mui/icons-material/Face";

import useStyles from "./stylesPlaces";
import Search from "@material-ui/icons/Search";

const PlacesHeader = ({ setUser, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    history.push("/");
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
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" className={classes.titleOne}>
            Explor
          </Typography>

          <Box>
            <Button className={classes.buttonSearch} href="/">
              Search For Places
            </Button>
          </Box>

          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                  >{`${user.first_name[0]}${user.last_name[0]}`}</Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => history.push("/myprofile")}>
                <ListItemIcon>
                  <Face fontSize="small" />
                </ListItemIcon>
                My Profile
              </MenuItem>

              <MenuItem onClick={() => history.push("/")}>
                <ListItemIcon>
                  <Search fontSize="small" />
                </ListItemIcon>
                Search Places
              </MenuItem>
              <Divider />

              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PlacesHeader;
