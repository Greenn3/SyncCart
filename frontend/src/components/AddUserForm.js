import { useState } from "react";
import { createItem } from "../api/items";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {addUserToList} from "../api/lists";

const AddUserForm = ({ onItemCreated, listId }) => {
    const [id, setId] = useState("");
    const [open, setOpen] = useState(false);




    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id.trim()) return;
        try {const response = await addUserToList( listId, id );
           // onItemCreated(response.data);
            setId("");
            handleClose();
        } catch (error) {
            console.error("Błąd przy dodawaniu użytkownika do listy:", error);
        }
    };

    return (
        <>
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleOpen}
                sx={{ marginBottom: 2 }}
            >
                <AddIcon />
            </Fab>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Dodaj użytkownika do listy</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nazwa"
                            fullWidth
                            variant="outlined"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />



                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Anuluj</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Dodaj
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default AddUserForm;
