# 🍽️ Restaurant Review & Sentiment Analysis Platform

A containerized full-stack application that allows users to host restaurant reviews and automatically analyzes user sentiment using AI. This project demonstrates a production-grade microservices architecture orchestrated with Docker.

---

## 🏗️ System Architecture

This project leverages a multi-container strategy to ensure scalability and ease of deployment:

*   **Frontend:** React (React Router) served by a **Caddy** web server.
*   **Backend:** **ASP.NET Core Web API** managing the business logic and database interactions.
*   **Intelligence:** **Python-based Sentiment Analysis** integrated into the .NET backend.
*   **Database:** **PostgreSQL 16** for relational data storage.
*   **Orchestration:** **Docker Compose** managing the private network, volumes, and service dependencies.

---

## 🚀 Technical Deep Dive

### 🐳 Docker Orchestration & DevOps
The project is built around a robust `docker-compose.yml` that manages the lifecycle of the application:
*   **Automated EF Core Migrations:** A dedicated ephemeral container (`migration`) handles database schema updates automatically upon startup, ensuring the Postgres DB is always in sync with the .NET models.
*   **Health Checks:** The backend service waits for the Postgres service to report as `healthy` before attempting to connect, preventing startup race conditions.
*   **Reverse Proxy:** Caddy handles incoming traffic on ports 80/443, routing API requests to the backend while serving the React single-page application.

### 🧠 Polyglot Backend (C# + Python)
Rather than a monolithic approach, the backend bridges two ecosystems:
*   **ASP.NET Core** provides the high-performance API and Entity Framework Core layer.
*   **Python Integration:** Sentiment analysis is performed by a Python script invoked by the .NET backend to provide real-time scoring of user reviews (Positive/Neutral/Negative).

### 🔒 Secure Infrastructure
*   **Private Networking:** All services communicate over a dedicated bridge network (`app-network`), exposing only the Caddy server to the outside world.
*   **Environment Injection:** Database credentials and sensitive strings are managed via `${VARIABLES}` in the compose file for security and portability.

---

## 🛠️ Project Structure
```text
├── restaurant-api/         # ASP.NET Core Source Code
│   ├── Dockerfile.Backend  # Multi-stage build for API
│   └── scripts/            # Python Sentiment Analysis scripts
├── src/                    # React Frontend Source Code
├── Dockerfile              # Frontend build + Caddy configuration
├── Dockerfile.migration    # Specialized EF Core migration runner
├── Caddyfile               # Caddy reverse proxy & routing rules
└── docker-compose.yml      # Service orchestration
```

## 🚦 Run in a container

 ### Requirements

 - [Docker](https://www.docker.com/)

Open a Terminal:
- Windows: Use Git Bash, PowerShell, or Command Prompt.
- Mac/Linux: Use the default terminal.

Run:
```bash
git clone https://github.com/Jamie-Andrews1/Restaurant-review-app.git
```
```bash
cd Restaurant-review-app
```

Create a .env file in the same directory and create your own variables:
```bash
DATABASE="myDatabaseName"
USER_ID="myUser"
PASSWORD="myPassword"
```

Start services:
```bash
docker compose up -d --build
```

Access app at [http://localhost:80](http://localhost:80)

Clean up:
```bash
docker compose down --volumes
```
