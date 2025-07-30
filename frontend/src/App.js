import { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import {
    Typography,
    AppBar,
    CardActions,
    CardContent,
    CardMedia,
    CssBaseline,
    Grid,
    Toolbar,
    Container,
    Box, Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListForm from "./components/ListForm";
import ListDisplay from "./components/ListDisplay";
import {getAllLists} from "./api/lists";
import {deleteItem, getItemsByListId} from "./api/items";
import ItemForm from "./components/ItemForm";
import ItemDisplay from "./components/ItemDisplay";
import {attachIdToken, clearIdToken} from "./axiosInstance";
import {sendIdTokenToBackend} from "./api/users";
function App() {

    const [name, setName] = useState('');
    const [user, setUser] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
    const [lists, setLists] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);


    const handleListCreated = (newList) => {
        setLists((prev) => [...prev, newList]);
    };
    const fetchLists = async () => {
        try {
            const res = await getAllLists(); // z API
            setLists(res.data);
        } catch (err) {
            console.error("Błąd przy pobieraniu list:", err);
        }
    };
    const handleItemDelete = async (itemId) => {
        try {
            await deleteItem(itemId); // wykonaj zapytanie do API
            // Odśwież listę itemów lokalnie
            setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        } catch (error) {
            console.error("Błąd przy usuwaniu elementu:", error);
        }
    };

    useEffect(() => {
        if (selectedListId) {
            getItemsByListId(selectedListId)
                .then((res) => setItems(res.data))
                .catch((err) => console.error("Błąd przy pobieraniu przedmiotu:", err));
        } else {
            setItems([]);
        }
    }, [selectedListId]);

    const handleItemCreated = (newItem) => {
        setItems((prev) => [...prev, newItem]);
    };

    useEffect(() => {
        if (user) {
            fetchLists();  // tylko jeśli ktoś zalogowany
        } else {
            setLists([]);  // wyczyść po wylogowaniu
        }
    }, [user]);


    const handleLoginSuccess = async (credentialResponse) => {
        const idToken = credentialResponse.credential;
        setUser(jwtDecode(idToken));
        attachIdToken(idToken);

        try {
            await sendIdTokenToBackend(idToken);
        } catch (err) {
            console.error("Błąd podczas wysyłania tokena:", err);
        }
    };

    const handleLogout = () => {
        googleLogout();
        clearIdToken();
        setUser(null);
        setLists([]);
        setItems([]);
        setSelectedListId(null);
    };

    return (
        <div>
        <CssBaseline/>

            <AppBar position="relative">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

                    {/* Lewa strona */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ShoppingCartIcon sx={{ mr: 1 }} />
                        <Typography variant="h6">SyncCart</Typography>
                    </Box>

                    {/* Prawa strona */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {user ? (
                            <>
                                <Typography variant="body1">
                                    Zalogowano jako: <strong>{user.name}</strong>
                                </Typography>
                                <Button variant="outlined" color="inherit" onClick={handleLogout}>
                                    Wyloguj
                                </Button>
                            </>
                        ) : (
                            <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Login failed")} />
                        )}
                    </Box>

                </Toolbar>
            </AppBar>
            <main>
                <div>
                    <Container>
                        <div style={{ padding: "2rem" }}>

                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                <h1 style={{ marginRight: '1rem' }}>Moje listy zakupów</h1>
                                <ListForm onListCreated={handleListCreated} />
                            </div>
                            <ListDisplay lists={lists} onListSelect={setSelectedListId} selectedListId={selectedListId} />

                            {selectedListId && (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', marginTop: '2rem' }}>
                                        <h1 style={{ marginRight: '1rem' }}>Przedmioty</h1>
                                        <ItemForm onItemCreated={handleItemCreated} listId={selectedListId} />
                                    </div>
                                    <ItemDisplay items={items} onDelete={handleItemDelete}/>
                                </>
                            )}
                        </div>
                    </Container>
                </div>
            </main>

        </div>
    );
}

export default App;
