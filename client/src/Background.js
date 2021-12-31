import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImg from "./assets/bg-img.png";
import bubble from "./assets/bubble.svg";

const useStyles = makeStyles((theme) => ({
  heightVh: {
    height: "100vh"
  },
  height: {
    height: "100%"
  },
  backgroundImage: {
    height: "100%",
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat"
  },
  backdrop: {
    height: "100%",
    background: "linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)",
    opacity: "0.85",
    padding: "0 1rem"
  },
  typography: {
    marginTop: "2rem",
    color: "#FFFFFF",
  }
}));

const Background = (props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.heightVh}>
      <Grid item xs={4}>
        <div className={classes.backgroundImage}>
          <div className={classes.backdrop}>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              className={classes.height}
            >
              <img src={bubble} alt="Bubble" />
              <Typography align="center" variant="h5" className={classes.typography}>
                Converse with anyone <br/>with any language
              </Typography>
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid item xs={8}>{props.children}</Grid>
    </Grid>
  );
};

export default Background;
