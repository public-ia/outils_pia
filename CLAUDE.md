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

## Le déploiement

- **Toute fusion dans `main` déploie automatiquement** le site sur le FTP OVH (dossier `/outils/`), via le workflow `.github/workflows/deploy.yml`. Il n'y a pas d'environnement de préproduction : ce qui arrive sur `main` est en ligne quelques minutes plus tard.
- Les identifiants FTP sont stockés dans les secrets GitHub (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`), jamais dans le code.
- **Un fichier qui ne doit pas être mis en ligne doit être ajouté à la liste `exclude`** de `.github/workflows/deploy.yml` (c'est déjà le cas, par exemple, de `README.md`, `CLAUDE.md`, `index_old.html` et `guide_llm.html`). Sans cela, il sera publié sur le serveur.

## Les règles

1. **Toujours travailler sur une branche** et passer par une **pull request** pour arriver sur `main`. Ne jamais pousser directement sur `main`.
2. **Ne jamais commiter de secrets ni d'identifiants** : clés d'API, mots de passe, identifiants FTP, jetons, fichiers de configuration privés (comme `brice-private.php`). Ils vont dans les secrets GitHub ou sur le serveur, hors du dépôt.
3. **Ne jamais modifier le serveur directement** (FTP, gestionnaire de fichiers OVH, etc.). Toute modification passe par le dépôt et le déploiement automatique, sinon elle sera écrasée ou créera un écart entre le dépôt et la production.

## Les fichiers hérités

Les fichiers suivants **ne sont plus utilisés par la page actuelle** :

- `assets/` (anciens bundles générés par Vite)
- `script.js`
- `vite.svg`
- `index_old.html`

Ne pas s'appuyer dessus ni les modifier pour faire évoluer le site : les changements se font dans `index.html`, `styles.css`, `app.js` et `api/`. À noter : seul `index_old.html` figure aujourd'hui dans la liste `exclude` ; `assets/`, `script.js` et `vite.svg` sont donc encore envoyés sur le serveur.
