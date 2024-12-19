-- Création de la table si elle n'existe pas
CREATE TABLE IF NOT EXISTS activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    location VARCHAR(255),
    price DECIMAL(10,2),
    imageUrl TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    participantType ENUM('solo', 'duo', 'group'),
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Suppression des données existantes
DELETE FROM activity;

-- Réinitialisation de l'auto-increment
ALTER TABLE activity AUTO_INCREMENT = 1;

-- Insertion des activités
INSERT INTO activity (title, description, category, location, price, imageUrl, latitude, longitude, participantType, isActive, createdAt, updatedAt) VALUES
('Visite du musée Fabre', 'Découvrez l''une des plus belles collections de peintures en Europe', 'Culture', 'Montpellier Centre', 8.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/musee-fabre-montpellier-3d.jpg', 43.6114, 3.8808, 'solo', true, NOW(), NOW()),
('Randonnée au Pic Saint-Loup', 'Magnifique randonnée avec vue panoramique sur la région', 'Nature', 'Saint-Mathieu-de-Tréviers', 0.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/pic-saint-loup.jpg', 43.7833, 3.8167, 'group', true, NOW(), NOW()),
('Cours de surf à La Grande-Motte', 'Initiation au surf avec des moniteurs professionnels', 'Sport', 'La Grande-Motte', 45.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/surf-grande-motte.jpg', 43.5667, 4.0833, 'duo', true, NOW(), NOW()),
('Dégustation de vins', 'Découverte des vins de la région avec un sommelier', 'Culture', 'Saint-Christol', 25.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/degustation-vin.jpg', 43.7167, 4.0833, 'group', true, NOW(), NOW()),
('Escape Game Medieval', 'Résolvez les énigmes dans un décor médiéval authentique', 'Culture', 'Montpellier Centre', 28.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/escape-game.jpg', 43.6100, 3.8767, 'group', true, NOW(), NOW()),
('Location de vélo électrique', 'Explorez la ville et ses environs en vélo électrique', 'Sport', 'Montpellier Centre', 35.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/velo-electrique.jpg', 43.6108, 3.8767, 'solo', true, NOW(), NOW()),
('Aquarium Planet Ocean', 'Découvrez la vie marine méditerranéenne', 'Culture', 'Odysseum Montpellier', 18.50, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/aquarium.jpg', 43.6042, 3.9174, 'duo', true, NOW(), NOW()),
('Kayak dans les Gorges de l''Hérault', 'Descente en kayak dans un cadre naturel exceptionnel', 'Sport', 'Saint-Guilhem-le-Désert', 40.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/kayak.jpg', 43.7333, 3.5500, 'duo', true, NOW(), NOW()),
('Cours de cuisine locale', 'Apprenez à cuisiner les spécialités régionales', 'Culture', 'Montpellier Centre', 65.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/cuisine.jpg', 43.6100, 3.8767, 'group', true, NOW(), NOW()),
('Visite du Zoo de Lunaret', 'Découvrez plus de 1000 animaux dans un parc naturel', 'Nature', 'Montpellier Nord', 0.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/zoo.jpg', 43.6389, 3.8722, 'duo', true, NOW(), NOW()),
('Balade à cheval', 'Promenade à cheval dans la garrigue montpelliéraine', 'Sport', 'Montferrier-sur-Lez', 50.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/cheval.jpg', 43.6667, 3.8667, 'duo', true, NOW(), NOW()),
('Atelier de poterie', 'Initiez-vous à l''art de la poterie', 'Culture', 'Montpellier Centre', 40.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/poterie.jpg', 43.6100, 3.8767, 'solo', true, NOW(), NOW()),
('Plongée à Palavas', 'Exploration des fonds marins méditerranéens', 'Sport', 'Palavas-les-Flots', 80.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/plongee.jpg', 43.5333, 3.9333, 'duo', true, NOW(), NOW()),
('Visite des jardins', 'Découverte des jardins historiques de Montpellier', 'Nature', 'Montpellier Centre', 0.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/jardins.jpg', 43.6114, 3.8789, 'solo', true, NOW(), NOW()),
('Paintball nature', 'Session de paintball en pleine nature', 'Sport', 'Saint-Jean-de-Védas', 30.00, 'https://www.montpellier-tourisme.fr/content/uploads/2019/05/paintball.jpg', 43.5667, 3.8333, 'group', true, NOW(), NOW());
