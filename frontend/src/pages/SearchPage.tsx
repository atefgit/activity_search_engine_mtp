import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import axios from 'axios';
import ActivityCard from '../components/ActivityCard';
import SearchFilters from '../components/SearchFilters';
import Map from '../components/Map';
import { Activity } from '../types/Activity';

const SearchPage: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/activities`);
                console.log('Réponse API:', response.data);
                setActivities(response.data);
                setFilteredActivities(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur lors de la récupération des activités:', err);
                setError('Erreur lors de la récupération des activités');
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    const handleSearch = (filters: {
        searchQuery: string;
        category: string;
        priceRange: number[];
        participantType: string;
    }) => {
        let filtered = activities;

        // Filtre par recherche textuelle
        if (filters.searchQuery) {
            const searchLower = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(activity =>
                activity.title.toLowerCase().includes(searchLower) ||
                activity.description.toLowerCase().includes(searchLower)
            );
        }

        // Filtre par catégorie
        if (filters.category) {
            filtered = filtered.filter(activity => activity.category === filters.category);
        }

        // Filtre par type de participant
        if (filters.participantType) {
            filtered = filtered.filter(activity => activity.participantType === filters.participantType);
        }

        // Filtre par prix
        filtered = filtered.filter(activity =>
            activity.price >= filters.priceRange[0] && activity.price <= filters.priceRange[1]
        );

        setFilteredActivities(filtered);
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Filtres */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <SearchFilters onSearch={handleSearch} />
                    </Paper>
                </Grid>

                {/* Carte */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Map activities={filteredActivities} />
                    </Paper>
                </Grid>

                {/* Liste des activités */}
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        {filteredActivities.length === 0 ? (
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, textAlign: 'center' }}>
                                    Aucune activité ne correspond à vos critères de recherche.
                                </Paper>
                            </Grid>
                        ) : (
                            filteredActivities.map((activity) => (
                                <Grid item xs={12} sm={6} md={4} key={activity.id}>
                                    <ActivityCard activity={activity} />
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SearchPage;
