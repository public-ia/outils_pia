# Politique de sécurité

Ce dépôt contient le code du site [outils.public-ia.fr](https://outils.public-ia.fr/) et de son assistant **Brice** (`api/brice.php`).

## Signaler une vulnérabilité

**N'ouvrez pas d'issue publique** pour signaler une faille de sécurité.

Utilisez le signalement privé de GitHub : onglet **Security** du dépôt, puis **Report a vulnerability**. Seuls les mainteneurs voient le signalement.

Merci d'indiquer :

- la page ou le fichier concerné ;
- les étapes pour reproduire le problème ;
- l'impact possible (accès à des données, détournement de Brice, consommation abusive de l'API, etc.).

Nous accusons réception dans les meilleurs délais et vous tenons informé de la correction. Merci de ne pas divulguer la faille publiquement avant qu'elle soit corrigée.

## Périmètre

Sont concernés :

- le site statique (`index.html`, `styles.css`, `app.js`) ;
- l'API de Brice (`api/brice.php`) : validation des entrées, limitation de débit, contrôle d'origine, détournement des instructions (« prompt injection ») ;
- le workflow de déploiement (`.github/workflows/deploy.yml`).

Ne sont pas concernées par ce dépôt les briques hébergées sur leurs propres sous-domaines (`*.public-ia.fr`) : chacune a son propre code.

## Secrets

Ce dépôt ne contient aucun secret : la clé d'API de Brice est stockée sur le serveur, hors du dossier publié, et les identifiants de déploiement sont dans les secrets GitHub. Si vous trouvez malgré tout une clé, un mot de passe ou un jeton dans le dépôt ou son historique, signalez-le de la même manière.
