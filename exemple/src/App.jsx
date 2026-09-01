import { useState } from 'react';

/**
 * Composant principal — démonstration des bases de React :
 * affichage de variables, state, événements, listes (.map) et formulaires contrôlés.
 */
function App() {
  // ─── Données statiques ───────────────────────────────────────────────────────
  // Tableau simple : pas de state ici, la liste ne change pas pendant l'exécution.
  const users = [
    { id: 1, name: "Robin" },
    { id: 2, name: "Nassim" },
    { id: 3, name: "Thomas" },
    { id: 4, name: "Coralie" }
  ];

  // Constante classique : valeur fixe, React ne la « surveille » pas.
  const firstName = "Robin";

  // ─── State (useState) ────────────────────────────────────────────────────────
  // useState renvoie un tableau [valeur, fonctionPourLaModifier].
  // Quand on appelle le setter (setLastName, setCounter…), React re-rend le composant.
  //
  // Syntaxe : const [nomDuState, setNomDuState] = useState(valeurParDefaut);

  const [lastName, setLastName] = useState("Couet");
  const [counter, setCounter] = useState(0);
  const [email, setEmail] = useState(); // undefined tant que l'utilisateur n'a rien saisi
  const [message, setMessage] = useState("Je vous contact pour...");

  // ─── Gestionnaires d'événements ─────────────────────────────────────────────
  // Fonctions appelées au clic ou à la soumission du formulaire.

  const changeName = () => {
    setLastName("Lerat"); // met à jour le state → le JSX se rafraîchit
  };

  const increment = () => {
    setCounter(counter + 1);
  };

  const handleSubmit = (e) => {
    // Empêche le rechargement de la page (comportement par défaut d'un <form>)
    e.preventDefault();
    console.log(email, message);
  };

  // ─── Rendu JSX ───────────────────────────────────────────────────────────────
  // Le return doit contenir une seule racine (ici un fragment <>…</>).
  return (
    <>
      {/* Affichage de variables dans le JSX avec les accolades { } */}
      <h1>{firstName}</h1>
      <h2>{lastName}</h2>
      <button onClick={changeName}>Changement de nom</button>

      <p>{counter}</p>
      <button onClick={increment}>Incrémenter</button>

      <br />
      <br />

      {/* Liste : .map() parcourt le tableau et retourne un élément JSX par item */}
      <ul>
        {users.map(user => (
          // idéalement : key={user.id} pour aider React à identifier chaque <li>
          <li>{user.name}</li>
        ))}
      </ul>

      <br />
      <br />

      {/* Formulaire contrôlé : la valeur des champs est liée au state */}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          {/* onChange est déclenché à chaque frappe ; event.target.value = contenu de l'input */}
          <input type="email" onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          Message
          {/* defaultValue = valeur initiale ; onChange synchronise le state à chaque modification */}
          <textarea defaultValue={message} onChange={e => setMessage(e.target.value)} />
        </label>

        <button>Envoyer</button>
      </form>
    </>
  );
}

export default App;
