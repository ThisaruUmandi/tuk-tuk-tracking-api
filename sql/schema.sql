CREATE TABLE provinces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    province_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_district_province
        FOREIGN KEY (province_id) REFERENCES provinces(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
CREATE INDEX idx_districts_province_id ON districts(province_id);

CREATE TABLE police_stations (
    id SERIAL PRIMARY KEY,
    province_id INT NOT NULL,
    district_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    email VARCHAR(120),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_station_province
        FOREIGN KEY (province_id) REFERENCES provinces(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT fk_station_district
        FOREIGN KEY (district_id) REFERENCES districts(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
CREATE INDEX idx_police_stations_province_id ON police_stations(province_id);
CREATE INDEX idx_police_stations_district_id ON police_stations(district_id);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    police_station_id INT NULL,
    frst_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_station
        FOREIGN KEY (police_station_id) REFERENCES police_stations(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
CREATE INDEX idx_users_police_station_id ON users(police_station_id);

CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    nic VARCHAR(20) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    license_number VARCHAR(50) NOT NULL UNIQUE,
    address TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tuk_tuks (
    id SERIAL PRIMARY KEY,
    province_id INT NOT NULL,
    district_id INT NOT NULL,
    police_station_id INT NOT NULL,
    driver_id INT NOT NULL,
    registration_number VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    last_latitude DECIMAL(10,7),
    last_longitude DECIMAL(10,7),
    last_recorded_at TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tuktuk_province
        FOREIGN KEY (province_id) REFERENCES provinces(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT fk_tuktuk_district
        FOREIGN KEY (district_id) REFERENCES districts(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT fk_tuktuk_station
        FOREIGN KEY (police_station_id) REFERENCES police_stations(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT fk_tuktuk_driver
        FOREIGN KEY (driver_id) REFERENCES drivers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT chk_tuktuk_status
        CHECK (status IN ('active', 'inactive', 'flagged'))
);
CREATE INDEX idx_tuktuks_province_id ON tuk_tuks(province_id);
CREATE INDEX idx_tuktuks_district_id ON tuk_tuks(district_id);
CREATE INDEX idx_tuktuks_police_station_id ON tuk_tuks(police_station_id);
CREATE INDEX idx_tuktuks_driver_id ON tuk_tuks(driver_id);

CREATE TABLE tracking_devices (
    id SERIAL PRIMARY KEY,
    tuk_tuk_id INT NOT NULL UNIQUE,
    serial_number VARCHAR(100) NOT NULL UNIQUE,
    api_key VARCHAR(255) NOT NULL UNIQUE,
    installed_at TIMESTAMP NULL,
    last_seen_at TIMESTAMP NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_device_tuktuk
        FOREIGN KEY (tuk_tuk_id) REFERENCES tuk_tuks(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
CREATE INDEX idx_tracking_devices_tuk_tuk_id 
ON tracking_devices(tuk_tuk_id);

CREATE INDEX idx_tracking_devices_serial_number 
ON tracking_devices(serial_number);

CREATE INDEX idx_tracking_devices_api_key 
ON tracking_devices(api_key);

CREATE INDEX idx_tracking_devices_is_active 
ON tracking_devices(is_active);


CREATE TABLE location_logs (
    id BIGSERIAL PRIMARY KEY,
    tuk_tuk_id INT NOT NULL,
    tracking_device_id INT NOT NULL,
    police_station_id INT NOT NULL,
    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,
    speed DECIMAL(6,2),
    heading DECIMAL(6,2),
    recorded_at TIMESTAMP NOT NULL,
    source VARCHAR(20) NOT NULL DEFAULT 'gps',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_log_tuktuk
        FOREIGN KEY (tuk_tuk_id) REFERENCES tuk_tuks(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_log_device
        FOREIGN KEY (tracking_device_id) REFERENCES tracking_devices(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_log_station
        FOREIGN KEY (police_station_id) REFERENCES police_stations(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    CONSTRAINT chk_log_source
        CHECK (source IN ('gps', 'simulated', 'manual'))
);
CREATE INDEX idx_location_logs_tuk_tuk_id ON location_logs(tuk_tuk_id);
CREATE INDEX idx_location_logs_tracking_device_id ON location_logs(tracking_device_id);
CREATE INDEX idx_location_logs_police_station_id ON location_logs(police_station_id);
CREATE INDEX idx_location_logs_recorded_at ON location_logs(recorded_at);
CREATE INDEX idx_location_logs_tuk_tuk_recorded_at ON location_logs(tuk_tuk_id, recorded_at DESC);
