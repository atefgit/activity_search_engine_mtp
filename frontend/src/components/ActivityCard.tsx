import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box
} from '@mui/material';
import { Activity } from '../types/Activity';

interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    const [imageError, setImageError] = useState(false);
    const fallbackImage = 'https://via.placeholder.com/400x300?text=Image+non+disponible';

    useEffect(() => {
        console.log('Activity:', activity);
        console.log('Image URL:', activity.imageUrl);
    }, [activity]);

    const handleImageError = () => {
        console.error(`Erreur de chargement de l'image pour ${activity.title}:`, activity.imageUrl);
        setImageError(true);
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="200"
                image={imageError ? fallbackImage : activity.imageUrl || fallbackImage}
                alt={activity.title}
                onError={handleImageError}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    {activity.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {activity.category} - {activity.location}
                </Typography>
                <Typography variant="body2" paragraph>
                    {activity.description}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="textSecondary">
                        {activity.participantType === 'solo' ? 'Activité individuelle' : 'Activité de groupe'}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        {activity.price > 0 ? `${activity.price}€` : 'Gratuit'}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ActivityCard;
