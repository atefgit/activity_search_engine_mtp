FROM node:16-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Nettoyer le cache npm et installer les dépendances
RUN npm cache clean --force && \
    rm -rf node_modules && \
    npm install --legacy-peer-deps

# Copier le reste des fichiers
COPY . .

EXPOSE 5173

# Démarrer l'application en mode développement
CMD ["sh", "-c", "npm install --legacy-peer-deps && npm run dev"]
