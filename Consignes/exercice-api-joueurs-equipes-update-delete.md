# 🟡 Exercice (suite) : Update & Delete — Joueurs & Équipes

## 🎯 Objectif

Compléter le CRUD sur les deux ressources :

| Action | Méthode HTTP | URL |
|--------|--------------|-----|
| Modifier | `PUT` | `/players/:id` et `/teams/:id` |
| Supprimer | `DELETE` | `/players/:id` et `/teams/:id` |

Tu as déjà : lecture (`GET`) + création (`POST`).  
Ici tu ajoutes **update** et **delete**.

⚠️ Comme pour la création : cherche dans la **doc Sequelize** les méthodes pour modifier et supprimer. Ce n’est pas tout spoiler ci-dessous.

---

## 📚 Doc à consulter (obligatoire)

### Sequelize — update

Cherche comment **mettre à jour** une instance / un enregistrement  
(indices : `update`, `Updating`, `save`, `Model.update`).

### Sequelize — delete

Cherche comment **supprimer** une instance / un enregistrement  
(indices : `destroy`, `Deleting`, `Model.destroy`).

Doc utile :  
[https://sequelize.org/docs/v6/core-concepts/model-instances/](https://sequelize.org/docs/v6/core-concepts/model-instances/)  
[https://sequelize.org/docs/v6/core-concepts/model-querying-basics/](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)

### Express — rappel

- L’`id` est dans `req.params`
- Le body JSON (champs à modifier) est dans `req.body`  
  → ton `express.json()` doit déjà être en place depuis l’exo create

---

## 🟢 Partie 1 — Routes

### Joueurs — `routes/player.js`

Ajoute :

| Méthode | URL | Action |
|---------|-----|--------|
| PUT | `/players/:id` | modifier un joueur |
| DELETE | `/players/:id` | supprimer un joueur |

Exemple d’idée :

```js
router.put('/players/:id', PlayerController.update);
router.delete('/players/:id', PlayerController.delete);
```

(noms de méthodes libres : `update` / `updatePlayer`, `delete` / `deletePlayer`…)

### Équipes — `routes/team.js`

Même chose :

| Méthode | URL | Action |
|---------|-----|--------|
| PUT | `/teams/:id` | modifier une équipe |
| DELETE | `/teams/:id` | supprimer une équipe |

---

## 🟢 Partie 2 — Update (controllers)

Pour **chaque** ressource (`Player` et `Team`), ajoute une méthode async du type :

```js
update = async (req, res) => {
    // 1. Récupérer l'id (req.params)
    // 2. Vérifier que l'enregistrement existe (findByPk) → sinon 404
    // 3. Mettre à jour avec les données du body (→ doc Sequelize)
    // 4. Renvoyer l'enregistrement mis à jour en JSON
}
```

### Exemple de body joueur

```json
{
  "name": "Kylian Mbappé",
  "position": "Attaquant",
  "number": 9
}
```

### Exemple de body équipe

```json
{
  "name": "PSG",
  "country": "France",
  "stadium": "Parc des Princes"
}
```

Tu peux mettre à jour **tous** les champs, ou seulement ceux envoyés — choisis une approche et reste cohérent.

---

## 🟢 Partie 3 — Delete (controllers)

Pour chaque ressource :

```js
delete = async (req, res) => {
    // 1. Récupérer l'id
    // 2. Vérifier que l'enregistrement existe → sinon 404
    // 3. Supprimer (→ doc Sequelize)
    // 4. Renvoyer un message de confirmation (ou status 204)
}
```

Exemples de réponses possibles :

```json
{ "message": "Joueur supprimé" }
```

ou

```json
{ "message": "Équipe supprimée" }
```

---

## 🧪 Comment tester

Avec Thunder Client / Postman / Insomnia :

### Update

1. Crée un joueur (`POST /players`) si besoin
2. Note son `id`
3. `PUT http://localhost:3000/players/1` + body JSON modifié
4. Vérifie la réponse, puis `GET /players/1`
5. Idem pour une équipe

### Delete

1. `DELETE http://localhost:3000/players/1`
2. Vérifie le message de succès
3. `GET /players/1` → doit renvoyer **404**
4. Idem pour une équipe

### Cas d’erreur

| Requête | Attendu |
|---------|---------|
| `PUT /players/999` | 404 joueur introuvable |
| `DELETE /teams/999` | 404 équipe introuvable |

---

## 🧠 Schéma attendu

```text
PUT /players/1  +  JSON body
        ↓
routes/player.js
        ↓
PlayerController.update
        ↓
findByPk(1)  →  existe ?
        ↓ oui
mise à jour (doc Sequelize)
        ↓
res.json(joueurMisÀJour)
```

```text
DELETE /teams/1
        ↓
TeamController.delete
        ↓
findByPk(1)  →  existe ?
        ↓ oui
suppression (doc Sequelize)
        ↓
res.json({ message: "..." })
```

---

## 📋 Checklist CRUD complet

À ce stade, pour **joueurs** et **équipes**, tu dois avoir :

- [ ] `GET /` (liste)
- [ ] `GET /:id` (détail)
- [ ] `POST /` (création)
- [ ] `PUT /:id` (modification)
- [ ] `DELETE /:id` (suppression)
- [ ] Gestion du **404** si l’id n’existe pas (update + delete)
- [ ] Méthodes Sequelize trouvées dans la doc (pas inventées au hasard)

---

## ⛔ Hors scope

- Pas encore de relations joueur ↔ équipe
- Pas besoin de soft delete
- PATCH optionnel (PUT suffit pour cet exo)

---

## 💡 Indices (si tu es bloqué — regarde en dernier)

<details>
<summary>Indice 1 — update</summary>

Deux approches courantes : appeler `.update(...)` sur l’instance trouvée avec `findByPk`, ou utiliser `Model.update` avec un `where`.
</details>

<details>
<summary>Indice 2 — delete</summary>

Cherche `destroy` dans la doc Sequelize (sur l’instance ou sur le Model).
</details>

<details>
<summary>Indice 3 — ordre des routes</summary>

`/:id` convient pour PUT et DELETE. Pas de conflit avec POST `/players` (pas de param).
</details>

<details>
<summary>Indice 4 — après update</summary>

Si tu modifies l’instance, tu peux renvoyer l’objet à jour. Parfois il faut recharger / re-fetcher selon la méthode utilisée — regarde ce que renvoie ta méthode dans la doc.
</details>
