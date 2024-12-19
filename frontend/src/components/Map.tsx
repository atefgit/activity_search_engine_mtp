import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Activity } from '../types/Activity';

// Fix for default marker icons in React-Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    activities: Activity[];
    center?: LatLngTuple;
    zoom?: number;
}

const Map: React.FC<MapProps> = ({ 
    activities, 
    center = [43.610769, 3.876716], // Centre de Montpellier par défaut
    zoom = 13 
}) => {
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '500px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {activities.map((activity) => (
                <Marker
                    key={activity.id}
                    position={[activity.latitude, activity.longitude]}
                >
                    <Popup>
                        <div>
                            <h3>{activity.title}</h3>
                            <p>{activity.description}</p>
                            <p>Prix: {activity.price}€</p>
                            <p>Catégorie: {activity.category}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
