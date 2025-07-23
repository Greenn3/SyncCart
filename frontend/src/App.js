import { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


function App() {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [user, setUser] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

    // GET /items
    useEffect(() => {
        fetch(`${API_URL}/items`)
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error('Błąd przy pobieraniu:', err));
    }, []);

    // POST /items
    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = { name };

        fetch(`${API_URL}/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem),
        })
            .then(res => res.json())
            .then(data => {
                setItems([...items, data]);
                setName('');
            })
            .catch(err => console.error('Błąd przy dodawaniu:', err));
    };

    const handleLoginSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        setUser(decoded);
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
    };

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h2>Lista produktów</h2>

            {user ? (
                <div style={{ marginBottom: '1rem' }}>
                    <p>Zalogowano jako: <strong>{user.name}</strong></p>
                    <button onClick={handleLogout}>Wyloguj</button>
                </div>
            ) : (
                <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Login failed")} />
            )}

            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Nowy produkt"
                />
                <button type="submit">Dodaj</button>
            </form>
        </div>
    );
}

export default App;
