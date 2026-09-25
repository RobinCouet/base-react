import { Link } from 'react-router'

function Home() {
  return (
    <section>
      <h1>Garage</h1>
      <p>Front React branché plus tard sur l’API <code>prepa2/api</code>.</p>
      <ul className="home-links">
        <li>
          <Link to="/cars">Voir les voitures</Link>
        </li>
        <li>
          <Link to="/cars/create">Ajouter une voiture</Link>
        </li>
        <li>
          <Link to="/register">Créer un compte</Link>
        </li>
        <li>
          <Link to="/login">Se connecter</Link>
        </li>
      </ul>
    </section>
  )
}

export default Home
