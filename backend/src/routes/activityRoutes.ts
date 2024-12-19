import { Router } from 'express';
import { activityController } from '../controllers/ActivityController';

const router = Router();

// Route pour obtenir toutes les activités
router.get('/', activityController.getAllActivities);

// Route pour rechercher des activités avec des filtres
router.get('/search', activityController.searchActivities);

export default router;
