import React from "react";
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
  TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register, login } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  contentWrapper: {
    padding: "30px 42px"
  },
  contentBox: {
    width: "100%"
  },
  topWrapper: {
    marginBottom: "86px"
  },
  changeText: {
    lineHeight: "54px",
    color: "#B0B0B0"
  },
  changeButton: {
    width: "140px",
    height: "54px",
    position: "absolute",
    right: "42px",
    boxShadow: "0px 4px 4px rgba(88, 133, 196, 0.15)"
  },
  formBox: {
    marginRight: "80px",
    marginLeft: "55px"
  },
  formTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  formContent1: {
    marginTop: "12px"
  },
  formContent2: {
    marginTop: "40px"
  },
  forgotPassword: {
    "& p": {
      color: "#3A8DFF"
    }
  },
  loginButtonWrapper: {
    textAlign: "center"
  },
  loginButton: {
    width: "160px",
    height: "56px",
    marginTop: "40px"
  }
}));

const AuthForm = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register, login, isLoginPage } = props;

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

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
    <Grid container justify="center" className={classes.contentWrapper}>
      <Box className={classes.contentBox}>
        <Grid
          container
          item
          justifyContent="center"
          className={classes.topWrapper}
        >
          <Typography className={classes.changeText}>
            {isLoginPage ? "Don't have an account?" : "Already have an account?"}
          </Typography>
          <Button
            color="primary"
            onClick={() => history.push(isLoginPage ? "/register" : "/login")}
            className={classes.changeButton}
          >
            {isLoginPage ? "Create account": "Login"}
          </Button>
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
              <FormControl fullWidth={true} className={classes.formContent1}>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            {!isLoginPage && (
              <Grid>
                <FormControl fullWidth={true} className={classes.formContent2}>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                  />
                </FormControl>
              </Grid>
            )}
            <Grid>
              <FormControl
                fullWidth={true}
                className={classes.formContent2}
              >
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type="password"
                  name="password"
                  inputProps={{ minLength: 6 }}
                  endAdornment={isLoginPage && 
                    <InputAdornment position="end" className={classes.forgotPassword}>
                      Forgot?
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid className={classes.loginButtonWrapper}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                className={classes.loginButton}
              >
                {isLoginPage ? "Login" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
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