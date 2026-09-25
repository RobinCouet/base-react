import { Link } from 'react-router'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Garage
      </Link>
      <div className="navbar-links">
        <Link to="/cars">Voitures</Link>
        <Link to="/cars/create">Ajouter</Link>
        <Link to="/register">Inscription</Link>
        <Link to="/login">Connexion</Link>
      </div>
    </nav>
  )
}

export default Navbar
