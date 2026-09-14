# Tuto — Première API Node.js (dossier `prepa2/api`)

Ce guide explique **comment ce projet a été mis en place**, fichier par fichier.  
Objectif : comprendre Node, npm, Express et l’organisation `routes` / `controllers`.

---

## 1. Prérequis : installer Node.js

Node.js permet d’exécuter du JavaScript **hors du navigateur** (sur ton PC, comme un serveur).

1. Va sur [https://nodejs.org](https://nodejs.org)
2. Télécharge la version **LTS**
3. Installe-la (options par défaut = OK)

Vérifie dans un terminal :

```bash
node -v
npm -v
```

Tu dois voir des numéros de version (ex. `v22.x.x` et `10.x.x`).

- **node** = le moteur qui lance ton code
- **npm** = le gestionnaire de paquets (bibliothèques comme Express)

---

## 2. Créer le dossier du projet

Dans un terminal :

```bash
mkdir api
cd api
```

Puis initialise un projet npm :

```bash
npm init -y
```

Ça crée un fichier `package.json` (la “carte d’identité” du projet : dépendances, scripts, etc.).

---

## 3. Activer les imports modernes (`import` / `export`)

Dans `package.json`, ajoute (ou vérifie) :

```json
{
  "type": "module"
}
```

Sans ça, Node attend l’ancienne syntaxe `require()`.  
Avec `"type": "module"`, on peut écrire :

```js
import express from 'express';
```

---

## 4. Installer Express

Express est un framework pour créer une **API HTTP** rapidement (routes, réponses JSON, etc.).

```bash
npm install express
```

Résultat :
- Express est ajouté dans `dependencies` du `package.json`
- Un dossier `node_modules/` apparaît (ne pas le modifier à la main)
- Un `package-lock.json` verrouille les versions exactes

---

## 5. Installer Nodemon (global)

Sans Nodemon : à chaque modification, tu dois **relancer** le serveur à la main.

Avec Nodemon : le serveur **redémarre tout seul** quand tu sauvegardes un fichier.

Installation **globale** (`-g` = disponible partout sur la machine) :

```bash
npm install -g nodemon
```

Sous Windows, si tu as une erreur de permissions, ouvre le terminal **en administrateur**, ou utilise :

```bash
npm install -g nodemon
```

Vérifie :

```bash
nodemon -v
```

### Lancer le projet

Depuis le dossier `api` :

```bash
nodemon index.js
```

Tu dois voir quelque chose comme :

```text
API démarée sur http://localhost:3000
```

Pour arrêter : `Ctrl + C`.

---

## 6. Structure des dossiers

Organisation actuelle du projet :

```text
api/
├── index.js                 ← point d’entrée (démarre le serveur)
├── package.json             ← config npm + dépendances
├── routes/
│   └── car.js               ← URLs / endpoints liés aux voitures
├── controllers/
│   └── car.controller.js    ← logique métier (ce qu’on renvoie)
└── TUTO.md                  ← ce fichier
```

### Pourquoi séparer `routes` et `controllers` ?

| Dossier | Rôle |
|--------|------|
| **routes** | “Quelle URL ? Quelle méthode HTTP ?” (`GET /cars`, etc.) |
| **controllers** | “Que faire quand on appelle cette URL ?” (données, JSON…) |

Ça garde le code clair quand le projet grandit.

---

## 7. Le point d’entrée : `index.js`

```js
import express from 'express';
import carRoutes from './routes/car.js';

const app = express();

app.use(carRoutes);

app.listen(3000, () => {
    console.log("API démarée sur http://localhost:3000");
});
```

Explications ligne par ligne :

1. On importe Express
2. On importe les routes voitures
3. `express()` crée l’application serveur
4. `app.use(carRoutes)` branche les routes sur l’app
5. `app.listen(3000, …)` démarre le serveur sur le port **3000**

Le port 3000 est très courant en local.  
L’URL de base devient : `http://localhost:3000`

---

## 8. Les routes : `routes/car.js`

```js
import express from 'express';
import CarController from '../controllers/car.controller.js';

const router = express.Router();

router.get('/cars', CarController.getAll);
router.get('/cars/single', CarController.getOneCar);

export default router;
```

- `Router()` = un mini-routeur Express
- `router.get('/cars', …)` = quand quelqu’un fait un **GET** sur `/cars`, on appelle `getAll`
- `router.get('/cars/single', …)` = idem pour une seule voiture

### Endpoints disponibles

| Méthode | URL | Action |
|---------|-----|--------|
| GET | `http://localhost:3000/cars` | Liste de voitures |
| GET | `http://localhost:3000/cars/single` | Une voiture |

Tu peux tester :
- dans le navigateur (pour les GET)
- ou avec un outil comme Thunder Client / Postman / Insomnia

---

## 9. Le controller : `controllers/car.controller.js`

```js
class CarController {
    // req  = Request  → ce qui arrive (params, query, body…)
    // res  = Response → ce qu’on renvoie au client

    getAll = async (req, res) => {
        const cars = [
            { brand: "Toyota", model: "Aygo" },
            { brand: "Honda", model: "Civic" }
        ];
        res.json(cars);
    }

    getOneCar = async (req, res) => {
        res.json({
            brand: "Renault",
            model: "12"
        });
    }
}

export default new CarController;
```

Points importants :

- **`req`** : données reçues (pour l’instant on ne s’en sert pas)
- **`res`** : réponse à envoyer
- **`res.json(...)`** : renvoie du JSON (format standard des API)
- On exporte **une instance** (`new CarController`) pour pouvoir appeler directement `CarController.getAll`

Pour l’instant, les données sont **en dur dans le code** (pas encore de base de données). C’est normal pour démarrer.

---

## 10. Chemin d’une requête (résumé)

Exemple : tu ouvres `http://localhost:3000/cars`

```text
Navigateur
    ↓  GET /cars
index.js  (app.use(carRoutes))
    ↓
routes/car.js  (router.get('/cars', ...))
    ↓
controllers/car.controller.js  (getAll)
    ↓
res.json([...])  → JSON renvoyé au navigateur
```

---

## 11. Commandes utiles (mémo)

```bash
# Vérifier Node / npm
node -v
npm -v

# Créer le projet
npm init -y

# Installer Express (dans le projet)
npm install express

# Installer Nodemon (globalement)
npm install -g nodemon

# Lancer le serveur avec rechargement auto
nodemon index.js

# Sans Nodemon (relancer à chaque changement)
node index.js
```

---

## 12. Prochaines étapes possibles

Quand tu es à l’aise avec ça, tu pourras ajouter :

1. Une route `POST /cars` pour créer une voiture
2. Lire un `id` dans l’URL (`/cars/:id`)
3. Brancher une vraie base de données
4. Ajouter un middleware pour lire le body JSON : `app.use(express.json())`

---

## Checklist “ça marche”

- [ ] `node -v` et `npm -v` OK
- [ ] `npm install` (ou `npm install express`) fait dans `api/`
- [ ] `nodemon` installé (`nodemon -v`)
- [ ] `nodemon index.js` affiche le message sur le port 3000
- [ ] `http://localhost:3000/cars` renvoie un tableau JSON
- [ ] `http://localhost:3000/cars/single` renvoie un objet JSON
