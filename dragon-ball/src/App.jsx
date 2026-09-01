import { useState, useEffect } from 'react'
import "./App.css";

function App() {

  const [characters, setCharacters] = useState([]);

  const fetchCharacters = async () => {
    const response = await fetch("https://dragonball-api.com/api/characters");
    const data = await response.json();
    setCharacters(data.items);
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <div className='grid'>
      {characters.map(character => (
        <div>
          <h2>{character.name}</h2>
          <img src={character.image} alt={character.name} />
        </div>
      ))}
    </div>
  )
}

export default App
