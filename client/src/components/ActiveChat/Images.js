import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  image: {
    borderRadius: "5px",
    marginLeft: "10px"
  }
}));

const Images = (props) => {
  const classes = useStyles();
  const { attachments } = props;

  return (
    <Grid>
      {attachments.map((attachment, index) => {
        return (
          <img
            key={attachment}
            className={classes.image}
            width={150}
            src={attachment}
            alt=""
          />
        )
      })}
    </Grid>
  );
};

export default Images;
