import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function CarCreate() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/cars", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        brand,
        model,
        year: Number(year)
      })
    })


    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
    } else {
      navigate(`/cars/${data.id}`);
    }
  }

  return (
    <section>
      <Link to="/cars" className="back">
        ← Retour à la liste
      </Link>

      <h1>Ajouter une voiture</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Marque
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </label>

        <label>
          Modèle
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </label>

        <label>
          Année
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn">
          Créer
        </button>
      </form>
    </section>
  )
}

export default CarCreate
