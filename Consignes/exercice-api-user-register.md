# 🟡 Exercice (suite) : Register — User

## 🎯 Objectif

Ajouter l’inscription d’un utilisateur sur ton API.

Pour l’instant, **uniquement** :

- un **model** `User`
- un **controller** avec une méthode `register`
- une **route** `POST` pour s’inscrire

Champs demandés :

| Champ | Description |
|-------|-------------|
| `email` | adresse e-mail |
| `nom` | nom de famille |
| `prenom` | prénom |
| `password` | mot de passe **en clair** |

⚠️ Pas de hash pour l’instant (on stocke le mot de passe tel quel).  
On sécurisera plus tard. Pas de login non plus dans cet exo.

---

## 📁 Fichiers à créer / modifier

```text
api/
├── models/
│   ├── User.js          ← à créer
│   └── index.js         ← à mettre à jour
├── controllers/
│   └── user.controller.js   ← à créer
├── routes/
│   └── user.js              ← à créer
└── index.js                 ← brancher la route user
```

---

## 🟢 Partie 1 — Model `User`

Crée `models/User.js` sur le même principe que tes autres models (ex. `Car`, `Player`…).

Champs minimum :

| Champ | Type Sequelize | Obligatoire |
|-------|----------------|-------------|
| `email` | `DataTypes.STRING` | oui |
| `nom` | `DataTypes.STRING` | oui |
| `prenom` | `DataTypes.STRING` | oui |
| `password` | `DataTypes.STRING` | oui |

Bonus recommandé (si tu veux aller un peu plus loin) :

- rendre `email` **unique** (`unique: true` dans le champ) pour éviter deux comptes avec le même mail

N’oublie pas d’exporter le model, puis de l’importer / l’exporter dans `models/index.js` (comme pour tes autres models) pour que `db.sync()` crée la table.

---

## 🟢 Partie 2 — Controller `register`

Crée `controllers/user.controller.js`.

Ajoute **une seule** méthode pour l’instant : `register`.

Elle doit :

1. Récupérer `email`, `nom`, `prenom`, `password` depuis le body de la request
2. Créer l’utilisateur en base avec Sequelize (`create`)
3. Renvoyer l’utilisateur créé en JSON

Structure attendue (à compléter) :

```js
import { User } from '../models/index.js';

class UserController {
    register = async (req, res) => {
        // 1. Lire le body
        // 2. User.create(...)
        // 3. res.json(...)
    }
}

export default new UserController;
```

Rappel : `express.json()` doit déjà être activé dans `index.js` (sinon le body sera vide).

---

## 🟢 Partie 3 — Route register

Crée `routes/user.js` :

| Méthode | URL | Action |
|---------|-----|--------|
| POST | `/register` | inscription |

Branche la route sur `UserController.register`.

Puis, dans `index.js`, importe et utilise ce router (`app.use(...)`).

---

## 🧪 Tester

Avec Thunder Client / Postman / Insomnia :

1. Méthode : `POST`
2. URL : `http://localhost:3000/register`
3. Header : `Content-Type: application/json`
4. Body :

```json
{
  "email": "jean.dupont@email.com",
  "nom": "Dupont",
  "prenom": "Jean",
  "password": "azerty123"
}
```

5. Tu dois recevoir l’utilisateur créé (avec `id`, `createdAt`, etc.)
6. Vérifie en base (table `Users`) que la ligne existe, **mot de passe visible en clair** pour l’instant

---

## 📋 Checklist

- [ ] Model `User` avec `email`, `nom`, `prenom`, `password`
- [ ] Model exporté dans `models/index.js` + table créée via `sync`
- [ ] `user.controller.js` avec `register` uniquement
- [ ] Route `POST /register`
- [ ] Router branché dans `index.js`
- [ ] Un POST de test crée bien un user en base

---

## ⛔ Hors scope pour l’instant

- Pas de hash du mot de passe
- Pas de login / JWT / session
- Pas de `GET` / `PUT` / `DELETE` sur les users
- Pas de vérif “email déjà utilisé” obligatoire (sauf si tu as mis `unique` et que tu gères l’erreur)

On ajoutera le hash et le login dans un prochain exercice.
