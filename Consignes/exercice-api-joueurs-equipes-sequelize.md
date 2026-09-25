# 🟡 Exercice (suite) : Models Sequelize — Joueurs & Équipes

## 🎯 Objectif

Partir de ton API foot (exercice précédent) et **brancher une vraie base de données** avec Sequelize, comme dans l’exemple `api` (voitures).

Pour cette étape, on fait **uniquement** :

1. Installation de Sequelize + mysql2  
2. Connexion à la base  
3. Création des **2 models** (`Player`, `Team`)  
4. Mise à jour des controllers : **`getAll`** et **`getOne`** (plus de données en dur)

Pas encore de `POST` / `PUT` / `DELETE`, pas encore de relations entre joueurs et équipes.

---

## 📦 Préparation

### 1. MySQL

Assure-toi d’avoir MySQL qui tourne en local (XAMPP, WAMP, MySQL Workbench, etc.).

Crée une base vide, par exemple :

```sql
CREATE DATABASE foot_api;
```

### 2. Installer les dépendances

Dans le dossier de ton API :

```bash
npm install sequelize mysql2
```

- **sequelize** = ORM (on parle en JavaScript, Sequelize parle à MySQL)
- **mysql2** = driver dont Sequelize a besoin pour MySQL

---

## 📁 Structure attendue (après cet exo)

```text
api/
├── index.js
├── package.json
├── config/
│   └── db.js
├── models/
│   ├── index.js
│   ├── Player.js
│   └── Team.js
├── routes/
│   ├── player.js
│   └── team.js
└── controllers/
    ├── player.controller.js
    └── team.controller.js
```

---

## 🟢 Partie 1 — Connexion DB (`config/db.js`)

Crée le dossier `config/` et le fichier `db.js`.

Inspire-toi de l’exemple voitures :

```js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mysql://root@localhost:3306/foot_api");

export default sequelize;
```

À adapter selon ton installation :

| Élément | Exemple | À changer si… |
|---------|---------|----------------|
| user | `root` | ton user MySQL est différent |
| password | (vide ici) | tu as un mot de passe → `mysql://root:TON_MDP@localhost:3306/foot_api` |
| port | `3306` | MySQL écoute ailleurs |
| base | `foot_api` | tu as choisi un autre nom |

---

## 🟢 Partie 2 — Model Joueur (`models/Player.js`)

Crée le model avec `db.define`, comme `Car.js` dans l’exemple.

Champs minimum :

| Champ | Type Sequelize | Obligatoire |
|-------|----------------|-------------|
| `name` | `DataTypes.STRING` | oui |
| `position` | `DataTypes.STRING` | oui |
| `number` | `DataTypes.INTEGER` | oui |

Exemple de structure (à compléter) :

```js
import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Player = db.define("Player", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // position...
    // number...
});

export default Player;
```

Sequelize ajoutera automatiquement `id`, `createdAt`, `updatedAt`.

---

## 🟢 Partie 3 — Model Équipe (`models/Team.js`)

Même principe.

Champs minimum :

| Champ | Type Sequelize | Obligatoire |
|-------|----------------|-------------|
| `name` | `DataTypes.STRING` | oui |
| `country` | `DataTypes.STRING` | oui |
| `stadium` | `DataTypes.STRING` | oui |

---

## 🟢 Partie 4 — Centraliser les models (`models/index.js`)

Ce fichier :

1. Importe la connexion `db`
2. Importe les 2 models (pour les enregistrer auprès de Sequelize)
3. Lance `db.sync()` → crée / met à jour les tables en base
4. Réexporte les models

Inspire-toi de l’exemple voitures :

```js
import db from '../config/db.js';

import Player from './Player.js';
import Team from './Team.js';

db.sync();

export {
    Player,
    Team
}
```

⚠️ Au premier lancement du serveur, Sequelize créera les tables `Players` et `Teams` (noms au pluriel par défaut).

---

## 🟢 Partie 5 — Routes : passer de `/single` à `/:id`

Comme dans l’exemple voitures, on récupère **un enregistrement par son id**.

### `routes/player.js`

| Méthode | URL | Action |
|---------|-----|--------|
| GET | `/players` | tous les joueurs |
| GET | `/players/:id` | un joueur par id |

```js
router.get('/players', PlayerController.getAll);
router.get('/players/:id', PlayerController.getOnePlayer);
```

### `routes/team.js`

| Méthode | URL | Action |
|---------|-----|--------|
| GET | `/teams` | toutes les équipes |
| GET | `/teams/:id` | une équipe par id |

```js
router.get('/teams', TeamController.getAll);
router.get('/teams/:id', TeamController.getOneTeam);
```

---

## 🟢 Partie 6 — Controllers branchés sur Sequelize

Plus de tableaux en dur. On utilise le model.

### Import

```js
import { Player } from '../models/index.js';
```

(idem avec `Team` dans le controller équipes)

### `getAll`

```js
getAll = async (req, res) => {
    const players = await Player.findAll();
    res.json(players);
}
```

- `findAll()` = `SELECT * FROM Players`

### `getOnePlayer` / `getOneTeam`

Comme pour les voitures :

1. Récupérer l’`id` dans `req.params`
2. Chercher avec `findByPk(id)`
3. Si introuvable → `404` + message
4. Sinon → `res.json(...)`

Exemple joueur :

```js
getOnePlayer = async (req, res) => {
    const { id } = req.params;

    const player = await Player.findByPk(id);

    if (!player) {
        return res.status(404).json({ message: "Joueur introuvable" });
    }

    res.json(player);
}
```

Fais la même chose pour `getOneTeam` (message adapté).

---

## 🧪 Tester

1. Relance avec `nodemon index.js`
2. Vérifie dans MySQL que les tables `Players` et `Teams` existent
3. Pour l’instant elles sont **vides** → `/players` et `/teams` renvoient `[]`

### Ajouter des données à la main (pour tester getOne)

Dans MySQL / phpMyAdmin, insère quelques lignes, par exemple :

```sql
INSERT INTO Players (name, position, number, createdAt, updatedAt)
VALUES
('Kylian Mbappé', 'Attaquant', 10, NOW(), NOW()),
('Antoine Griezmann', 'Milieu offensif', 7, NOW(), NOW());

INSERT INTO Teams (name, country, stadium, createdAt, updatedAt)
VALUES
('Real Madrid', 'Espagne', 'Santiago Bernabéu', NOW(), NOW()),
('PSG', 'France', 'Parc des Princes', NOW(), NOW());
```

Puis teste :

| URL | Attendu |
|-----|---------|
| `GET http://localhost:3000/players` | tableau des joueurs |
| `GET http://localhost:3000/players/1` | le joueur id 1 |
| `GET http://localhost:3000/players/999` | `{ message: "Joueur introuvable" }` + status 404 |
| `GET http://localhost:3000/teams` | tableau des équipes |
| `GET http://localhost:3000/teams/1` | l’équipe id 1 |
| `GET http://localhost:3000/teams/999` | 404 équipe introuvable |

---

## 🧠 Chemin d’une requête (avec Sequelize)

```text
GET /players/1
        ↓
routes/player.js
        ↓
PlayerController.getOnePlayer
        ↓
Player.findByPk(1)   ← Sequelize
        ↓
MySQL (table Players)
        ↓
res.json(player)
```

---

## 📋 Checklist de validation

- [ ] `sequelize` et `mysql2` installés
- [ ] `config/db.js` connecté à ta base `foot_api` (ou autre)
- [ ] `models/Player.js` et `models/Team.js` créés
- [ ] `models/index.js` importe les 2 models + `db.sync()`
- [ ] Controllers : plus de données en dur
- [ ] `getAll` utilise `findAll()`
- [ ] `getOne` utilise `findByPk(id)` + gestion 404
- [ ] Routes en `/:id` (plus de `/single`)
- [ ] Tables créées en base au lancement
- [ ] Les GET fonctionnent après insertion manuelle de données

---

## ⛔ Hors scope pour l’instant

- Pas de `create` / `update` / `destroy`
- Pas d’associations (`Player belongsTo Team`, etc.)
- Pas de seed automatique
- Pas de fichier `.env` (on verra plus tard si besoin)

On ajoutera la création via l’API (`POST`) dans un prochain exercice.
