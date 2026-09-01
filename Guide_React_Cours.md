# 🚀 Guide d'installation React (Vite) — Prepa 2

## 🟢 Étape 1 : Créer le projet

1. Ouvrez votre terminal dans le dossier où vous voulez créer votre projet.
2. Tapez la commande :

Pour Windows :
```bash
npm create vite@latest nomDuDossier --- --template react
```

Pour les autres :
```bash
npm create vite@latest nomDuDossier -- --template react
```

## 🟢 Étape 2 : Installation des dépendances

Dans le terminal :
```bash
cd nomDuDossier
npm install
```

## 🟢 Étape 3 : Lancer le projet

Toujours dans le terminal :
```bash
npm run dev
```
Une URL locale s'affichera, du type : `http://localhost:5173/`

## 🟢 Étape 4 : Nettoyer les fichiers de base

### Fichier : `src/main.jsx`
1. Supprimez l'import CSS :
```diff
- import './index.css'
```
2. Supprimez le `StrictMode` :
```diff
- <React.StrictMode>
    <App />
- </React.StrictMode>
+ <App />
```

### Fichier : `src/App.jsx`
1. Supprimez tout le contenu inutile :
    - Gardez uniquement :
```jsx
function App() {
  return (
    <>
      
    </>
  );
}

export default App;
```

## ✅ Le projet est prêt pour coder vos exercices React !
