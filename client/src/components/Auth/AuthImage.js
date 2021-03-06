import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImg from "../../assets/bg-img.png";
import bubble from "../../assets/bubble.svg";

const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    height: "100%",
    backgroundImage: `url(${bgImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "none",
    [theme.breakpoints.up('md')]: {
      display: "block",
    },
  },
  backdrop: {
    height: "100%",
    background: "linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)",
    opacity: "0.85",
    padding: `${theme.spacing(0)}px ${theme.spacing(2)}px`
  },
  height: {
    height: "100%"
  },
  typography: {
    marginTop: theme.spacing(4),
    color: "white",
  },
}));

const AuthImage = (props) => {
  const classes = useStyles();

  return (
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
  );
}

export default AuthImage;