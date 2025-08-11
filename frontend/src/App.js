import { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import {
    Typography,
    AppBar,
    CssBaseline,
    Toolbar,
    Container,
    Box,
    Button,
    Paper,
    Divider,
    Grid,
    Stack,
    useTheme
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListForm from "./components/ListForm";
import ListDisplay from "./components/ListDisplay";
import { deleteList, getAllLists } from "./api/lists";
import { deleteItem, getItemsByListId } from "./api/items";
import ItemForm from "./components/ItemForm";
import ItemDisplay from "./components/ItemDisplay";
import { attachIdToken, clearIdToken } from "./axiosInstance";
import { sendIdTokenToBackend } from "./api/users";
import AddUserForm from "./components/AddUserForm";
function App() {

    const [name, setName] = useState('');
    const [user, setUser] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";
    const [lists, setLists] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedListId, setSelectedListId] = useState(null);

    // Check for existing token on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('google_id_token');
        if (storedToken) {
            try {
                const decodedUser = jwtDecode(storedToken);

                // Check if token is expired
                const currentTime = Date.now() / 1000;
                if (decodedUser.exp && decodedUser.exp < currentTime) {
                    console.log("Token expired, logging out");
                    clearIdToken();
                    return;
                }

                setUser(decodedUser);
                // No need to call attachIdToken since it's already in localStorage
            } catch (error) {
                console.error("Error decoding stored token:", error);
                clearIdToken(); // Clear invalid token
            }
        }
    }, []);


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
  const handleListDelete = async (listId) => {
        try {
            await deleteList(listId); // wykonaj zapytanie do API
            // Odśwież listę itemów lokalnie
            setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
            // Reset selectedListId if the deleted list was selected
            if (selectedListId === listId) {
                setSelectedListId(null);
            }
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

    const handleItemUpdate = (updatedItem) => {
        setItems((prev) => 
            prev.map((item) => 
                item.id === updatedItem.id ? updatedItem : item
            )
        );
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

            <AppBar 
                position="relative" 
                elevation={0} 
                sx={{ 
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)'
                }}
                color="inherit"
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5 }}>
                    {/* Logo and brand */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ShoppingCartIcon sx={{ mr: 1.5, fontSize: 30, color: 'primary.main' }} />
                        <Typography 
                            variant="h5" 
                            component="div" 
                            sx={{ 
                                fontWeight: 'bold',
                                letterSpacing: '0.5px',
                                color: 'primary.main'
                            }}
                        >
                            SyncCart
                        </Typography>
                    </Box>

                    {/* User authentication */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {user ? (
                            <>
                                <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    Zalogowano jako: <Box component="span" sx={{ fontWeight: 'bold' }}>{user.name}</Box>
                                </Typography>
                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    onClick={handleLogout}
                                    sx={{ 
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        px: 2
                                    }}
                                >
                                    Wyloguj
                                </Button>
                            </>
                        ) : (
                            <GoogleLogin 
                                onSuccess={handleLoginSuccess} 
                                onError={() => console.log("Login failed")} 
                            />
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <main>
                <Container maxWidth="lg" sx={{ py: 5 }}>
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: 4, 
                            mb: 5, 
                            border: '1px solid rgba(0, 0, 0, 0.04)',
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h5" component="h1" sx={{ flexGrow: 1, fontWeight: 500, color: 'primary.dark' }}>
                                Moje listy zakupów
                            </Typography>
                            <ListForm onListCreated={handleListCreated} />
                        </Box>
                        <ListDisplay 
                            lists={lists} 
                            onListSelect={setSelectedListId} 
                            selectedListId={selectedListId} 
                            onDelete={handleListDelete}
                        />
                    </Paper>

                    {selectedListId && (
                        <>
                            <Paper 
                                elevation={0} 
                                sx={{ 
                                    p: 4, 
                                    mb: 5, 
                                    border: '1px solid rgba(0, 0, 0, 0.04)',
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                                    <Typography variant="h5" component="h2" sx={{ flexGrow: 1, fontWeight: 500, color: 'primary.dark' }}>
                                        Przedmioty
                                    </Typography>
                                    <ItemForm onItemCreated={handleItemCreated} listId={selectedListId} />
                                </Box>
                                <ItemDisplay items={items} onDelete={handleItemDelete} onUpdate={handleItemUpdate}/>
                            </Paper>

                            <Paper 
                                elevation={0} 
                                sx={{ 
                                    p: 4, 
                                    border: '1px solid rgba(0, 0, 0, 0.04)',
                                    borderRadius: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Typography variant="h5" component="h3" sx={{ flexGrow: 1, fontWeight: 500, color: 'primary.dark' }}>
                                        Dodaj użytkownika do listy
                                    </Typography>
                                    <AddUserForm listId={selectedListId} />
                                </Box>
                            </Paper>
                        </>
                    )}
                </Container>
            </main>

        </div>
    );
}

export default App;
