# 🟡 Exercice : API Express — Joueurs & Équipes

## 🎯 Objectif

Reproduire la même architecture que l’exemple `api` (voitures), mais avec **deux ressources** :

- 👥 **Joueurs**
- 🛡️ **Équipes**

Tu dois avoir :

- **2 routers**
- **2 controllers**
- **pas de model** pour l’instant (données en dur dans les controllers)
- un `index.js` qui branche les deux routers

À la fin, ton API doit répondre en JSON sur plusieurs URLs.

---

## 📦 Préparation

1. Crée un dossier (ex. `api-sport` ou `api`).
2. Initialise le projet :

```bash
npm init -y
```

3. Active les modules ES dans `package.json` :

```json
{
  "type": "module"
}
```

4. Installe Express :

```bash
npm install express
```

5. Si ce n’est pas déjà fait, installe Nodemon en global :

```bash
npm install -g nodemon
```

6. Lance le serveur avec :

```bash
nodemon index.js
```

---

## 📁 Structure attendue

```text
api/
├── index.js
├── package.json
├── routes/
│   ├── player.js
│   └── team.js
└── controllers/
    ├── player.controller.js
    └── team.controller.js
```

⚠️ Pas de dossier `models` pour cet exercice.

---

## 🟢 Partie 1 — Point d’entrée (`index.js`)

### Consigne

1. Importe Express.
2. Crée l’app : `const app = express()`.
3. Importe les **deux** routers (joueurs + équipes).
4. Branche-les avec `app.use(...)`.
5. Démarre le serveur sur le port `3000`.

Exemple d’idée (à adapter) :

```js
import express from 'express';
import playerRoutes from './routes/player.js';
import teamRoutes from './routes/team.js';

const app = express();

app.use(playerRoutes);
app.use(teamRoutes);

app.listen(3000, () => {
    console.log("API démarrée sur http://localhost:3000");
});
```

---

## 🟢 Partie 2 — Joueurs (👥)

### Router : `routes/player.js`

Crée un `Router` Express avec au moins :

| Méthode | URL | Controller |
|---------|-----|------------|
| GET | `/players` | liste de tous les joueurs |
| GET | `/players/single` | un seul joueur |

### Controller : `controllers/player.controller.js`

Crée une classe `PlayerController` avec :

- `getAll` → renvoie un **tableau** de joueurs en JSON
- `getOnePlayer` → renvoie **un objet** joueur en JSON

Données en dur (exemple libre, adapte si tu veux) :

```js
[
  { name: "Kylian Mbappé", position: "Attaquant", number: 10 },
  { name: "Antoine Griezmann", position: "Milieu offensif", number: 7 },
  { name: "Thibaut Courtois", position: "Gardien", number: 1 }
]
```

Rappel :

- `req` = données reçues
- `res` = réponse à envoyer
- utilise `res.json(...)`

Exporte une **instance** : `export default new PlayerController;`

---

## 🟢 Partie 3 — Équipes (🛡️)

### Router : `routes/team.js`

| Méthode | URL | Controller |
|---------|-----|------------|
| GET | `/teams` | liste de toutes les équipes |
| GET | `/teams/single` | une seule équipe |

### Controller : `controllers/team.controller.js`

Crée une classe `TeamController` avec :

- `getAll` → tableau d’équipes
- `getOneTeam` → une équipe

Exemple de données :

```js
[
  { name: "Real Madrid", country: "Espagne", stadium: "Santiago Bernabéu" },
  { name: "PSG", country: "France", stadium: "Parc des Princes" },
  { name: "FC Barcelone", country: "Espagne", stadium: "Spotify Camp Nou" }
]
```

Même principe que les joueurs : pas de base de données, tout est écrit dans le controller.

---

## ✅ Endpoints à tester

Une fois le serveur lancé (`nodemon index.js`) :

| URL | Résultat attendu |
|-----|------------------|
| `http://localhost:3000/players` | tableau JSON de joueurs |
| `http://localhost:3000/players/single` | un objet joueur |
| `http://localhost:3000/teams` | tableau JSON d’équipes |
| `http://localhost:3000/teams/single` | un objet équipe |

Tu peux tester dans le navigateur (GET) ou avec Thunder Client / Postman.

---

## 🧠 Rappels d’architecture

```text
Requête GET /players
        ↓
index.js  →  app.use(playerRoutes)
        ↓
routes/player.js  →  router.get('/players', ...)
        ↓
controllers/player.controller.js  →  getAll
        ↓
res.json([...])
```

| Fichier | Rôle |
|---------|------|
| `routes/*.js` | Quelles URLs ? Quelles méthodes HTTP ? |
| `controllers/*.js` | Quelle logique / quelles données renvoyer ? |

---

## 📋 Checklist de validation

- [ ] `"type": "module"` dans `package.json`
- [ ] Express installé
- [ ] `index.js` démarre sur le port 3000
- [ ] 2 fichiers dans `routes/`
- [ ] 2 fichiers dans `controllers/`
- [ ] **Aucun** model
- [ ] `/players` et `/players/single` fonctionnent
- [ ] `/teams` et `/teams/single` fonctionnent
- [ ] Les réponses sont bien en JSON

---

## 🚀 Bonus (optionnel)

Si tu finis plus tôt :

1. Ajoute une 3e route sur chaque ressource (ex. `/players/captain`, `/teams/champions`)
2. Ajoute un champ dans tes objets (âge du joueur, année de fondation de l’équipe…)
3. Dans `getAll`, renvoie au moins **3** éléments par ressource

---

## ⛔ À ne pas faire pour l’instant

- Pas de base de données
- Pas de dossier `models`
- Pas de `POST` / `PUT` / `DELETE` (on reste en lecture seule)
- Pas besoin de `express.json()` tant qu’on ne reçoit pas de body
