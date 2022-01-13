import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthForm from "./components/Auth/AuthForm";
import AuthImage from "./components/Auth/AuthImage";

const useStyles = makeStyles((theme) => ({
  heightVh: {
    height: "100vh"
  },
}));

const Auth = (props) => {
  const classes = useStyles();
  const { isLoginPage = true } = props;

  return (
    <Grid container className={classes.heightVh}>
      <Grid item xs={0} md={4}>
        <AuthImage />
      </Grid>
      <Grid item xs={12} md={8}>
        <AuthForm isLoginPage={isLoginPage} />
      </Grid>
    </Grid>
  );
};

export default Auth;
