import { useState } from 'react';
import { 
    Grid, 
    Card, 
    CardContent, 
    Typography, 
    IconButton, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle, 
    Button,
    Box,
    Chip,
    Divider,
    useTheme,
    Menu,
    MenuItem,
    TextField,
    InputAdornment
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateItem, updateCompleted } from '../api/items';
import axiosInstance from "../axiosInstance";

const ItemDisplay = ({ items, onDelete, onUpdate }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editItemData, setEditItemData] = useState({
        name: "",
        quantity: "",
        price: "",
        store: ""
    });
    const theme = useTheme();

    const handleMenuOpen = (event, item) => {
        event.stopPropagation();
        setMenuAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleDeleteClick = () => {
        setItemToDelete(selectedItem.id);
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleEditClick = () => {
        setEditItemData({
            name: selectedItem.name || "",
            quantity: selectedItem.quantity || "",
            price: selectedItem.price || "",
            store: selectedItem.store || ""
        });
        setEditDialogOpen(true);
        handleMenuClose();
    };

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            onDelete(itemToDelete);
            setDeleteDialogOpen(false);
            setItemToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editItemData.name.trim()) return;

        try {
            const response = await updateItem(selectedItem.id, {
                ...editItemData,
                listId: selectedItem.listId,
                id: selectedItem.id
            });

            // Notify parent component about the update
            if (onUpdate) {
                onUpdate(response.data);
            }

            setEditDialogOpen(false);
        } catch (error) {
            console.error("Błąd przy aktualizacji przedmiotu:", error);
        }
    };

    async function handleCompleteClick() {
        try {
            const newCompletedStatus = !selectedItem.completed;
            const response = await updateCompleted(selectedItem.id, newCompletedStatus);

            // Notify parent component about the update
            if (onUpdate) {
                onUpdate(response.data);
            }

            handleMenuClose();
        } catch (error) {
            console.error("Błąd przy aktualizacji statusu ukończenia:", error);
        }
    }

    return (
        <>
            <Grid container spacing={3}>
                {items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card 
                            elevation={0}
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                '&:hover': { 
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.06)'
                                },
                                transition: 'all 0.2s ease-in-out',
                                borderRadius: 2,
                                overflow: 'hidden',
                                border: '1px solid rgba(0, 0, 0, 0.04)',
                                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.03)',
                                backgroundColor: item.completed ? 'rgba(220, 220, 220, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                                opacity: item.completed ? 0.8 : 1
                            }}
                        >
                            <Box sx={{ 
                                position: 'absolute', 
                                top: 8, 
                                right: 8, 
                                zIndex: 1 
                            }}>
                                <IconButton
                                    size="small"
                                    onClick={(e) => handleMenuOpen(e, item)}
                                    color="primary"
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        },
                                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
                                    }}
                                >
                                    <MoreVertIcon fontSize="small" />
                                </IconButton>
                            </Box>

                            <Box sx={{ 
                                background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main}90)`,
                                color: 'white',
                                py: 1.5,
                                px: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                borderBottom: '1px solid rgba(0, 0, 0, 0.04)'
                            }}>
                                <ShoppingCartIcon sx={{ opacity: 0.9 }} />
                                <Typography 
                                    variant="h6" 
                                    component="div" 
                                    sx={{ 
                                        fontWeight: 500,
                                        fontSize: '1.1rem',
                                        textAlign: 'center',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)'
                                    }}
                                >
                                    {item.name}
                                </Typography>
                            </Box>

                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <InventoryIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
                                    <Typography variant="body1">
                                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Ilość:</Box>
                                        {item.quantity || 'Nie określono'}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <LocalOfferIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
                                    <Typography variant="body1">
                                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Cena:</Box>
                                        {item.price ? `${item.price} zł` : 'Nie określono'}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center',  mb: 1.5 }}>
                                    <StoreIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
                                    <Typography variant="body1">
                                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Sklep:</Box>
                                        {item.store || 'Nie określono'}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckCircleIcon sx={{ color: item.completed ? 'success.main' : theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
                                    <Typography variant="body1">
                                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Ukończono:</Box>
                                        {item.completed ? 'Tak' : 'Nie'}
                                    </Typography>
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Menu */}
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 2,
                    sx: {
                        borderRadius: 2,
                        minWidth: 120,
                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)'
                    }
                }}
            >
                <MenuItem onClick={handleEditClick} sx={{ gap: 1 }}>
                    <EditIcon fontSize="small" color="primary" />
                    <Typography>Modyfikuj</Typography>
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ gap: 1 }}>
                    <DeleteIcon fontSize="small" color="error" />
                    <Typography>Usuń</Typography>
                </MenuItem>
                <MenuItem onClick={handleCompleteClick} sx={{ gap: 1 }}>
                    <CheckCircleIcon fontSize="small" color="success" />
                    <Typography>{selectedItem && selectedItem.completed ? 'Oznacz jako nieukończone' : 'Oznacz jako ukończone'}</Typography>
                </MenuItem>
            </Menu>

            {/* Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        borderRadius: 2,
                        border: '1px solid rgba(0, 0, 0, 0.04)',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)'
                    }
                }}
            >
                <DialogTitle sx={{ 
                    pb: 1, 
                    color: 'primary.dark',
                    fontWeight: 500
                }}>
                    Potwierdź usunięcie
                </DialogTitle>
                <DialogContent sx={{ pt: 2, pb: 3 }}>
                    <DialogContentText sx={{ color: 'text.secondary' }}>
                        Czy na pewno chcesz usunąć ten przedmiot? Tej operacji nie można cofnąć.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button 
                        onClick={handleCancelDelete} 
                        color="primary"
                        variant="outlined"
                        sx={{ 
                            borderRadius: 2,
                            px: 3
                        }}
                    >
                        Anuluj
                    </Button>
                    <Button 
                        onClick={handleConfirmDelete} 
                        color="error" 
                        variant="contained"
                        sx={{ 
                            borderRadius: 2,
                            boxShadow: '0px 2px 4px rgba(211, 47, 47, 0.2)',
                            px: 3
                        }}
                    >
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog 
                open={editDialogOpen} 
                onClose={handleEditDialogClose}
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
                    <EditIcon />
                    Modyfikuj przedmiot
                </DialogTitle>
                <form onSubmit={handleEditSubmit}>
                    <DialogContent sx={{ pt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    label="Nazwa przedmiotu"
                                    fullWidth
                                    variant="outlined"
                                    value={editItemData.name}
                                    onChange={(e) => setEditItemData({...editItemData, name: e.target.value})}
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
                                    value={editItemData.quantity}
                                    onChange={(e) => setEditItemData({...editItemData, quantity: e.target.value})}
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
                                    value={editItemData.price}
                                    onChange={(e) => setEditItemData({...editItemData, price: e.target.value})}
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
                                    value={editItemData.store}
                                    onChange={(e) => setEditItemData({...editItemData, store: e.target.value})}
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
                            onClick={handleEditDialogClose} 
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
                            Zapisz zmiany
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default ItemDisplay;
