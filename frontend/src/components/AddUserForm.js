import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Fab, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { addUserToList } from "../api/lists";

const AddUserForm = ({ listId }) => {
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
        try {
            await addUserToList(listId, id);
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
                aria-label="add user"
                onClick={handleOpen}
                size="medium"
                sx={{ 
                    boxShadow: 3,
                    '&:hover': {
                        boxShadow: 6
                    }
                }}
            >
                <PersonAddIcon />
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
                    <PersonAddIcon />
                    Dodaj użytkownika do listy
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent sx={{ pt: 3 }}>
                        <TextField
                            autoFocus
                            label="Identyfikator użytkownika"
                            fullWidth
                            variant="outlined"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                            helperText="Wprowadź identyfikator użytkownika, którego chcesz dodać do listy"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonAddIcon color="primary" />
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
                            Dodaj użytkownika
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default AddUserForm;
