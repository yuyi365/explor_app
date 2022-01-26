import * as React from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Profile = ({ setUser, user }) => {
  const [firstname, setFirstname] = useState(user.first_name);
  const [lastname, setLastname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [updateName, setUpdateName] = useState(false);
  const [updateUsernameEmail, setUpdateUsernameEmail] = useState(false);
  // const [updatePassword, setUpdatePassword] = useState(false);
  // const [currentPassword, setCurrentPassword] = useState(user.password);
  // const [newPassword, setNewPassword] = useState("");

  const updateNameFunction = () => {
    setUpdateName(false);
    const formData = {
      first_name: firstname,
      last_name: lastname,
    };

    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => setUser(data));
  };

  const updateUsernameEmailFunction = () => {
    setUpdateUsernameEmail(false);
    const formData = {
      username: username,
      email: email,
    };

    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => setUser(data));
  };

  // future development with password updates
  // const updatePasswordFunction = () => {
  //   setUpdatePassword(false);
  //   const formData = {
  //     currentPassword: currentPassword,
  //     password: newPassword,
  //   };

  //   fetch(`/updatepassword/${user.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => {
  //       res.json();
  //     })
  //     .then((data) => console.log(data));
  // };
  // }
  //   alert(
  //     "Your current password does not match what is on file. Please try again!"
  //   );
  // }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" rowSpacing={55}>
        <CssBaseline />

        <Grid
          item
          xs={12}
          elevation={6}
          sx={{
            my: 10,
            mx: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            color="primary"
            sx={{ mt: 6, mb: 7, fontFamily: "Mochiy Pop P One" }}
          >
            My Profile
          </Typography>

          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              border: 1,
              borderColor: "primary.main",
              borderRadius: 5,
              p: 2,
              width: "75%",
              margin: "auto",
            }}
          >
            {!updateName ? (
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled
                  autoComplete="given-name"
                  name="firstname"
                  id="firstName"
                  label="First name"
                  variant="standard"
                  value={firstname}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  id="firstName"
                  label="First name"
                  variant="standard"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Grid>
            )}

            {!updateName ? (
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled
                  autoComplete="family-name"
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  variant="standard"
                  value={lastname}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="family-name"
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  variant="standard"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={1}>
              {!updateName ? (
                <Button
                  variant="outlined"
                  onClick={() => setUpdateName(true)}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={updateNameFunction}
                  startIcon={<CheckCircleIcon />}
                >
                  Save
                </Button>
              )}
            </Grid>
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              border: 1,
              borderColor: "primary.main",
              borderRadius: 5,
              p: 2,
              width: "75%",
              margin: "auto",
            }}
          >
            {!updateUsernameEmail ? (
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  disabled
                  autoComplete="username"
                  id="username"
                  label="Username"
                  name="username"
                  variant="standard"
                  value={username}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  autoComplete="username"
                  id="username"
                  label="Username"
                  name="username"
                  variant="standard"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
            )}

            {!updateUsernameEmail ? (
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  disabled
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                  value={email}
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={1}>
              {!updateUsernameEmail ? (
                <Button
                  variant="outlined"
                  onClick={() => setUpdateUsernameEmail(true)}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={updateUsernameEmailFunction}
                  startIcon={<CheckCircleIcon />}
                >
                  Save
                </Button>
              )}
            </Grid>
          </Grid>

          {/* <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              border: 1,
              borderColor: "primary.main",
              borderRadius: 5,
              p: 2,
              width: "75%",
              margin: "auto",
            }}
          >
            {!updatePassword ? (
              <Grid item xs={12} sx={{ mb: 2 }} sm={4}>
                <TextField
                  fullWidth
                  disabled
                  name="password"
                  label="Enter Current Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                />
              </Grid>
            ) : (
              <Grid item xs={12} sx={{ mb: 2 }} sm={4}>
                <TextField
                  fullWidth
                  name="password"
                  label="Enter Current Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </Grid>
            )}

            {!updatePassword ? (
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  disabled
                  id="standard-basic"
                  label="New Password"
                  variant="standard"
                  type="password"
                />
              </Grid>
            ) : (
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="New Password"
                  variant="standard"
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={1}>
              {!updatePassword ? (
                <Button
                  variant="outlined"
                  onClick={() => setUpdatePassword(true)}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  onClick={updatePasswordFunction}
                  startIcon={<CheckCircleIcon />}
                >
                  Save
                </Button>
              )}
            </Grid> */}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const theme = createTheme();

export default Profile;
