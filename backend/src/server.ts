import app from './app';
import { AppDataSource } from './config/database';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(() => {
        console.log('Base de données connectée avec succès');
        
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erreur lors de la connexion à la base de données:', error);
    });
