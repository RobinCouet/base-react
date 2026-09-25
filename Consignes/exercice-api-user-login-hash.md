# 🟡 Exercice (suite) : Hash + Login (+ bonus JWT)

## 🎯 Objectif

Sécuriser l’inscription et ajouter la connexion.

| Étape | Contenu |
|-------|---------|
| **Obligatoire** | Hasher le mot de passe à l’inscription |
| **Obligatoire** | `POST /login` avec comparaison des mots de passe |
| **Bonus** | Créer un **JWT** après un login réussi |

Point de départ : ton exo register (`User` + `POST /register`) où le password était encore en clair.

⚠️ Pour le hash, la comparaison, et le JWT : **cherche dans la documentation** des packages. Les détails exacts ne sont pas tous donnés ici.

---

## 📦 Packages à installer

```bash
npm install bcrypt
```

**Bonus JWT uniquement :**

```bash
npm install jsonwebtoken
```

Docs utiles :

- bcrypt : [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)
- jsonwebtoken : [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

---

## 🟢 Partie 1 — Hasher le password au register

Modifie ta méthode `register` dans `user.controller.js`.

### Avant de créer l’utilisateur

1. Récupère toujours `email`, `nom`, `prenom`, `password` dans le body
2. **Hashe** le `password` avec bcrypt (cherche `hash` dans la doc)
3. Stocke en base le **hash**, pas le mot de passe en clair

Indice de coût (salt rounds) souvent utilisé en cours : `10`.

### Après création

- Le champ `password` en base ne doit **plus** ressembler à `azerty123`
- Tu dois voir une longue chaîne du type `$2b$10$...`

### Attention

Si tu as déjà des users créés **en clair**, ils ne marcheront plus avec le login hashé.  
→ recrée un compte via `POST /register` après avoir branché le hash  
(ou vide la table `Users` pour repartir propre).

### Bonus qualité (recommandé)

Ne renvoie pas le password (même hashé) dans la réponse JSON si tu peux l’éviter.

---

## 🟢 Partie 2 — Route login

Dans `routes/user.js`, ajoute :

| Méthode | URL | Action |
|---------|-----|--------|
| POST | `/login` | connexion |

Branche-la sur une nouvelle méthode `login` du controller.

Tu dois donc avoir au minimum :

- `POST /register`
- `POST /login`

---

## 🟢 Partie 3 — Controller `login` (obligatoire)

### Body attendu

```json
{
  "email": "jean.dupont@email.com",
  "password": "azerty123"
}
```

### Algorithme à implémenter

```text
1. Lire email + password dans req.body
2. Chercher l'utilisateur en base par email
   → si introuvable : erreur (ex. 401 ou 404) + message
3. Comparer le password envoyé avec le hash stocké (bcrypt)
   → si ça ne match pas : même type d'erreur + message
4. Si OK : renvoyer une réponse de succès
   (pour l'instant : infos user, ou un simple message)
```

### Doc à chercher

- comment trouver **un** enregistrement avec une condition (`email`) → Sequelize (`findOne` / `where`)
- comment **comparer** un mot de passe en clair avec un hash → bcrypt (`compare`)

### Messages

Tu peux renvoyer un message générique du genre :

```json
{ "message": "Email ou mot de passe incorrect" }
```

(évite de dire trop précisément si c’est l’email ou le password qui est faux — bonne habitude sécu)

---

## 🧪 Tests obligatoires

### 1. Register avec hash

`POST /register` :

```json
{
  "email": "jean.dupont@email.com",
  "nom": "Dupont",
  "prenom": "Jean",
  "password": "azerty123"
}
```

→ en base, `password` est hashé.

### 2. Login OK

`POST /login` avec le bon email + le bon password  
→ succès.

### 3. Login KO — mauvais password

Même email, mauvais password  
→ erreur.

### 4. Login KO — email inconnu

Email qui n’existe pas  
→ erreur.

---

## ⭐ Bonus — Création du JWT

Si le login réussit, **crée un token JWT**.

### À faire

1. Installe `jsonwebtoken` si ce n’est pas fait
2. Après `bcrypt.compare` OK, crée un token avec `jwt.sign` (doc)
3. Mets au minimum l’`id` du user dans le payload, ex. `{ userId: user.id }`
4. Utilise un secret (pour démarrer, une string en dur du type `"supersecret"` suffit ; plus tard on passera par `.env`)

### Que renvoyer ?

Au choix (une des deux suffit pour le bonus) :

**Option A — simple (recommandée pour démarrer)**  
Renvoie le token dans le JSON :

```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Option B — cookie**  
Envoie le token dans un cookie (cherche `res.cookie` côté Express).

### Hors bonus pour l’instant

- Pas obligatoire de faire le middleware `verifyToken`
- Pas obligatoire de protéger d’autres routes avec le JWT

On pourra faire la vérification du token dans un prochain TP.

---

## 🧠 Schéma global

```text
REGISTER
  password clair
      ↓
  bcrypt.hash
      ↓
  User.create({ ..., password: hash })

LOGIN
  email + password clair
      ↓
  User.findOne({ where: { email } })
      ↓
  bcrypt.compare(passwordClair, hashEnBase)
      ↓
  OK → (bonus) jwt.sign(...) → réponse
  KO → erreur
```

---

## 📋 Checklist

### Obligatoire

- [ ] `bcrypt` installé
- [ ] `register` stocke un password **hashé**
- [ ] Route `POST /login`
- [ ] `login` retrouve le user par email
- [ ] `login` compare avec bcrypt
- [ ] Mauvais password / email inconnu → erreur
- [ ] Bon couple email/password → succès

### Bonus

- [ ] `jsonwebtoken` installé
- [ ] Token créé après login OK
- [ ] Token renvoyé (JSON et/ou cookie)

---

## ⛔ Hors scope

- Middleware de vérification JWT (sauf si tu as fini tôt et tu veux explorer)
- Rôles admin
- Reset password / email de confirmation

---

## 💡 Indices (dernier recours)

<details>
<summary>Indice 1 — hash</summary>

Cherche `bcrypt.hash(password, saltRounds)`.
</details>

<details>
<summary>Indice 2 — compare</summary>

Cherche `bcrypt.compare(passwordEnClair, passwordHashé)`.  
Le résultat est un booléen.
</details>

<details>
<summary>Indice 3 — findOne</summary>

Sequelize : `User.findOne({ where: { email } })`.
</details>

<details>
<summary>Indice 4 — JWT</summary>

Cherche `jwt.sign(payload, secret)`.  
Exemple de payload : `{ userId: user.id }`.
</details>
