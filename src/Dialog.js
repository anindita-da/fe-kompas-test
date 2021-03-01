import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const defaultState = {
  name: "",
  cost: 0,
  created_at: null,
};
export function CustomizedDialogs({
  open,
  handleClose,
  handleSubmit,
  defaultState,
}) {
  const [state, setState] = React.useState(defaultState);
  const _handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      if (handleSubmit) {
        handleSubmit({ ...state, created_at: new Date() });
      }
      setState(defaultState);
    },
    [handleSubmit, setState, state, defaultState]
  );
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Tambah Entri
        </DialogTitle>
        <form onSubmit={_handleSubmit}>
          <DialogContent>
            <TextField
              id="standard-full-width"
              label="Nama"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={state.name}
              onChange={(e) =>
                setState((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <TextField
              id="standard-number"
              label="Harga"
              type="number"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={state.cost}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  cost: Number(e.target.value) || 0,
                }))
              }
            />
          </DialogContent>

          <DialogActions>
            <Button
              variant="text"
              size="small"
              type="reset"
              onClick={() => setState(defaultState)}
            >
              BATAL
            </Button>
            <Button
              autoFocus
              type="submit"
              color="primary"
              variant="contained"
              size="small"
            >
              KIRIM
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

CustomizedDialogs.defaultProps = {
  defaultState,
};
