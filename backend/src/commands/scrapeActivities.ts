import { AppDataSource } from '../config/database';
import { ScrapingService } from '../services/ScrapingService';

async function main() {
    try {
        // Initialiser la connexion à la base de données
        await AppDataSource.initialize();
        console.log('Base de données connectée');

        // Créer une instance du service de scraping
        const scrapingService = new ScrapingService();

        // Exécuter le scraping
        await scrapingService.scrapeActivities();

        console.log('Scraping terminé avec succès !');
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors du scraping:', error);
        process.exit(1);
    }
}

main();
