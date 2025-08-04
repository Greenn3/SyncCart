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
    useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';

const ItemDisplay = ({ items, onDelete }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const theme = useTheme();

    const handleDeleteClick = (event, itemId) => {
        event.stopPropagation();
        setItemToDelete(itemId);
        setDeleteDialogOpen(true);
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
                                backgroundColor: 'rgba(255, 255, 255, 0.7)'
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
                                    onClick={(e) => handleDeleteClick(e, item.id)}
                                    color="error"
                                    sx={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        },
                                        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
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

                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <StoreIcon sx={{ color: theme.palette.text.secondary, mr: 1, fontSize: 20 }} />
                                    <Typography variant="body1">
                                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>Sklep:</Box>
                                        {item.store || 'Nie określono'}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

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
        </>
    );
};

export default ItemDisplay;
