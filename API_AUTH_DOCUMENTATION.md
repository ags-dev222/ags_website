# API Authentication Documentation

## Authentication Endpoints

### Register User
- **URL**: `/api/auth/registerUser`
- **Method**: `POST`
- **Description**: Register a new user (No authentication required).
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "mysecurepassword",
    "role": "Registered"
  }
  ```
- **Responses**:
  - `201`: User registered successfully.
  - `400`: Missing required fields.

### Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Login user and get JWT token.
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "mysecurepassword"
  }
  ```
- **Responses**:
  - `200`: Login successful.
  - `401`: Invalid credentials.

### Refresh Access Token
- **URL**: `/api/auth/refresh-token`
- **Method**: `POST`
- **Description**: Refresh access token using refresh token.
- **Request Body**:
  ```json
  {
    "refreshToken": "your_refresh_token_here"
  }
  ```
- **Responses**:
  - `200`: New access token issued.
    ```json
    {
      "token": "new_jwt_access_token"
    }
    ```
  - `401`: Invalid or expired refresh token.

### Get User Profile
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Description**: Get user profile (Authentication required).
- **Responses**:
  - `200`: Returns the authenticated user's profile.
  - `401`: Unauthorized - Token missing or invalid.

### Logout User
- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Description**: Logout user (Client-side action).
- **Responses**:
  - `200`: Successfully logged out.
  - `401`: Unauthorized - Token missing or invalid.

### Admin Data
- **URL**: `/api/auth/adminData`
- **Method**: `GET`
- **Description**: Access admin-only route.
- **Responses**:
  - `200`: Admin access granted.
  - `403`: Forbidden - User lacks admin role.
  - `401`: Unauthorized - Token missing or invalid.

### User Resources
- **URL**: `/api/auth/userResources`
- **Method**: `GET`
- **Description**: Access registered user resources (Authentication required).
- **Responses**:
  - `200`: Access granted to registered users and admins.
  - `403`: Forbidden - User lacks necessary role.
  - `401`: Unauthorized - Token missing or invalid.
