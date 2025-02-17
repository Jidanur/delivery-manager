import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  title,
  description,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", padding: 2 }}>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
