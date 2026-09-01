# 🟡 Exercice : Créez un site de recherche de Pays

## 🎯 Objectif

Utiliser `useState`, `useEffect` et `fetch` pour afficher des données distantes, puis les filtrer en temps réel.

Projet : Vite + React, sans TypeScript.

## 🌍 Ressource API

REST Countries, version 5. L'ancienne v3.1 (`restcountries.com/v3.1/...`) est morte : elle répond aujourd'hui `This API version has been deprecated`. Si vous trouvez un tuto qui l'utilise, il date.

- Documentation : [https://restcountries.com/](https://restcountries.com/)
- URL de base : `https://api.restcountries.com/countries/v5`
- Clé du cours : `rc_live_fc06174ff7634119bd62fa53b7d35848`

La clé se passe dans un header `Authorization: Bearer ...`. Sans elle, l'API répond 401.

### Exemple d'appel

```jsx
const CLE_API = "rc_live_fc06174ff7634119bd62fa53b7d35848";

const URL_PAYS =
  "https://api.restcountries.com/countries/v5" +
  "?limit=100" +
  "&response_fields=names.common,names.translations.fra.common,flag.url_png,capitals.name,continents";

async function chargerPays() {
    const reponse = await fetch(URL_PAYS, {
      headers: { Authorization: `Bearer ${CLE_API}` },
    });

    const json = await reponse.json();
}
```

Quatre choses à retenir de cet exemple :

- Le callback du `useEffect` ne peut pas être `async`. Il doit retourner soit rien, soit une fonction de nettoyage — et une fonction `async` retourne toujours une promesse. On déclare donc une fonction `async` à l'intérieur, et on l'appelle juste après. Écrire `useEffect(async () => {...})` ne provoque pas d'erreur visible tout de suite, mais c'est faux.
- `fetch` ne rejette pas sur un 401 ou un 404. Sans le test sur `reponse.ok`, une clé invalide vous donne juste une page vide et zéro indice. D'où le `try / catch` autour.
- Les pays sont dans `json.data.objects`, pas à la racine. `json.data.meta` vous donne `total`, `count`, `limit`, `offset` et `more`.
- `response_fields` sert à ne demander que les champs utiles. Sans lui vous recevez tout : les frontières, les monnaies, la palette de couleurs du drapeau… soit une réponse plusieurs fois plus lourde pour rien.

⚠️ La clé est visible par n'importe qui ouvre l'onglet Réseau. C'est acceptable ici parce que c'est une clé de TP à quota limité. Sur un vrai projet, l'appel part du serveur, jamais du navigateur.

### Forme d'un pays

```json
{
  "names": {
    "common": "France",
    "translations": { "fra": { "common": "France" } }
  },
  "capitals": [{ "name": "Paris" }],
  "flag": { "url_png": "https://flags.restcountries.com/v5/w640/fr.png" },
  "continents": ["Europe"]
}
```

## 📝 Consignes

### 🟢 Étape 1 : afficher la liste des pays

Aucune recherche à ce stade. On affiche tout.

1. Créez un state `pays` initialisé à un tableau vide.
2. Dans un `useEffect` avec un tableau de dépendances vide (`[]`), appelez l'API au montage du composant.
3. Rangez `json.data.objects` dans le state.
4. Affichez chaque pays sous forme de carte avec :
   - le drapeau (`flag.url_png`)
   - le nom en français (`names.translations.fra.common`)
   - le continent (`continents[0]`)
   - la capitale (`capitals[0].name`)
5. Pensez à la `key` sur l'élément répété.

Trois pièges volontaires dans ces données :

- L'Antarctique, l'île Bouvet et les îles Heard-et-MacDonald n'ont pas de capitale : `capitals` est absent. Un `capitals?.[0]?.name` et un texte de repli suffisent, mais si vous l'oubliez la page plante.
- Certains territoires ont un `flag.url_png` vide (l'Abkhazie par exemple). Vous verrez une image cassée.
- Le plan gratuit plafonne à 100 pays par requête alors qu'il y en a 254. Vous n'en afficherez donc que 100 à cette étape, c'est normal — la suite est en bonus.

Vous devez voir 100 cartes. Ne passez à l'étape 2 que quand c'est le cas.

### 🔵 Étape 2 : ajouter la recherche

1. Ajoutez un champ texte et un state `recherche`, mis à jour à chaque `onChange`.
2. Ajoutez un state `paysFiltres`.
3. Dans un second `useEffect`, dépendant de `recherche` et de `pays`, filtrez la liste déjà chargée et rangez le résultat dans ce nouveau state.
4. La recherche ignore la casse : `fr` et `FR` donnent le même résultat.
5. Champ vide, on réaffiche la liste complète.

Exemple : `fr` doit faire ressortir France, Afrique du Sud, Terres australes françaises, Guyane française…

### ❗ Attention

- Un `useEffect` par responsabilité : un pour le chargement, un pour le filtrage. Ne mélangez pas les deux.
- Le filtrage passe par un `useEffect` et un state, pas par un `.filter()` écrit directement dans le JSX. C'est le point de l'exercice.
- Pas de rechargement de page, pas de bouton « Rechercher ».
- Vérifiez l'onglet Réseau : si la requête part deux fois au chargement, votre tableau de dépendances est faux (ou vous êtes en `StrictMode`, ce qui double volontairement les effets en dev — sachez le reconnaître).

### ✅ Résultat attendu

- Au chargement : la liste des pays.
- Pendant la frappe : la liste se réduit à chaque caractère tapé.
- Une seule page. Un seul composant, ou un composant `CartePays` si vous préférez découper.

### 🎁 Bonus

- Un loader pendant l'appel initial.
- Un message quand aucun pays ne correspond, avec le texte cherché repris dedans.
- Un tri alphabétique sur le nom français (`localeCompare`, sinon « Éthiopie » finit après « Zimbabwe »).
- Les 254 pays : faites trois appels avec `&offset=0`, `&offset=100`, `&offset=200` et concaténez. `meta.more` vous dit s'il reste quelque chose à charger.
- Recherche côté serveur : `https://api.restcountries.com/countries/v5?q=france`. Testez-la et regardez le nombre de résultats pour `q=fr` — vous en récupérez 103, parce que le `q` cherche dans tous les champs, y compris la langue « French ». Expliquez en deux lignes pourquoi le filtrage local reste préférable ici.
