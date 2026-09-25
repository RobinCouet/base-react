# 🟡 Exercice (suite) : Front React — Joueurs & Équipes

## 🎯 Objectif

Créer une application **React** qui consomme **ton API foot** (celle que tu as déjà faite en Express + Sequelize).

Tu dois pouvoir au minimum :

1. Afficher la liste des **joueurs**
2. Afficher la liste des **équipes**
3. Voir le **détail** d’un joueur / d’une équipe
4. **Créer** un joueur et une équipe via un formulaire

L’API reste sur `http://localhost:3000`.  
Le front tourne à part (Vite, en général sur `http://localhost:5173`).

Les deux doivent tourner **en même temps** pour tester.

---

## 📦 Préparation

### 1. API

Dans le dossier de ton API :

```bash
nodemon index.js
```

Vérifie que ça répond encore, par ex. :

- `http://localhost:3000/players`
- `http://localhost:3000/teams`

### 2. Front React

Crée un nouveau projet Vite + React (JavaScript, pas TypeScript), à côté de ton API, par ex. `front/` ou `foot-front/`.

Installe React Router :

```bash
npm install react-router
```

---

## 🗺️ Routes React attendues

Dans `App.jsx` (ou équivalent), configure au minimum :

| URL front | Page |
|-----------|------|
| `/` | Accueil (liens vers joueurs / équipes) |
| `/players` | Liste des joueurs |
| `/players/:id` | Détail d’un joueur |
| `/players/create` | Formulaire création joueur |
| `/teams` | Liste des équipes |
| `/teams/:id` | Détail d’une équipe |
| `/teams/create` | Formulaire création équipe |

⚠️ Place les routes `/players/create` **avant** `/players/:id` (sinon `create` sera pris pour un id).

Ajoute une petite navigation (liens) visible sur toutes les pages.

---

## 🔌 Endpoints API à utiliser

Base : `http://localhost:3000`

| Action | Méthode | URL |
|--------|---------|-----|
| Liste joueurs | GET | `/players` |
| Détail joueur | GET | `/players/:id` |
| Créer joueur | POST | `/players` |
| Liste équipes | GET | `/teams` |
| Détail équipe | GET | `/teams/:id` |
| Créer équipe | POST | `/teams` |

---

## 🟢 Partie 1 — Accueil

Page simple avec :

- un titre (ex. “API Foot”)
- un lien vers la liste des joueurs
- un lien vers la liste des équipes

---

## 🟢 Partie 2 — Liste des joueurs

### Consigne

1. Crée un composant / page `Players` (ou `PlayersList`).
2. Au chargement (`useEffect` + `[]`), fais un `fetch` sur `http://localhost:3000/players`.
3. Stocke le résultat dans un state.
4. Affiche la liste (nom, position, numéro…).
5. Chaque joueur doit être cliquable → page détail `/players/:id`.
6. Ajoute un lien / bouton “Ajouter un joueur” → `/players/create`.

Rappels :

- le callback de `useEffect` ne doit pas être directement `async`
- pense à la `key` sur les éléments du `.map()`

---

## 🟢 Partie 3 — Détail d’un joueur

1. Récupère l’`id` dans l’URL (React Router).
2. Au chargement, `fetch` sur `http://localhost:3000/players/:id`.
3. Affiche les infos du joueur.
4. Ajoute un lien pour revenir à la liste.

---

## 🟢 Partie 4 — Créer un joueur

Page avec un formulaire contrôlé (`useState`) :

- `name`
- `position`
- `number`

Au submit :

1. Empêche le rechargement de page (`preventDefault`)
2. Envoie un `POST` vers `http://localhost:3000/players`
3. Header : `Content-Type: application/json`
4. Body : `JSON.stringify({ ... })`
5. Si succès : redirige vers la liste ou le détail du joueur créé

Même logique pour les **équipes** (`name`, `country`, `stadium`).

---

## 🟢 Partie 5 — Même chose pour les équipes

Reproduis le trio :

- liste `/teams`
- détail `/teams/:id`
- création `/teams/create`

Tu peux factoriser un peu si tu veux, mais ce n’est pas obligatoire.

---

## 🧪 Checklist de test

Les **deux** serveurs tournent :

- [ ] API : `nodemon index.js`
- [ ] Front : `npm run dev`

Puis :

- [ ] Accueil accessible
- [ ] Liste joueurs affichée depuis l’API
- [ ] Clic joueur → détail OK
- [ ] Formulaire joueur crée bien en base (revisible dans la liste)
- [ ] Liste / détail / création équipes OK
- [ ] Navigation entre les pages OK

---

## 🚀 Bonus (si tu finis plus tôt)

1. Bouton **Supprimer** sur la page détail (`DELETE /players/:id` ou `/teams/:id`) puis retour à la liste
2. Page **Modifier** avec formulaire prérempli (`PUT /:id`)
3. Message de chargement (“Chargement…”) pendant le `fetch`
4. Message d’erreur si l’API ne répond pas

---

## 📁 Structure suggérée (libre)

```text
front/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Players.jsx
│   │   ├── PlayerDetail.jsx
│   │   ├── PlayerCreate.jsx
│   │   ├── Teams.jsx
│   │   ├── TeamDetail.jsx
│   │   └── TeamCreate.jsx
│   └── components/
│       └── Navbar.jsx
└── package.json
```

Tu peux nommer / organiser autrement tant que les pages existent et appellent bien ton API.

---

## ⛔ Hors scope

- Pas besoin de CSS ultra poussé (lisible suffit)
- Pas besoin d’auth / login sur ce front pour l’instant
- Pas besoin de TypeScript
