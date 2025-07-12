# Run in a container

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
