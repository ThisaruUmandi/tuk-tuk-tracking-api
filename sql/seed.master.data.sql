-- =========================
-- SEED: PROVINCES
-- =========================
INSERT INTO provinces (name, code) VALUES
('Western', 'WP'),
('Central', 'CP'),
('Southern', 'SP'),
('Northern', 'NP'),
('Eastern', 'EP'),
('North Western', 'NWP'),
('North Central', 'NCP'),
('Uva', 'UP'),
('Sabaragamuwa', 'SGP');

-- =========================
-- SEED: DISTRICTS
-- =========================
INSERT INTO districts (province_id, name, code) VALUES
-- Western
(1, 'Colombo', 'COL'),
(1, 'Gampaha', 'GAM'),
(1, 'Kalutara', 'KAL'),

-- Central
(2, 'Kandy', 'KAN'),
(2, 'Matale', 'MAT'),
(2, 'Nuwara Eliya', 'NUE'),

-- Southern
(3, 'Galle', 'GAL'),
(3, 'Matara', 'MTR'),
(3, 'Hambantota', 'HAM'),

-- Northern
(4, 'Jaffna', 'JAF'),
(4, 'Kilinochchi', 'KIL'),
(4, 'Mannar', 'MAN'),
(4, 'Mullaitivu', 'MUL'),
(4, 'Vavuniya', 'VAV'),

-- Eastern
(5, 'Trincomalee', 'TRI'),
(5, 'Batticaloa', 'BAT'),
(5, 'Ampara', 'AMP'),

-- North Western
(6, 'Kurunegala', 'KUR'),
(6, 'Puttalam', 'PUT'),

-- North Central
(7, 'Anuradhapura', 'ANU'),
(7, 'Polonnaruwa', 'POL'),

-- Uva
(8, 'Badulla', 'BAD'),
(8, 'Monaragala', 'MON'),

-- Sabaragamuwa
(9, 'Ratnapura', 'RAT'),
(9, 'Kegalle', 'KEG');

-- =========================
-- SEED: POLICE STATIONS
-- =========================
INSERT INTO police_stations (province_id, district_id, name, code, address, phone, email, is_active) VALUES
-- Western / Colombo
(1, 1, 'Colombo Fort Police Station', 'PS-COL-001', 'Fort, Colombo', '0112421111', 'fort.ps@example.com', TRUE),
(1, 1, 'Pettah Police Station', 'PS-COL-002', 'Pettah, Colombo', '0112322222', 'pettah.ps@example.com', TRUE),
(1, 1, 'Maradana Police Station', 'PS-COL-003', 'Maradana, Colombo', '0112333333', 'maradana.ps@example.com', TRUE),

-- Western / Gampaha
(1, 2, 'Negombo Police Station', 'PS-GAM-001', 'Negombo', '0312221111', 'negombo.ps@example.com', TRUE),
(1, 2, 'Kiribathgoda Police Station', 'PS-GAM-002', 'Kiribathgoda', '0112911111', 'kiribathgoda.ps@example.com', TRUE),
(1, 2, 'Wattala Police Station', 'PS-GAM-003', 'Wattala', '0112933333', 'wattala.ps@example.com', TRUE),

-- Western / Kalutara
(1, 3, 'Kalutara South Police Station', 'PS-KAL-001', 'Kalutara South', '0342221111', 'kalutara.ps@example.com', TRUE),
(1, 3, 'Panadura Police Station', 'PS-KAL-002', 'Panadura', '0382233333', 'panadura.ps@example.com', TRUE),

-- Central / Kandy
(2, 4, 'Kandy Police Station', 'PS-KAN-001', 'Kandy', '0812221111', 'kandy.ps@example.com', TRUE),
(2, 4, 'Peradeniya Police Station', 'PS-KAN-002', 'Peradeniya', '0812388888', 'peradeniya.ps@example.com', TRUE),

-- Central / Matale
(2, 5, 'Matale Police Station', 'PS-MAT-001', 'Matale', '0662221111', 'matale.ps@example.com', TRUE),

-- Central / Nuwara Eliya
(2, 6, 'Nuwara Eliya Police Station', 'PS-NUE-001', 'Nuwara Eliya', '0522221111', 'nuwaraeliya.ps@example.com', TRUE),

-- Southern / Galle
(3, 7, 'Galle Police Station', 'PS-GAL-001', 'Galle', '0912221111', 'galle.ps@example.com', TRUE),
(3, 7, 'Hikkaduwa Police Station', 'PS-GAL-002', 'Hikkaduwa', '0912277777', 'hikkaduwa.ps@example.com', TRUE),

-- Southern / Matara
(3, 8, 'Matara Police Station', 'PS-MTR-001', 'Matara', '0412221111', 'matara.ps@example.com', TRUE),

-- Southern / Hambantota
(3, 9, 'Hambantota Police Station', 'PS-HAM-001', 'Hambantota', '0472221111', 'hambantota.ps@example.com', TRUE),

-- Northern / Jaffna
(4, 10, 'Jaffna Police Station', 'PS-JAF-001', 'Jaffna', '0212221111', 'jaffna.ps@example.com', TRUE),

-- Eastern / Trincomalee
(5, 15, 'Trincomalee Police Station', 'PS-TRI-001', 'Trincomalee', '0262221111', 'trinco.ps@example.com', TRUE),

-- North Western / Kurunegala
(6, 18, 'Kurunegala Police Station', 'PS-KUR-001', 'Kurunegala', '0372221111', 'kurunegala.ps@example.com', TRUE),

-- North Central / Anuradhapura
(7, 20, 'Anuradhapura Police Station', 'PS-ANU-001', 'Anuradhapura', '0252221111', 'anuradhapura.ps@example.com', TRUE),

-- Uva / Badulla
(8, 22, 'Badulla Police Station', 'PS-BAD-001', 'Badulla', '0552221111', 'badulla.ps@example.com', TRUE),

-- Sabaragamuwa / Ratnapura
(9, 24, 'Ratnapura Police Station', 'PS-RAT-001', 'Ratnapura', '0452221111', 'ratnapura.ps@example.com', TRUE);


-- =========================
-- SEED: DRIVERS
-- =========================
INSERT INTO drivers (first_name, last_name, nic, phone, license_number, address, is_active) VALUES
('Dinesh', 'Gunawardena', '901111111V', '0771111111', 'B6789012', 'Colombo', TRUE),
('Chaminda', 'Peris', '902222222V', '0712222222', 'B7890123', 'Negombo', TRUE),
('Lakshan', 'Dias', '903333333V', '0753333333', 'B8901234', 'Kurunegala', TRUE),
('Tharindu', 'Jayasinghe', '904444444V', '0764444444', 'B9012345', 'Kegalle', TRUE),
('Pradeep', 'Fernando', '905555555V', '0785555555', 'B0123456', 'Panadura', TRUE),
('Roshan', 'Silva', '906666666V', '0776666666', 'B1122334', 'Matara', TRUE),
('Ishan', 'Perera', '907777777V', '0717777777', 'B2233445', 'Ratnapura', TRUE),
('Suresh', 'Kumar', '908888888V', '0758888888', 'B3344556', 'Jaffna', TRUE),
('Nuwan', 'Hettiarachchi', '909999999V', '0769999999', 'B4455667', 'Anuradhapura', TRUE),
('Ravindu', 'Senanayake', '910101010V', '0781010101', 'B5566778', 'Polonnaruwa', TRUE);

-- =========================
-- SEED: TUKTUKS
-- =========================
INSERT INTO tuk_tuks (
    province_id,
    district_id,
    police_station_id,
    driver_id,
    registration_number,
    status,
    last_latitude,
    last_longitude,
    last_recorded_at
) VALUES
-- Western Province
(1, 1, 1, 1, 'WP CAB-1234', 'active', 6.9271000, 79.8612000, CURRENT_TIMESTAMP),
(1, 2, 4, 2, 'WP CAB-5678', 'active', 7.2083000, 79.8358000, CURRENT_TIMESTAMP),
(1, 3, 7, 3, 'WP CAB-9012', 'inactive', NULL, NULL, NULL),
(1, 1, 2, 4, 'WP CAB-2222', 'active', 6.9000000, 79.8700000, CURRENT_TIMESTAMP),

-- Central Province
(2, 4, 9, 5, 'CP CAB-3456', 'active', 7.2906000, 80.6337000, CURRENT_TIMESTAMP),
(2, 5, 10, 6, 'CP CAB-6543', 'inactive', NULL, NULL, NULL),

-- Southern Province
(3, 7, 13, 7, 'SP CAB-7890', 'flagged', 6.0535000, 80.2210000, CURRENT_TIMESTAMP),
(3, 8, 14, 8, 'SP CAB-4321', 'active', 5.9485000, 80.5353000, CURRENT_TIMESTAMP),

-- North / Other
(4, 10, 18, 9, 'NP CAB-8765', 'active', 9.6615000, 80.0255000, CURRENT_TIMESTAMP),
(5, 12, 20, 10, 'NC CAB-1111', 'inactive', NULL, NULL, NULL);