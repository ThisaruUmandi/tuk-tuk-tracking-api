# tuk-tuk-tracking-api 

## Overview

TukTrack SL is a secure RESTful Web API designed for law enforcement agencies in Sri Lanka to monitor and manage registered three-wheelers (tuk-tuks).

The system enables real-time GPS tracking, historical movement logging, vehicle registration, driver management, and police operational monitoring through province, district, and police station hierarchies.

This project focuses entirely on backend API development and follows REST principles, secure authentication practices, modular architecture, and deployment-ready standards.

---

## Features

### Administrative Management
- Province management
- District management
- Police station management
- User management
- Driver management
- Tuk-tuk registration
- Tracking device management

### Real-Time Tracking
- GPS location submission
- Latest vehicle location retrieval
- Historical movement logs
- Time-window filtering

### Operational Monitoring
- Province-wise filtering
- District-wise filtering
- Police station-wise filtering
- Vehicle status monitoring

### Security
- JWT authentication
- Role-based access control (RBAC)
- Device API key authentication
- Password hashing
- Request validation
- Rate limiting
- Secure HTTP headers
- Centralized error handling

### Documentation
- Swagger / OpenAPI documentation
- Postman collection support

---

## System Architecture

```text
Province
 └── District
      └── Police Station
            ├── Users
            ├── Tuk-Tuks
            └── Location Logs

Driver
 └── Tuk-Tuks

Tuk-Tuk
 └── Tracking Device

Tracking Device
 └── Location Logs

Users

```

---

## Database Design

### Main Entities
Provinces
Districts
Police Stations
Users - Admins and police officers
Drivers
Tuk-Tuks
Tracking Devices
Location Logs

---


## Technology Stack

Runtime - Node.js
Framework - Express.js
Database - PostgreSQL
Database Driver - pg
Authentication - JWT
Validation - Zod
Documentation - Swagger

---

## Project Structure

```text
tuktrack-sl-api/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── db/
│   │   ├── migrations/
│   │   └── seeds/
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── validateRequest.js
│   │   ├── errorHandler.js
│   │   └── rateLimiter.js
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── provinces/
│   │   ├── districts/
│   │   ├── police-stations/
│   │   ├── users/
│   │   ├── drivers/
│   │   ├── tuk-tuks/
│   │   ├── tracking-devices/
│   │   ├── location-logs/
│   │   └── audit-logs/
│   │
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env.example
├── package.json
├── README.md
└── LICENSE
```

---

## How to Run

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm

---

### Clone Repository

```bash
git clone https://github.com/ThisaruUmandi/tuk-tuk-tracking-api.git

cd tuktrack-sl-api
```

---

### Install Dependencies

```bash
npm install
```

---

### Configure Environment Variables

Create a `.env` file:

```env
NODE_ENV=development

PORT=5000

DATABASE_HOST
DATABASE_PORT
DATABASE_NAME
DATABASE_USER
DATABASE_PASSWORD

JWT_SECRET
JWT_EXPIRES_IN
```

---

### Run Database Migrations

```bash
npm run migrate
```

---

### Seed Database

```bash
npm run seed
```

---

### Start Development Server

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

---

## Authentication

### User Authentication

Uses JWT Bearer Tokens.

Example:

```http
Authorization: Bearer <access_token>
```

Supported Roles:

- admin
- police

---

### Device Authentication

Tracking devices authenticate using API Keys.

Example:

```http
X-API-Key: device_api_key_here
```

---

## 📡 Core API Endpoints

### Authentication

```http
POST /api/v1/auth/login
```

---

### Provinces

```http
GET    /api/v1/provinces
GET    /api/v1/provinces/:id
```

---

### Districts

```http
GET    /api/v1/districts
GET    /api/v1/districts/:id
```

---

### Police Stations

```http
GET    /api/v1/police-stations
GET    /api/v1/police-stations/:id
```

---

### Drivers

```http
GET    /api/v1/drivers
GET    /api/v1/drivers/:id
POST   /api/v1/drivers
PATCH  /api/v1/drivers/:id
```

---

### Tuk-Tuks

```http
GET    /api/v1/tuk-tuks
GET    /api/v1/tuk-tuks/:id
POST   /api/v1/tuk-tuks
PATCH  /api/v1/tuk-tuks/:id
```

---

### Tracking Devices

```http
GET    /api/v1/tracking-devices
POST   /api/v1/tracking-devices
PATCH  /api/v1/tracking-devices/:id
```

---

### Location Tracking

```http
POST /api/v1/location-logs
GET  /api/v1/tuk-tuks/:id/latest-location
GET  /api/v1/tuk-tuks/:id/history
```



## API Documentation

Swagger UI:

```text
http://localhost:5000/api-docs
```

Swagger provides:

- Endpoint documentation
- Request examples
- Response examples
- Authentication testing
- Error response definitions

---

## Testing

Recommended Tools:

- Swagger UI
- Postman

---

## Security Features

### Authentication
- JWT Access Tokens
- API Key Authentication

### Authorization
- Role-Based Access Control (RBAC)

### API Security
- Request Validation
- Rate Limiting
- Secure HTTP Headers
- Password Hashing
- Input Sanitization

### Monitoring
- Location Logs

---


## Author

Developed as part of the Web API Development module using Node.js, Express.js, PostgreSQL, and REST API best practices.
