import { useState } from "react";
import { createList } from "../api/lists";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ListForm = ({ onListCreated }) => {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            const response = await createList({ name });
            onListCreated(response.data);
            setName("");
            handleClose();
        } catch (error) {
            console.error("Błąd przy dodawaniu listy:", error);
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
                <DialogTitle>Dodaj nową listę</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nazwa listy"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Anuluj</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Dodaj listę
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ListForm;
