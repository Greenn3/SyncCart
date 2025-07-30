import {Container, Grid, Card, CardContent, Typography, Button, Fab} from '@mui/material';
import axiosInstance from "../axiosInstance";
import {deleteItem} from "../api/items";

const ItemDisplay = ({ items, onDelete }) => {

    // const handleDelete = async (itemId) =>{
    //     try{
    //     const response = await deleteItem(itemId)
    //     //onItemDeleted(response.data);
    //  }catch (error) {
    //     console.error("Błąd przy usuwaniu elementu:", error);
    // }
    // }

    return (
        <Container sx={{ marginTop: 4 }}>
            <Grid container spacing={2}>
                {items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card elevation={3}
                              sx={{ height: 200, width: 200,  padding: 2 }}>
                            <Button
                                onClick={() => {
                                    if (window.confirm("Czy na pewno chcesz usunąć ten element?")) {
                                        onDelete(item.id);
                                    }
                                }}
                                sx={{
                                    position: 'relative',
                                    top: 2,
                                    left: 150,
                                    minWidth: 'unset',
                                    padding: '4px',
                                    lineHeight: 1
                                }}
                                variant="text"
                                color="error"
                            >
                                X
                            </Button>
                            <CardContent>
                                <Typography align="center" variant="h6">{item.name}</Typography>
                                <Typography variant="body1"><strong>Ilość: </strong> {item.quantity}</Typography>
                                <Typography variant="body1"><strong>Cena: </strong> {item.price}</Typography>
                                <Typography variant="body1"><strong>Sklep: </strong> {item.store}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ItemDisplay;
