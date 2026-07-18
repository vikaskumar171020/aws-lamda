# API Specification

This document details the available endpoints, request bodies, and responses for the AWS Lambda Express API.

## Base URL
When running locally: `http://127.0.0.1:3000`  
When deployed: `https://{rest-api-id}.execute-api.{region}.amazonaws.com/Prod/`

---

## Endpoints

### 1. Welcome / Root Endpoint
Returns basic information about the API and its status.

- **URL**: `/`
- **Method**: `GET`
- **Headers**: `Accept: application/json`
- **Success Response (200 OK)**:
  ```json
  {
    "message": "Welcome to the AWS Lambda Express API with TypeScript!",
    "status": "Running",
    "timestamp": "2026-07-18T21:50:00.000Z",
    "endpoints": {
      "health": "GET /health",
      "users": "GET /users",
      "createUser": "POST /users"
    }
  }
  ```

---

### 2. Health Check
Returns the current health status of the application.

- **URL**: `/health`
- **Method**: `GET`
- **Success Response (200 OK)**:
  ```json
  {
    "status": "UP",
    "uptime": 12.34
  }
  ```

---

### 3. List Users
Returns a list of all mock database users.

- **URL**: `/users`
- **Method**: `GET`
- **Success Response (200 OK)**:
  ```json
  {
    "count": 2,
    "users": [
      { "id": "1", "name": "John Doe", "email": "john@example.com" },
      { "id": "2", "name": "Jane Smith", "email": "jane@example.com" }
    ]
  }
  ```

---

### 4. Create User
Adds a new user to the mock database.

- **URL**: `/users`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "name": "Alice Cooper",
    "email": "alice@example.com"
  }
  ```
- **Success Response (201 Created)**:
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": "3",
      "name": "Alice Cooper",
      "email": "alice@example.com"
    }
  }
  ```
- **Error Response (400 Bad Request)**:
  ```json
  {
    "error": "Name and email are required"
  }
  ```
