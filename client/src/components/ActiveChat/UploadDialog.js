import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

const UploadDialog = (props) => {
  const { open, handleCancel, handleClose, handleUpload } = props;

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can upload multiple images
        </DialogContentText>
        <input
          type="file"
          name="file"
          placeholder="Upload"
          multiple
          onChange={handleUpload}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDialog;
