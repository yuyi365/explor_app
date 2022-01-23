import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "./map.jpg";

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  // const [passwordMatch, setPasswordMatch] = useState(false);
  const [errors, setErrors] = useState([]);

  const passwordMatch = password === passwordRepeat;

  const checkEmail = () => {
    if (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setEmailValid(true);
      return emailValid;
    } else {
      setEmailValid((emailValid) => !emailValid);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkEmail();

    if (checkEmail && passwordMatch) {
      const user = {
        first_name: firstname,
        last_name: lastname,
        email,
        username,
        password,
      };

      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.ok) {
          res.json().then((newUser) => {
            console.log(newUser);
            alert(
              `You have sucessfully signed up with email ${newUser.email}. Log in and explore!`
            );
          });
        } else {
          res.json().then((errors) => {
            setErrors(errors.errors.flat());
          });
          alert(`Please try again! ${errors.join(". ")}.`);
        }
      });

      setFirstname("");
      setLastname("");
      setEmail("");
      setUsername("");
      setPassword("");
      setPasswordRepeat("");

      e.target.reset();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    autoComplete="given-name"
                    name="firstname"
                    id="firstname"
                    label="First name"
                    autoFocus
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    autoComplete="family-name"
                    id="lastName"
                    label="Last Name"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  {emailValid ? (
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  ) : (
                    <TextField
                      error
                      required
                      fullWidth
                      id="filled-error-helper-text"
                      label="Email Address"
                      helperText="Must be a valid email containing '@'"
                      variant="filled"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    autoComplete="username"
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  {passwordMatch ? (
                    <TextField
                      required
                      fullWidth
                      name="password-match"
                      label="Type Password Again"
                      type="password"
                      id="password-match"
                      autoComplete="new-password-match"
                      value={passwordRepeat}
                      onChange={(e) => {
                        setPasswordRepeat(e.target.value);
                      }}
                    />
                  ) : (
                    <TextField
                      error
                      required
                      fullWidth
                      id="filled-error-helper-text"
                      label="Type Password Again"
                      helperText="Passwords don't match, please try again"
                      variant="filled"
                      type="password"
                      value={passwordRepeat}
                      onChange={(e) => {
                        setPasswordRepeat(e.target.value);
                      }}
                    />
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Explor
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();

export default SignUp;
