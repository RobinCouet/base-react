# 🟡 Exercice (suite) : Création — Joueurs & Équipes

## 🎯 Objectif

Ajouter la **création** (`POST`) sur les deux ressources :

- `POST /players` → créer un joueur
- `POST /teams` → créer une équipe

Tu as déjà la lecture (`getAll` / `getOne`) avec Sequelize.  
Cette étape te fait brancher le **body** de la requête et la méthode de **création** Sequelize.

⚠️ **Important** : pour récupérer le contenu d’une request et pour créer en base, tu dois **chercher dans la documentation**. Les réponses ne sont pas données toutes cuites ici.

---

## 📚 Doc à consulter (obligatoire)

### Express — lire le body JSON

Cherche dans la doc Express :

- comment activer le parsing JSON (`express.json`)
- où se trouvent les données envoyées dans la request (indice : quelque chose comme `req.…`)

Doc utile : [https://expressjs.com/](https://expressjs.com/)  
(section middleware / `express.json`)

### Sequelize — créer un enregistrement

Cherche dans la doc Sequelize la méthode pour **créer** une ligne à partir d’un model  
(indices de recherche : `Creating`, `create`, `Model.create`).

Doc utile : [https://sequelize.org/docs/v6/core-concepts/model-instances/](https://sequelize.org/docs/v6/core-concepts/model-instances/)  
ou la page “Model querying / Creating”

---

## 🟢 Partie 1 — Préparer Express pour lire le JSON

Sans middleware adapté, ton API **ne verra pas** le body JSON envoyé par le client.

Dans `index.js` :

1. Avant de brancher les routes, active le middleware qui parse le JSON
2. Vérifie dans la doc Express la bonne ligne à ajouter

Test mental : si tu envoies `{ "name": "Mbappé" }` en POST et que tu `console.log` le contenu de la request, tu dois voir l’objet — pas `undefined`.

---

## 🟢 Partie 2 — Routes POST

### Joueurs — `routes/player.js`

Ajoute :

| Méthode | URL | Action |
|---------|-----|--------|
| POST | `/players` | créer un joueur |

Branche-la sur une nouvelle méthode du controller, par ex. `create` ou `createPlayer`.

### Équipes — `routes/team.js`

Ajoute :

| Méthode | URL | Action |
|---------|-----|--------|
| POST | `/teams` | créer une équipe |

Même idée : `create` / `createTeam`.

---

## 🟢 Partie 3 — Controllers : méthode de création

Dans chaque controller, ajoute une méthode async du type :

```js
create = async (req, res) => {
    // 1. Récupérer les données depuis la request (→ voir doc Express)
    // 2. Créer en base avec Sequelize (→ voir doc Sequelize)
    // 3. Renvoyer le nouvel enregistrement en JSON
}
```

### Attendu pour un joueur

Le client envoie un JSON du genre :

```json
{
  "name": "Kylian Mbappé",
  "position": "Attaquant",
  "number": 10
}
```

Tu crées la ligne en base, puis tu renvoies le joueur créé (avec son `id`, `createdAt`, etc.).

### Attendu pour une équipe

```json
{
  "name": "PSG",
  "country": "France",
  "stadium": "Parc des Princes"
}
```

### Bonus qualité (recommandé)

- Si la création échoue, renvoie un status d’erreur (ex. `400` ou `500`) avec un message
- Si tu veux être clean : status `201` (Created) au lieu de `200` quand c’est OK

---

## 🧪 Comment tester

Les navigateur seuls ne suffisent plus (GET only). Utilise **Thunder Client**, **Postman** ou **Insomnia** :

1. Méthode : `POST`
2. URL : `http://localhost:3000/players`
3. Header : `Content-Type: application/json`
4. Body (raw JSON) : un objet joueur valide
5. Envoie → tu dois recevoir le joueur créé
6. Vérifie avec `GET /players` que la ligne est bien là
7. Idem pour `POST /teams`

---

## 🧠 Schéma attendu

```text
Client  POST /players  +  JSON body
        ↓
express.json()          ← parse le body (doc Express)
        ↓
routes/player.js
        ↓
PlayerController.create
        ↓
récupération du contenu de la request   ← doc Express
Model.create(...)                       ← doc Sequelize
        ↓
MySQL
        ↓
res.json(nouveauJoueur)
```

---

## 📋 Checklist

- [ ] Middleware JSON activé dans `index.js` (trouvé dans la doc Express)
- [ ] `POST /players` existe
- [ ] `POST /teams` existe
- [ ] Controllers lisent le contenu de la request (doc Express)
- [ ] Controllers créent avec Sequelize (doc Sequelize)
- [ ] La réponse renvoie l’objet créé
- [ ] Un `GET` ensuite montre bien les nouvelles lignes en base

---

## ⛔ Hors scope

- Pas encore d’update / delete
- Pas encore de relations joueur ↔ équipe
- Pas besoin de validation ultra poussée (sauf si tu veux aller plus loin)

---

## 💡 Indices (si tu es bloqué — regarde en dernier)

<details>
<summary>Indice 1 — body Express</summary>

Cherche `express.json` et `req.body`.
</details>

<details>
<summary>Indice 2 — création Sequelize</summary>

Cherche `Model.create` / Creating an instance.
</details>

<details>
<summary>Indice 3 — ordre dans index.js</summary>

Le middleware JSON doit être déclaré **avant** `app.use(tesRoutes)`.
</details>
