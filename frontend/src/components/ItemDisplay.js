import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

const ItemDisplay = ({ items }) => {
    return (
        <Container sx={{ marginTop: 4 }}>
            <Grid container spacing={2}>
                {items.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ItemDisplay;
