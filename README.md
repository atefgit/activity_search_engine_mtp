# Activity Search Engine - Montpellier

## À propos du projet

Activity Search Engine est une application web moderne qui permet aux utilisateurs de découvrir et d'explorer diverses activités à Montpellier. Elle offre une interface utilisateur intuitive et facile d'utilisation, ainsi que des fonctionnalités avancées pour aider les utilisateurs à trouver des activités qui correspondent à leurs besoins.

### Fonctionnalités principales

- Recherche d'activités par catégorie, type de participant et budget
- Visualisation des activités sur une carte interactive
- Filtrage par fourchette de prix
-  Distinction entre activités solo et de groupe
-  Interface utilisateur moderne et responsive
- Architecture microservices avec Docker

## Stack Technique

### Frontend
React 18 et TypeScript pour un code fiable et maintenable
Material-UI pour créer une interface élégante et responsive
Leaflet pour l'intégration de cartes interactives
Axios pour la communication avec l'API
React Query pour une gestion optimisée du cache et des états

### Backend
Node.js avec Express pour une API performante
TypeScript pour améliorer la qualité du code
TypeORM pour simplifier l'accès aux données
MySQL pour le stockage des données
Docker pour faciliter le déploiement

### Outils de développement
Docker Compose pour l'orchestration des services
ESLint et Prettier pour la qualité du code
Git pour le versioning
npm pour la gestion des dépendances

## Installation et Démarrage

### Prérequis
- Docker et Docker Compose
- Node.js (v18 ou supérieur)
- npm (v8 ou supérieur)

### Configuration
1. Clonez le repository :
```bash
git clone https://github.com/votre-username/activity_search_engine_mtp.git
cd activity_search_engine_mtp
```

2. Créez un fichier .env à la racine du projet :
```env
MYSQL_ROOT_PASSWORD=votre_mot_de_passe
MYSQL_DATABASE=activity_search_db
MYSQL_USER=votre_utilisateur
MYSQL_PASSWORD=votre_mot_de_passe
```

### Lancement
1. Démarrez les conteneurs Docker :
```bash
docker-compose up -d
```

2. Initialisez la base de données :
```bash
docker exec activity_search_backend npm run scrape
```

3. L'application est accessible sur :
- Frontend : http://localhost:3000
- Backend API : http://localhost:3001

## Architecture et Organisation du Code

Le projet est organisé en deux parties principales :

Frontend (React)
- components : Éléments réutilisables de l'interface
- pages : Les différentes vues de l'application
- services : Communication avec l'API
- types : Définitions TypeScript

Backend (Node.js)
- config : Paramètres de l'application
- controllers : Gestion des requêtes API
- entities : Modèles de données
- services : Logique métier

## Choix Techniques

Les choix techniques ont été guidés par plusieurs facteurs :

TypeScript apporte une meilleure fiabilité au code en détectant les erreurs avant l'exécution.

React, couplé à Material-UI, permet de créer rapidement des interfaces modernes et agréables à utiliser.

Node.js et Express forment un duo efficace pour le backend, avec une grande communauté et beaucoup de ressources disponibles.

Docker simplifie le déploiement et assure que l'application fonctionne de la même façon en développement et en production.

TypeORM facilite les interactions avec la base de données tout en gardant de bonnes performances.

## Évolutions Futures

- Ajout d'authentification utilisateur
- Système de notation et commentaires
- Intégration de tests automatisés
- Optimisation des performances avec Redis
- Mise en place d'un CDN pour les images
- Déploiement sur un service cloud (AWS/GCP/Azure)

![image](https://github.com/user-attachments/assets/035f30b0-5396-4c48-a264-834c9feb139b)

