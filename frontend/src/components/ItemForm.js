import { useState } from "react";
import { createItem } from "../api/items";
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    TextField, 
    Fab, 
    Grid,
    InputAdornment
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StoreIcon from "@mui/icons-material/Store";

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
            setStore("");
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
                sx={{ 
                    boxShadow: 3,
                    '&:hover': {
                        boxShadow: 6
                    }
                }}
            >
                <AddIcon />
            </Fab>

            <Dialog 
                open={open} 
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <ShoppingCartIcon />
                    Dodaj nowy przedmiot
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent sx={{ pt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    label="Nazwa przedmiotu"
                                    fullWidth
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ShoppingCartIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Ilość"
                                    fullWidth
                                    variant="outlined"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <InventoryIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Cena"
                                    fullWidth
                                    variant="outlined"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocalOfferIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: <InputAdornment position="end">zł</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Sklep"
                                    fullWidth
                                    variant="outlined"
                                    value={store}
                                    onChange={(e) => setStore(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <StoreIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3 }}>
                        <Button 
                            onClick={handleClose} 
                            variant="outlined"
                            sx={{ borderRadius: 2 }}
                        >
                            Anuluj
                        </Button>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            sx={{ borderRadius: 2 }}
                        >
                            Dodaj przedmiot
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ItemForm;
