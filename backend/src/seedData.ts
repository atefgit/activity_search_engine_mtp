import { AppDataSource } from './config/database';
import { Activity } from './entities/Activity';

async function seedDatabase() {
    try {
        await AppDataSource.initialize();
        console.log('Base de données connectée');

        const activityRepository = AppDataSource.getRepository(Activity);

        // Supprimer toutes les activités existantes
        await activityRepository.clear();

        // Créer les nouvelles activités
        const activities = [
            {
                title: 'Visite du musée Fabre',
                description: 'Découvrez l\'une des plus belles collections de peintures en Europe',
                category: 'Culture',
                location: 'Montpellier Centre',
                price: 8.00,
                imageUrl: 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/musee-fabre-montpellier-3d.jpg',
                latitude: 43.6114,
                longitude: 3.8808,
                participantType: 'solo' as const,
                isActive: true
            },
            {
                title: 'Randonnée au Pic Saint-Loup',
                description: 'Magnifique randonnée avec vue panoramique sur la région',
                category: 'Nature',
                location: 'Saint-Mathieu-de-Tréviers',
                price: 0.00,
                imageUrl: 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/pic-saint-loup.jpg',
                latitude: 43.7833,
                longitude: 3.8167,
                participantType: 'group' as const,
                isActive: true
            }
        ];

        for (const activity of activities) {
            const newActivity = activityRepository.create(activity);
            await activityRepository.save(newActivity);
        }

        console.log('Base de données initialisée avec succès');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
        process.exit(1);
    }
}

seedDatabase();
