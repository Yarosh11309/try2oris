# sem_2_k_2

This project is an ASP.NET Core web application. The repository now includes a SQLite database and Docker configuration for running the site.

## Database

The application uses Entity Framework Core with SQLite. Two tables are created on startup:

- **Products** – stores shop items (Id, Name, Price, ImageUrl).
- **Tournaments** – stores tournament entries (Id, Name, Prize, ImageUrl).

When the application starts the database is created automatically and filled with a few sample records. You can add or remove entries through the UI which now sends requests to the backend API.

## Running with Docker

Build and run the application using Docker:

```bash
docker build -t sem-2-k-2 .
docker run -p 8080:80 sem-2-k-2
```

The site will be available at `http://localhost:8080`.
