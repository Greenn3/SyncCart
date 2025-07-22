import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');

  // GET /items
  useEffect(() => {
    fetch('http://localhost:8080/items')
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(err => console.error('Błąd przy pobieraniu:', err));
  }, []);

  // POST /items
  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name };

    fetch('http://localhost:8080/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
        .then(res => res.json())
        .then(data => {
          setItems([...items, data]); // dodaj do listy
          setName(''); // wyczyść input
        })
        .catch(err => console.error('Błąd przy dodawaniu:', err));
  };

  return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h2>Lista produktów</h2>

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
