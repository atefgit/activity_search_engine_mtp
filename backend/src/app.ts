import express from 'express';
import cors from 'cors';
import { activityController } from './controllers/ActivityController';
import { AppDataSource } from './config/database';

const app = express();

// Configuration CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.get('/api/activities', (req, res) => activityController.getAllActivities(req, res));

// Middleware pour la gestion des erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;
