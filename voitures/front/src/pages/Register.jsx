import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    })

    if (response.ok) {
      navigate('/login');
    } else {
      alert("Une erreur est survenue");
    }

  }

  return (
    <section>
      <h1>Inscription</h1>
      <p>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Prénom
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          Nom
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn">
          S’inscrire
        </button>
      </form>
    </section>
  )
}

export default Register
