import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register, login } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  contentBox: {
    width: "100%"
  },
  topWrapper: {
    flexDirection: "column",
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      flexDirection: "row",
      marginBottom: theme.spacing(7.5),
    }
  },
  changeText: {
    lineHeight: `${theme.typography.fontSize * 4}px`,
  },
  changeButton: {
    width: "140px",
    height: "54px",
    boxShadow: "0px 4px 4px rgba(88, 133, 196, 0.15)",
    marginLeft: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(4)
    }
  },
  formBox: {
    margin: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      margin: `${theme.spacing(0)}px ${theme.spacing(7)}px`,
    }
  },
  formTitle: {
    fontSize: theme.typography.fontSize * 1.9,
    fontWeight: "bold",
  },
  forgotPassword: {
    "& p": {
      color: theme.palette.primary["main"]
    }
  },
  loginButton: {
    width: "160px",
    height: "56px",
  }
}));

const AuthForm = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register, login, isLoginPage } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Box py={4} px={5}>
      <Grid container justify="center">
        <Box className={classes.contentBox}>
          <Grid
            container
            item
            justifyContent="flex-end"
            className={classes.topWrapper}
          >
            <Grid item>
              <Typography
                color="secondary"
                align="center"
                className={classes.changeText}
              >
                {isLoginPage ? "Don't have an account?" : "Already have an account?"}
              </Typography>
            </Grid>
            <Grid item>
              <Box textAlign="center">
                <Button
                  color="primary"
                  onClick={() => history.push(isLoginPage ? "/register" : "/login")}
                  className={classes.changeButton}
                >
                  {isLoginPage ? "Create account": "Login"}
                </Button>
              </Box>
            </Grid>
          </Grid>
          <form
            onSubmit={isLoginPage ? handleLogin : handleRegister}
            className={classes.formBox}
          >
            <Grid>
              <Grid>
                <Typography className={classes.formTitle}>
                  {isLoginPage ? "Welcome back!" : "Create an account."}
                </Typography>
              </Grid>
              <Grid>
                <Box mt={2}>
                  <FormControl fullWidth={true}>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      />
                  </FormControl>
                </Box>
              </Grid>
              {!isLoginPage && (
                <Grid>
                  <Box mt={5}>
                    <FormControl fullWidth={true}>
                      <TextField
                        label="E-mail address"
                        aria-label="e-mail address"
                        type="email"
                        name="email"
                      />
                    </FormControl>
                  </Box>
                </Grid>
              )}
              <Grid>
                <Box mt={5}>
                  <FormControl
                    error={!!formErrorMessage.confirmPassword}
                    fullWidth={true}
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      inputProps={{ minLength: 6 }}
                      endAdornment={isLoginPage && 
                        <InputAdornment position="end" className={classes.forgotPassword}>
                          Forgot?
                        </InputAdornment>
                      }
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>
              {!isLoginPage && (
                <Grid>
                  <Box mt={5}>
                    <FormControl
                      error={!!formErrorMessage.confirmPassword}
                      fullWidth={true}
                    >
                      <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                      <Input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        inputProps={{ minLength: 6 }}
                      />
                      <FormHelperText>
                        {formErrorMessage.confirmPassword}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Grid>
              )}
              <Grid>
                <Box mt={5} textAlign="center">
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.loginButton}
                  >
                    {isLoginPage ? "Login" : "Create"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);