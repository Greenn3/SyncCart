import { useState } from "react";
import { createItem } from "../api/items";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ItemForm = ({ onItemCreated, listId }) => {
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
            const response = await createItem({ name, listId });
            onItemCreated(response.data);
            setName("");
            handleClose();
        } catch (error) {
            console.error("Błąd przy dodawaniu pozycji:", error);
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
                <DialogTitle>Dodaj nowy przedmiot</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nazwa przedmiotu"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Anuluj</Button>
                        <Button type="submit" variant="contained" color="primary">
                            Dodaj przedmiot
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ItemForm;
