import { Link } from 'react-router'
import { useState, useEffect } from 'react';

function Cars() {
  // Placeholder — à remplacer par un fetch GET /cars
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const response = await fetch("http://localhost:3000/cars");
    const data = await response.json();
    setCars(data);
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <section>
      <div className="page-header">
        <h1>Voitures</h1>
        <Link to="/cars/create" className="btn">
          Ajouter une voiture
        </Link>
      </div>

      {cars.length === 0 ? (
        <p className="empty">Aucune voiture pour l’instant (API à brancher).</p>
      ) : (
        <ul className="list">
          {cars.map((car) => (
            <li key={car.id}>
              <Link to={`/cars/${car.id}`}>
                {car.brand} {car.model} ({car.year})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Cars
