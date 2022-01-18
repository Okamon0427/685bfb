import React, { useState } from "react";
import {
  FormControl,
  FilledInput,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import UploadDialog from "./UploadDialog";
import { uploadImages } from "../../helpers/function";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  },
  inputFile: {
    display: "none"
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setFiles([]);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = (event) => {
    setFiles(event.target.files);
  }

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let attachments;
    if (files.length > 0) {
      attachments = await uploadImages(files);
    }

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: attachments ? attachments : null
    };
    await postMessage(reqBody);
    setText("");
    setFiles([]);
  };

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="image upload"
                  onClick={handleOpen}
                >
                  <FilterNoneIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
      <UploadDialog
        open={open}
        handleCancel={handleCancel}
        handleClose={handleClose}
        handleUpload={handleUpload}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
