import { useState } from "react";
import { createItem } from "../api/items";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ItemForm = ({ onItemCreated, listId }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [store, setStore] = useState("");
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
            const response = await createItem({ name, listId, quantity, price, store });
            onItemCreated(response.data);
            setName("");
            setQuantity("");
            setPrice("");
            setStore("")
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
                            label="Nazwa"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Ilość"
                            fullWidth
                            variant="outlined"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Cena"
                            fullWidth
                            variant="outlined"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Sklep"
                            fullWidth
                            variant="outlined"
                            value={store}
                            onChange={(e) => setStore(e.target.value)}
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
