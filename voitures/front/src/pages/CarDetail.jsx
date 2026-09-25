import { Link, useParams } from 'react-router'
import { useState, useEffect } from 'react';

function CarDetail() {
  const { id } = useParams()

  const [car, setCar] = useState({});

  const fetchCar = async () => {
    const response = await fetch(`http://localhost:3000/cars/${id}`);
    const data = await response.json();
    setCar(data);
  }

  useEffect(() => {
    fetchCar();
  }, []);

  return (
    <section>
      <Link to="/cars" className="back">
        ← Retour à la liste
      </Link>

      <h1>Détail voiture #{id}</h1>

      {!car ? (
        <p className="empty">Données à récupérer via l’API (GET /cars/{id}).</p>
      ) : (
        <div>
          <p>
            <strong>Marque :</strong> {car.brand}
          </p>
          <p>
            <strong>Modèle :</strong> {car.model}
          </p>
          <p>
            <strong>Année :</strong> {car.year}
          </p>
        </div>
      )}
    </section>
  )
}

export default CarDetail
