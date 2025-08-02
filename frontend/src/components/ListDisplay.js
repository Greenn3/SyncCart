import {Container, Grid, Card, CardContent, Typography, Button} from '@mui/material';

const ListDisplay = ({ lists, onListSelect, selectedListId, onDelete }) => {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Grid container spacing={2}>
                {Array.isArray(lists) &&
                    lists.map((list) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={list.id}>
                            <Card 
                                elevation={3} 
                                onClick={() => onListSelect(list.id)}
                                sx={{ 
                                    cursor: 'pointer', 
                                    '&:hover': { backgroundColor: '#f5f5f5' },
                                    backgroundColor: selectedListId === list.id ? '#e3f2fd' : 'white',
                                    border: selectedListId === list.id ? '2px solid #1976d2' : 'none',
                                    transform: selectedListId === list.id ? 'scale(1.02)' : 'scale(1)',
                                    transition: 'all 0.2s ease-in-out',
                                     height: 200, width: 200,  padding: 2
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        if (window.confirm("Czy na pewno chcesz usunąć tę listę?")) {
                                            onDelete(list.id);
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
                                    <Typography variant="h6">{list.name}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
            </Grid>

        </Container>
    );
};

export default ListDisplay;
