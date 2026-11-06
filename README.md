# outils_pia

Code source du site **[outils.public-ia.fr](https://outils.public-ia.fr/)**, le catalogue des outils de Public IA.

La page présente les briques de Public IA sous forme de grille (« bento ») avec une recherche, des filtres par usage et **Brice**, un assistant conversationnel qui oriente vers l'outil adapté à un besoin.

> ⚠️ **On ne met plus le site à jour par FTP.**
> Toute modification passe par ce dépôt : branche, pull request, puis fusion dans `main`, qui déclenche le déploiement automatique.
> L'accès FTP au serveur OVH ne sert plus qu'au **contrôle** : vérifier que les fichiers en ligne correspondent au dépôt, consulter les journaux, diagnostiquer un incident. **Aucun fichier ne doit être ajouté, modifié ou supprimé à la main sur le FTP** : la modification serait écrasée au déploiement suivant, ou créerait un écart invisible entre le dépôt et la production.

---

## Sommaire

1. [Architecture](#architecture)
2. [Structure du dépôt](#structure-du-dépôt)
3. [Lancer le site en local](#lancer-le-site-en-local)
4. [Brice, l'assistant](#brice-lassistant)
5. [Ajouter une brique au catalogue](#ajouter-une-brique-au-catalogue)
6. [Workflow de contribution](#workflow-de-contribution)
7. [Déploiement](#déploiement)
8. [Le FTP : contrôle uniquement](#le-ftp--contrôle-uniquement)
9. [Sécurité et secrets](#sécurité-et-secrets)
10. [Fichiers hérités](#fichiers-hérités)

---

## Architecture

- **Site statique** en HTML, CSS et JavaScript, **sans étape de build** : pas de bundler, pas de `npm install`, pas de transpilation. Ce qui est dans le dépôt est exactement ce qui est servi.
- **Une API PHP** (`api/brice.php`) qui relaie les questions posées à Brice vers l'API OpenAI et renvoie du JSON.
- **Hébergement** : mutualisé OVH, dossier `/outils/`, HTTPS forcé par `.htaccess`.
- **Déploiement** : GitHub Actions, à chaque fusion dans `main`.

## Structure du dépôt

| Fichier / dossier | Rôle |
| --- | --- |
| `index.html` | Page principale (structure, panneau Brice, chargement des ressources). |
| `styles.css` | Styles du site. |
| `app.js` | Logique côté client : catalogue `tools`, icônes, filtres, recherche, tailles des tuiles (`bentoSizes`), interface de Brice. |
| `api/brice.php` | Point d'entrée serveur de Brice (validation, limitation de débit, appel à l'API OpenAI). Contient aussi le `$catalogue` connu de Brice. |
| `.htaccess` | Redirection forcée vers HTTPS. |
| `favicon.png`, `logo-dark.png`, `logo-light.png`, `legacy-icon.png` | Images du site. |
| `.github/workflows/deploy.yml` | Workflow de déploiement automatique sur le FTP OVH. |
| `CLAUDE.md` | Consignes pour Claude et les contributeurs (non publié). |
| `guide_llm.html` | Document de travail (non publié). |
| `assets/`, `vite.svg` | Fichiers hérités, voir [plus bas](#fichiers-hérités). |

### Cache des navigateurs

Les ressources sont versionnées par paramètre de requête dans `index.html` :

```html
<link rel="stylesheet" href="./styles.css?v=6" />
<script src="./app.js?v=10"></script>
```

**Incrémenter ce numéro à chaque modification** de `styles.css` ou de `app.js`, sinon les visiteurs continuent de voir l'ancienne version.

## Lancer le site en local

Il suffit d'un PHP récent (avec l'extension cURL pour Brice) :

```bash
php -S localhost:8000
```

Puis ouvrir <http://localhost:8000>.

Pour que Brice réponde en local, fournir une clé d'API dans l'environnement :

```bash
OPENAI_API_KEY=sk-... php -S localhost:8000
```

Sans clé, le catalogue fonctionne normalement ; seul Brice renvoie une erreur.

## Brice, l'assistant

Brice est le panneau conversationnel en bas à droite de la page. Le navigateur envoie la question en `POST` à `api/brice.php`, qui :

1. refuse toute autre méthode que `POST` et toute requête venant d'une autre origine ;
2. limite la taille de la question (800 caractères) ;
3. limite le débit à **12 questions par session sur 10 minutes** ;
4. interroge l'API OpenAI (endpoint `responses`) avec des instructions qui restreignent Brice au catalogue ;
5. renvoie une ou deux recommandations au format Markdown.

Côté client, un lien cité par Brice n'est affiché que si son URL figure dans le tableau `tools` de `app.js` : Brice ne peut pas renvoyer vers un site extérieur au catalogue.

### Configuration

| Variable d'environnement | Rôle | Valeur par défaut |
| --- | --- | --- |
| `OPENAI_API_KEY` ou `BRICE_OPENAI_API_KEY` | Clé d'API OpenAI. | — |
| `BRICE_CONFIG_PATH` | Chemin d'un fichier PHP privé renvoyant `['openai_api_key' => '...']`. | `brice-private.php`, à côté du dossier `outils/` (donc hors du dossier publié). |
| `BRICE_MODEL` | Modèle utilisé. | `gpt-5-mini` |

En production, la clé est lue depuis `brice-private.php`, placé sur le serveur **en dehors** du dossier publié. Ce fichier n'est jamais dans le dépôt.

## Ajouter une brique au catalogue

Une brique est une petite application Public IA hébergée sur son propre sous-domaine (par exemple `https://concours-photos.public-ia.fr/`). Pour l'ajouter :

1. **`app.js`, tableau `tools`** : ajouter `{ name, description, category, url, color }` **juste après « Chat Public IA »**. Les briques les plus récentes apparaissent en premier ; « Chat Public IA » reste la première tuile (la grande tuile 2×2) et « Public IA » reste la dernière.
   - `description` : une phrase courte (environ 60 caractères), sinon le texte déborde et masque « Accéder ».
   - `category` : une catégorie existante de `icons` (Dialoguer, Protéger, Décider, Comprendre, Analyser, Concevoir, Se former, Évaluer, Partager, Automatiser, Découvrir). Une nouvelle catégorie demande aussi une icône dans `icons` et une entrée dans `filterGroups`.
   - `color` : `blue`, `teal`, `violet`, `lime` ou `orange`, cohérente avec les outils de la même catégorie.
2. **`app.js`, tableau `bentoSizes`** : la taille d'une tuile dépend de sa **position** dans `tools` (`tile--lead` = 2×2, `tile--wide` = 2×1, `tile--tall` = 1×2, `""` = 1×1). La grille a 4 colonnes : le total des cases doit rester un **multiple de 4**. Ajouter une taille en fin de tableau pour chaque nouvel outil, puis vérifier qu'aucune description ne déborde dans les tuiles 1×1.
3. **`api/brice.php`, bloc `$catalogue`** : ajouter la ligne `- Nom — usage — URL`. Sans cela, Brice ne recommandera jamais la brique.
4. **`index.html`** : incrémenter `app.js?v=…` (et `styles.css?v=…` si le CSS change).
5. **Vérifier en local** que la grille est complète sur grand écran et que la tuile s'affiche bien sur mobile.

## Workflow de contribution

1. Créer une branche à partir de `main`.
2. Faire les modifications et les tester en local.
3. Ouvrir une **pull request** vers `main` et la faire relire.
4. Fusionner : le site est mis en ligne automatiquement.

**Ne jamais pousser directement sur `main`.**

## Déploiement

Le déploiement est entièrement automatisé par `.github/workflows/deploy.yml` :

- **Déclencheur** : chaque push sur `main` (donc chaque fusion de pull request). Il peut aussi être relancé à la main depuis l'onglet *Actions* de GitHub (`workflow_dispatch`).
- **Action** : [`SamKirkland/FTP-Deploy-Action`](https://github.com/SamKirkland/FTP-Deploy-Action) envoie les fichiers modifiés dans le dossier `/outils/` du FTP OVH.
- **Identifiants** : secrets GitHub `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`.
- **Délai** : le site est à jour quelques minutes après la fusion.

Il n'y a **pas d'environnement de préproduction** : ce qui arrive sur `main` est en ligne.

### Exclure un fichier du déploiement

Tout fichier du dépôt est publié, sauf ceux listés dans la section `exclude` de `deploy.yml` (actuellement `.git*`, `node_modules`, `README.md`, `CLAUDE.md`, `guide_llm.html`). **Un fichier qui ne doit pas être en ligne doit y être ajouté.**

### Suivre un déploiement

Dans GitHub, onglet **Actions** → workflow **« Déploiement FTP »**. En cas d'échec, consulter les journaux du job, corriger dans le dépôt, puis fusionner une nouvelle pull request (ou relancer le workflow).

## Le FTP : contrôle uniquement

Le FTP OVH **n'est plus un moyen de mise à jour du site**. La source de vérité est ce dépôt, et c'est le workflow GitHub qui écrit sur le serveur.

L'accès FTP reste utile **en lecture, pour contrôler** :

- vérifier qu'un déploiement a bien été appliqué (présence et date des fichiers, numéro de version dans `index.html`) ;
- comparer les fichiers en ligne avec le dépôt en cas de doute ;
- consulter les journaux du serveur pour diagnostiquer une erreur (par exemple une erreur de Brice) ;
- vérifier la présence de `brice-private.php` hors du dossier publié.

À ne **pas** faire sur le FTP :

- modifier, ajouter ou supprimer un fichier du dossier `/outils/` ;
- « corriger vite fait » en production : la correction serait écrasée au prochain déploiement, ou laisserait le serveur différent du dépôt sans que personne ne le sache.

Si un écart est constaté entre le serveur et le dépôt, on le corrige **dans le dépôt** et on redéploie.

Seule exception : le fichier privé `brice-private.php` (clé d'API), qui vit hors du dossier publié et n'a pas vocation à être dans le dépôt.

## Sécurité et secrets

- **Aucun secret dans le dépôt** : ni clé d'API, ni mot de passe, ni identifiant FTP, ni jeton, ni fichier de configuration privé.
- Les identifiants FTP sont dans les **secrets GitHub** ; la clé OpenAI est sur le **serveur**, hors du dossier publié.
- Brice n'enregistre pas les conversations côté OpenAI (`store: false`) et l'interface rappelle de ne pas saisir de données personnelles ou confidentielles.

## Fichiers hérités

Les fichiers suivants ne sont **plus utilisés** par la page actuelle :

- `assets/` (anciens bundles générés par Vite)
- `vite.svg`

Ne pas s'appuyer dessus ni les modifier. À noter : ils ne sont pas exclus du déploiement et sont donc encore envoyés sur le serveur.
