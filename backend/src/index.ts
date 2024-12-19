import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import { activityController } from './controllers/ActivityController';
import { Activity } from './entities/Activity';

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Configuration CORS
app.use(cors({
  origin: '*', // Autoriser toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
}));

// Middleware pour parser le JSON
app.use(express.json());

// Middleware de logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  console.log('Query params:', req.query);
  console.log('Body:', req.body);
  next();
});

// Routes
app.get('/api/activities/search', (req: Request, res: Response) => activityController.searchActivities(req, res));
app.get('/api/activities/:id', (req: Request, res: Response) => activityController.getActivityById(req, res));
app.get('/api/activities', (req: Request, res: Response) => activityController.getAllActivities(req, res));
app.post('/api/activities', (req: Request, res: Response) => activityController.createActivity(req, res));
app.put('/api/activities/:id', (req: Request, res: Response) => activityController.updateActivity(req, res));
app.delete('/api/activities/:id', (req: Request, res: Response) => activityController.deleteActivity(req, res));

// Route de test
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Gestion des erreurs globale
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erreur globale:', err);
  res.status(500).json({
    message: 'Une erreur est survenue sur le serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Fonction pour vérifier la structure de la base de données
const checkDatabaseStructure = async () => {
  try {
    const repository = AppDataSource.getRepository(Activity);
    const count = await repository.count();
    console.log(`Nombre d'activités dans la base de données: ${count}`);
    
    // Vérification de la structure de la table
    const columns = await AppDataSource.query('DESCRIBE activity');
    console.log('Structure de la table activity:', columns);
    
    // Vérification des données
    const activities = await repository.find({ take: 1 });
    if (activities.length > 0) {
      console.log('Exemple d\'activité:', activities[0]);
    } else {
      console.log('Aucune activité trouvée dans la base de données');
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de la base de données:', error);
    throw error;
  }
};

// Initialisation de la base de données et démarrage du serveur
const initializeApp = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Base de données connectée avec succès');

    // Vérification de la structure de la base de données
    await checkDatabaseStructure();

    app.listen(port, '0.0.0.0', () => {
      console.log(`Serveur démarré sur http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    process.exit(1);
  }
};

initializeApp().catch(error => {
  console.error('Erreur fatale:', error);
  process.exit(1);
});
