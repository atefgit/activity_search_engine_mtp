import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Activity } from '../entities/Activity';
import { Like, LessThanOrEqual, FindOptionsWhere } from 'typeorm';

class ActivityController {
    private repository = AppDataSource.getRepository(Activity);

    getAllActivities = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Début de getAllActivities');
            const activities = await this.repository.find({
                where: { isActive: true },
                order: { createdAt: 'DESC' }
            });
            console.log(`${activities.length} activités trouvées`);
            res.json(activities);
        } catch (error) {
            console.error('Erreur getAllActivities:', error);
            if (error instanceof Error) {
                console.error('Message d\'erreur:', error.message);
                console.error('Stack trace:', error.stack);
            }
            res.status(500).json({
                message: 'Erreur lors de la récupération des activités',
                error: error instanceof Error ? error.message : 'Erreur inconnue',
                stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
            });
        }
    };

    searchActivities = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Début de searchActivities');
            console.log('Query params reçus:', req.query);
            
            const { query, category, maxPrice, participantType } = req.query;
            console.log('Paramètres extraits:', { query, category, maxPrice, participantType });

            // Vérification de la connexion à la base de données
            if (!AppDataSource.isInitialized) {
                console.error('La base de données n\'est pas initialisée');
                res.status(500).json({ message: 'Erreur de connexion à la base de données' });
                return;
            }

            let whereConditions: any[] = [];

            // Construction de la clause WHERE
            if (query && typeof query === 'string') {
                whereConditions.push({
                    title: Like(`%${query}%`),
                    isActive: true
                });
                whereConditions.push({
                    description: Like(`%${query}%`),
                    isActive: true
                });
                whereConditions.push({
                    location: Like(`%${query}%`),
                    isActive: true
                });
            } else {
                whereConditions.push({ isActive: true });
            }

            // Ajout des filtres supplémentaires
            if (category && typeof category === 'string' && category !== 'all') {
                whereConditions = whereConditions.map(condition => ({
                    ...condition,
                    category
                }));
            }

            if (maxPrice && !isNaN(Number(maxPrice))) {
                whereConditions = whereConditions.map(condition => ({
                    ...condition,
                    price: LessThanOrEqual(Number(maxPrice))
                }));
            }

            if (participantType && typeof participantType === 'string' && participantType !== 'all') {
                whereConditions = whereConditions.map(condition => ({
                    ...condition,
                    participantType
                }));
            }

            console.log('Conditions de recherche:', JSON.stringify(whereConditions, null, 2));

            // Exécution de la requête
            const activities = await this.repository.find({
                where: whereConditions,
                order: {
                    createdAt: 'DESC'
                }
            });

            console.log(`${activities.length} activités trouvées`);
            
            // Envoi de la réponse
            res.json(activities);
            
        } catch (error) {
            console.error('Erreur dans searchActivities:', error);
            if (error instanceof Error) {
                console.error('Message d\'erreur:', error.message);
                console.error('Stack trace:', error.stack);
            }
            res.status(500).json({
                message: 'Erreur lors de la recherche des activités',
                error: error instanceof Error ? error.message : 'Erreur inconnue',
                stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
            });
        }
    };

    getActivityById = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Début de getActivityById');
            const { id } = req.params;
            const activity = await this.repository.findOne({
                where: { id: Number(id), isActive: true }
            });

            if (!activity) {
                console.log('Activité non trouvée');
                res.status(404).json({ message: 'Activité non trouvée' });
                return;
            }

            console.log('Activité trouvée');
            res.json(activity);
        } catch (error) {
            console.error('Erreur getActivityById:', error);
            if (error instanceof Error) {
                console.error('Message d\'erreur:', error.message);
                console.error('Stack trace:', error.stack);
            }
            res.status(500).json({
                message: 'Erreur lors de la récupération de l\'activité',
                error: error instanceof Error ? error.message : 'Erreur inconnue',
                stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
            });
        }
    };

    createActivity = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Début de createActivity');
            const activity = this.repository.create({
                ...req.body,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            const result = await this.repository.save(activity);
            console.log('Activité créée');
            res.status(201).json(result);
        } catch (error) {
            console.error('Erreur createActivity:', error);
            if (error instanceof Error) {
                console.error('Message d\'erreur:', error.message);
                console.error('Stack trace:', error.stack);
            }
            res.status(500).json({
                message: 'Erreur lors de la création de l\'activité',
                error: error instanceof Error ? error.message : 'Erreur inconnue',
                stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
            });
        }
    };

    updateActivity = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Début de updateActivity');
            const { id } = req.params;
            const activity = await this.repository.findOne({
                where: { id: Number(id), isActive: true }
            });

            if (!activity) {
                console.log('Activité non trouvée');
                res.status(404).json({ message: 'Activité non trouvée' });
                return;
            }

            const updatedActivity = this.repository.merge(activity, {
                ...req.body,
                updatedAt: new Date()
            });

            const result = await this.repository.save(updatedActivity);
            console.log('Activité mise à jour');
            res.json(result);
        } catch (error) {
            console.error('Erreur updateActivity:', error);
            if (error instanceof Error) {
                console.error('Message d\'erreur:', error.message);
                console.error('Stack trace:', error.stack);
            }
            res.status(500).json({
                message: 'Erreur lors de la mise à jour de l\'activité',
                error: error instanceof Error ? error.message : 'Erreur inconnue',
                stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
            });
        }
    };

    deleteActivity = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Début de deleteActivity');
            const { id } = req.params;
            const activity = await this.repository.findOne({
                where: { id: Number(id), isActive: true }
            });

            if (!activity) {
                console.log('Activité non trouvée');
                res.status(404).json({ message: 'Activité non trouvée' });
                return;
            }

            activity.isActive = false;
            activity.updatedAt = new Date();
            await this.repository.save(activity);
            console.log('Activité supprimée');
            res.status(204).send();
        } catch (error) {
            console.error('Erreur deleteActivity:', error);
            if (error instanceof Error) {
                console.error('Message d\'erreur:', error.message);
                console.error('Stack trace:', error.stack);
            }
            res.status(500).json({
                message: 'Erreur lors de la suppression de l\'activité',
                error: error instanceof Error ? error.message : 'Erreur inconnue',
                stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
            });
        }
    };
}

export const activityController = new ActivityController();
