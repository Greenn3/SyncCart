import { useState } from "react";
import { createList } from "../api/lists";
import { 
    Button, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    TextField, 
    Fab,
    InputAdornment
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

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
                    <ShoppingBasketIcon />
                    Dodaj nową listę zakupów
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent sx={{ pt: 3 }}>
                        <TextField
                            autoFocus
                            label="Nazwa listy"
                            fullWidth
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            helperText="Wprowadź nazwę nowej listy zakupów"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ShoppingBasketIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
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
                            Dodaj listę
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ListForm;
