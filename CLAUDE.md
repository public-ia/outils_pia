# CLAUDE.md

Ce fichier guide Claude (et tout contributeur) qui travaille sur ce dépôt.

## Le projet

Ce dépôt contient le site **outils.public-ia.fr**, le catalogue des outils de Public IA.

- Site statique en **HTML, CSS et JavaScript**, **sans étape de build** : pas de bundler, pas de `npm install`, pas de transpilation. Ce qui est dans le dépôt est ce qui est servi.
  - `index.html` : la page principale.
  - `styles.css` : les styles.
  - `app.js` : la logique côté client.
  - Les ressources sont versionnées par paramètre de requête dans `index.html` (`styles.css?v=…`, `app.js?v=…`) : incrémenter ce numéro quand on modifie le fichier, pour invalider le cache des navigateurs.
- **API PHP** dans `api/brice.php` : point d'entrée serveur qui renvoie du JSON. La clé d'API n'est jamais dans le dépôt : elle est lue depuis une variable d'environnement ou depuis un fichier de configuration privé situé sur le serveur, en dehors du dossier publié.
- `.htaccess` force la redirection vers HTTPS.

Pour tester en local, servir le dossier avec un serveur PHP, par exemple :

```bash
php -S localhost:8000
```

## Ajouter une brique au catalogue

Une brique est une petite application développée par Public IA, hébergée sur son propre sous-domaine (par exemple `https://concours-photos.public-ia.fr/`). Le site outils l'affiche sous forme de tuile dans la grille bento, avec un lien vers ce sous-domaine. Pour en ajouter une :

1. **`app.js`, tableau `tools`** : ajouter une entrée `{ name, description, category, url, color }` **en haut de la liste, juste après « Chat Public IA »**. Les briques les plus récentes viennent donc en premier. « Chat Public IA » reste toujours la première entrée : c'est la grande tuile fondamentale (`tile--lead`). « Public IA » reste en dernier.
   - `description` : une phrase courte, environ 60 caractères, sinon le texte déborde et masque « Accéder ».
   - `category` : une catégorie existante de `icons` (Dialoguer, Protéger, Décider, Comprendre, Analyser, Concevoir, Se former, Évaluer, Partager, Automatiser, Découvrir). Une nouvelle catégorie demande aussi une icône dans `icons` et une entrée dans `filterGroups`.
   - `color` : `blue`, `teal`, `violet`, `lime` ou `orange`, cohérente avec les autres outils de la même catégorie.
2. **`app.js`, tableau `bentoSizes`** : la taille de chaque tuile dépend de sa **position** dans `tools` (`tile--lead` = 2×2, `tile--wide` = 2×1, `tile--tall` = 1×2, `""` = 1×1). La grille a 4 colonnes : le total des cases doit être un multiple de 4, sinon la dernière ligne a des trous. Ajouter un outil en haut décale donc d'un cran la taille de tous les outils suivants : la forme de la grille ne change pas, mais chaque outil change de case. Pour chaque nouvel outil, ajouter une taille à la fin de `bentoSizes` en gardant le total multiple de 4, puis vérifier qu'aucune description ne déborde dans les tuiles 1×1.
3. **`api/brice.php`, bloc `$catalogue`** : ajouter la même brique (`- Nom — usage — URL`). Sans cela, Brice ne la recommandera jamais. Inversement, un lien cité par Brice n'est affiché que si son URL figure dans `tools`.
4. **`index.html`** : incrémenter `app.js?v=…` (et `styles.css?v=…` si le CSS change).
5. **Vérifier en local** (`php -S localhost:8000`) que la grille est complète sur grand écran et que la tuile s'affiche bien sur mobile.

## Le déploiement

- **Toute fusion dans `main` déploie automatiquement** le site sur le FTP OVH (dossier `/outils/`), via le workflow `.github/workflows/deploy.yml`. Il n'y a pas d'environnement de préproduction : ce qui arrive sur `main` est en ligne quelques minutes plus tard.
- Les identifiants FTP sont stockés dans les secrets GitHub (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`), jamais dans le code.
- **Un fichier qui ne doit pas être mis en ligne doit être ajouté à la liste `exclude`** de `.github/workflows/deploy.yml` (c'est déjà le cas, par exemple, de `README.md`, `CLAUDE.md` et `guide_llm.html`). Sans cela, il sera publié sur le serveur.

## Les règles

1. **Toujours travailler sur une branche** et passer par une **pull request** pour arriver sur `main`. Ne jamais pousser directement sur `main`.
2. **Ne jamais commiter de secrets ni d'identifiants** : clés d'API, mots de passe, identifiants FTP, jetons, fichiers de configuration privés (comme `brice-private.php`). Ils vont dans les secrets GitHub ou sur le serveur, hors du dépôt.
3. **Ne jamais modifier le serveur directement** (FTP, gestionnaire de fichiers OVH, etc.). Toute modification passe par le dépôt et le déploiement automatique, sinon elle sera écrasée ou créera un écart entre le dépôt et la production.

## Les fichiers hérités

Les fichiers suivants **ne sont plus utilisés par la page actuelle** :

- `assets/` (anciens bundles générés par Vite)
- `vite.svg`

Ne pas s'appuyer dessus ni les modifier pour faire évoluer le site : les changements se font dans `index.html`, `styles.css`, `app.js` et `api/`. À noter : ils ne figurent pas dans la liste `exclude` et sont donc encore envoyés sur le serveur.
