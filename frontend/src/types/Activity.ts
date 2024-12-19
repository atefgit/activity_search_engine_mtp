export interface Activity {
    id: number;
    title: string;
    description: string;
    category: string;
    location: string;
    price: number;
    imageUrl: string;
    participantType: 'solo' | 'duo' | 'group';
    latitude: number;
    longitude: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
