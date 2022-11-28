import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React, { FC } from "react";

type ConfirmationDialogProps = {
    isOpen: boolean;
    title: string;
    content: string | JSX.Element;
    onConfirm: () => unknown;
    onClose: () => unknown;
};

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({ isOpen, title, content, onConfirm, onClose }) => {
    return (
        <Dialog
            maxWidth="md"
            open={isOpen}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={onClose}
                >Cancel</Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={onConfirm}
                >Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;