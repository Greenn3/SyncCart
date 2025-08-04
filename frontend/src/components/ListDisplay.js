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
    useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const ListDisplay = ({ lists, onListSelect, selectedListId, onDelete }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [listToDelete, setListToDelete] = useState(null);
    const theme = useTheme();

    const handleDeleteClick = (event, listId) => {
        event.stopPropagation(); // Prevent card click
        setListToDelete(listId);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (listToDelete) {
            onDelete(listToDelete);
            setDeleteDialogOpen(false);
            setListToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setListToDelete(null);
    };

    return (
        <>
            <Grid container spacing={3}>
                {Array.isArray(lists) &&
                    lists.map((list) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={list.id}>
                            <Card 
                                elevation={0} 
                                onClick={() => onListSelect(list.id)}
                                sx={{ 
                                    cursor: 'pointer', 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    '&:hover': { 
                                        backgroundColor: 'rgba(248, 249, 250, 0.9)',
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.06)'
                                    },
                                    backgroundColor: selectedListId === list.id 
                                        ? `rgba(${parseInt(theme.palette.primary.light.slice(1, 3), 16)}, 
                                           ${parseInt(theme.palette.primary.light.slice(3, 5), 16)}, 
                                           ${parseInt(theme.palette.primary.light.slice(5, 7), 16)}, 0.1)` 
                                        : 'rgba(255, 255, 255, 0.7)',
                                    border: selectedListId === list.id 
                                        ? `1px solid ${theme.palette.primary.main}` 
                                        : '1px solid rgba(0, 0, 0, 0.04)',
                                    boxShadow: selectedListId === list.id 
                                        ? `0 0 0 1px ${theme.palette.primary.light}` 
                                        : '0px 1px 3px rgba(0, 0, 0, 0.03)',
                                    transition: 'all 0.2s ease-in-out',
                                    borderRadius: 2,
                                    overflow: 'hidden'
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
                                        onClick={(e) => handleDeleteClick(e, list.id)}
                                        color="error"
                                        sx={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            }
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                                <CardContent sx={{ 
                                    flexGrow: 1, 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 3
                                }}>
                                    <ShoppingBasketIcon 
                                        sx={{ 
                                            fontSize: 48, 
                                            color: theme.palette.primary.main,
                                            mb: 2,
                                            opacity: 0.8
                                        }} 
                                    />
                                    <Typography 
                                        variant="h6" 
                                        component="div" 
                                        align="center"
                                        sx={{ fontWeight: 'medium' }}
                                    >
                                        {list.name}
                                    </Typography>
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
                        Czy na pewno chcesz usunąć tę listę? Tej operacji nie można cofnąć.
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

export default ListDisplay;
