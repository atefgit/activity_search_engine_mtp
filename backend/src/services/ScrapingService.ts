import { Activity } from '../entities/Activity';
import { AppDataSource } from '../config/database';
import { Repository } from 'typeorm';

type ActivityInput = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>;

export class ScrapingService {
    private activityRepository: Repository<Activity>;

    constructor() {
        this.activityRepository = AppDataSource.getRepository(Activity);
    }

    private encodeImageUrl(url: string): string {
        return url.replace(/[éèêë]/g, 'e')
                 .replace(/[àâä]/g, 'a')
                 .replace(/[ùûü]/g, 'u')
                 .replace(/[îï]/g, 'i')
                 .replace(/[ôö]/g, 'o')
                 .replace(/[ç]/g, 'c')
                 .replace(/[']/g, '')
                 .replace(/\s+/g, '_');
    }

    private generateActivities(): ActivityInput[] {
        const activities: ActivityInput[] = [
            {
                title: "Place de la Comédie",
                description: "Place emblématique de Montpellier, centre névralgique de la ville avec son architecture remarquable.",
                category: "Culture",
                location: "Montpellier",
                price: 0,
                imageUrl: "https://live.staticflickr.com/4353/37171339155_6dc734d9a8_b.jpg",
                latitude: 43.608547,
                longitude: 3.879449,
                participantType: "solo",
                isActive: true
            },
            {
                title: "Jardin des Plantes",
                description: "Plus ancien jardin botanique de France, créé en 1593, offrant une belle collection de plantes méditerranéennes.",
                category: "Nature",
                location: "Montpellier",
                price: 3,
                imageUrl: "https://live.staticflickr.com/3935/15408518288_566771b797_b.jpg",
                latitude: 43.614096,
                longitude: 3.873069,
                participantType: "group",
                isActive: true
            },
            {
                title: "Cathédrale Saint-Pierre",
                description: "Cathédrale gothique imposante du XIVe siècle avec des tours caractéristiques.",
                category: "Culture",
                location: "Montpellier",
                price: 0,
                imageUrl: "https://live.staticflickr.com/4062/4505632855_8e1e95a4a1_b.jpg",
                latitude: 43.613489,
                longitude: 3.873252,
                participantType: "group",
                isActive: true
            },
            {
                title: "Promenade du Peyrou",
                description: "Esplanade historique offrant une vue panoramique sur la ville et les environs.",
                category: "Culture",
                location: "Montpellier",
                price: 0,
                imageUrl: "https://live.staticflickr.com/7405/9407929441_3a0645d2dd_b.jpg",
                latitude: 43.611935,
                longitude: 3.870932,
                participantType: "group",
                isActive: true
            },
            {
                title: "Musée Fabre",
                description: "Un des plus importants musées des beaux-arts en France avec une collection exceptionnelle.",
                category: "Culture",
                location: "Montpellier",
                price: 8,
                imageUrl: "https://live.staticflickr.com/4572/38544577336_c7e9d7a6f7_b.jpg",
                latitude: 43.611241,
                longitude: 3.879860,
                participantType: "solo",
                isActive: true
            },
            {
                title: "Zoo de Lunaret",
                description: "Parc zoologique gratuit présentant une grande variété d'espèces dans un cadre naturel.",
                category: "Nature",
                location: "Montpellier",
                price: 0,
                imageUrl: "https://live.staticflickr.com/4056/4505632163_c71a45b727_b.jpg",
                latitude: 43.641672,
                longitude: 3.874391,
                participantType: "group",
                isActive: true
            },
            {
                title: "Aquarium Mare Nostrum",
                description: "Aquarium moderne présentant la biodiversité méditerranéenne et mondiale.",
                category: "Nature",
                location: "Montpellier",
                price: 18.50,
                imageUrl: "https://live.staticflickr.com/7309/9407929225_2bc7e8a26f_b.jpg",
                latitude: 43.604439,
                longitude: 3.883257,
                participantType: "solo",
                isActive: true
            },
            {
                title: "Escape Game Montpellier",
                description: "Jeux d'évasion immersifs avec différents scénarios passionnants.",
                category: "Divertissement",
                location: "Montpellier",
                price: 25,
                imageUrl: "https://live.staticflickr.com/7365/9407929321_d8741c4f83_b.jpg",
                latitude: 43.608872,
                longitude: 3.877836,
                participantType: "solo",
                isActive: true
            },
            {
                title: "Location de Vélos",
                description: "Service de location de vélos pour explorer la ville et ses environs.",
                category: "Sport",
                location: "Montpellier",
                price: 15,
                imageUrl: "https://live.staticflickr.com/4059/4505632651_c2c2f39a89_b.jpg",
                latitude: 43.610769,
                longitude: 3.876716,
                participantType: "group",
                isActive: true
            },
            {
                title: "Visite Guidée du Centre Historique",
                description: "Découverte de l'histoire et du patrimoine de Montpellier avec un guide expert.",
                category: "Culture",
                location: "Montpellier",
                price: 12,
                imageUrl: "https://live.staticflickr.com/4060/4505632753_8e1e95a4a1_b.jpg",
                latitude: 43.611657,
                longitude: 3.877411,
                participantType: "solo",
                isActive: true
            }
        ];

        return activities;
    }

    async scrapeActivities(): Promise<void> {
        try {
            console.log('Base de données connectée');
            console.log('Démarrage du scraping des activités...');
            
            console.log('Démarrage de la génération des activités...');
            const activities = this.generateActivities();
            console.log(`Génération terminée. ${activities.length} activités générées.`);

            console.log('Sauvegarde des activités...');
            for (const activity of activities) {
                const existingActivity = await this.activityRepository.findOne({
                    where: { title: activity.title }
                });

                if (!existingActivity) {
                    // Encode the image URL before saving
                    activity.imageUrl = this.encodeImageUrl(activity.imageUrl);
                    const newActivity = this.activityRepository.create(activity);
                    await this.activityRepository.save(newActivity);
                    console.log(`Activité sauvegardée: ${activity.title}`);
                }
            }

            console.log('Scraping terminé avec succès !');
        } catch (error) {
            console.error('Erreur lors du scraping:', error);
            throw error;
        }
    }
}
