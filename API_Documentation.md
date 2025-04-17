# API Documentation

## Blog Controller
- **POST** `/api/blog/create` - Create a new blog post (Admin only)
  - **Request Body**:
    ```json
    {
      "title": "Sample Blog Title",
      "content": "This is the content of the blog post.",
      "author": "Author Name",
      "tags": ["tag1", "tag2"],
      "category": "Category Name",
      "media": "http://example.com/media",
    }
    ```
  - **Responses**:
    - **201**: Blog post created successfully
    - **400**: Bad request - Invalid data
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin

**POST** `/api/blog/comment/{blogId}` - Add a comment to a blog post
  - **Request Body**:
    ```json
    {
      "content": "This is a comment on the blog post."
    }
    ```
  - **Responses**:
    - **201**: Comment added successfully
    - **400**: Bad request - Invalid data
    - **500**: Internal server error - Unable to add comment
  - **Example Request**:
    ```bash
    curl -X POST http://localhost:3000/api/blog/comment/12345 \
    -H "Content-Type: application/json" \
    -d '{"content": "This is a comment on the blog post."}'
    ```
  - **Example Response**:
    ```json
    {
      "message": "Comment added successfully",
      "comment": {
        "id": "67890",
        "content": "This is a comment on the blog post.",
        "userId": "userId",
        "blogId": "12345"
      }
    }
    ```

- **GET** `/api/blog/` - Retrieve all blog posts (Public access)
  - **Query Parameters**:
    - `page`: Page number for pagination (default: 1)
    - `limit`: Number of items per page (default: 10)
  - **Responses**:
    - **200**: List of all blog posts
    - **500**: Error retrieving blog posts

- **GET** `/api/blog/{id}` - Retrieve a blog post by ID (Public access)
  - **Responses**:
    - **200**: The requested blog post
    - **404**: Blog post not found
    - **500**: Error retrieving blog post

- **PUT** `/api/blog/update/{id}` - Update an existing blog post (Admin only)
  - **Request Body**:
    ```json
    {
      "title": "Updated Blog Title",
      "content": "Updated content of the blog post.",
      "tags": ["tag1", "tag2"],
      "category": "Updated Category Name",
      "media": "http://example.com/media",
     
    }
    ```
  - **Responses**:
    - **200**: Blog post updated successfully
    - **400**: Bad request - Invalid data
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin
    - **404**: Blog post not found

- **DELETE** `/api/blog/{id}` - Delete a blog post by ID (Admin only)
  - **Responses**:
    - **200**: Blog post deleted successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin
    - **404**: Blog post not found

## Startup Controller
- **POST** `/api/startups/create` - Create a new startup (Registered users and Admins)
  - **Request Body**:
    ```json
    {
      "name": "Startup Name",
      "description": "Short description of the startup.",
      "sector": "Tech",
      "fundingStage": "Seed",
      "location": "City, Country",
      "foundedYear": 2023,
      "region": "Region Name",
      "website": "http://example.com",
      "achievements": [],
      "status": "Active",
      "founders": ["Founder Name"],
      "socialMedia": {}
    }
    ```
  - **Responses**:
    - **201**: Startup created successfully
    - **400**: Bad request - Invalid data

- **GET** `/api/startups` - Get all startups (Registered users and Admins)
  - **Query Parameters**:
    - `page`: Page number for pagination (default: 1)
    - `limit`: Number of items per page (default: 10)
  - **Responses**:
    - **200**: List of startups
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User does not have the required role
    - **500**: Error retrieving startups

- **GET** `/api/startups/{id}` - Get a specific startup by ID (Registered users and Admins)
  - **Responses**:
    - **200**: Startup data retrieved successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User does not have the required role
    - **404**: Startup not found

- **PUT** `/api/startups/{id}` - Update a specific startup by ID (Registered users and Admins)
  - **Request Body**:
    ```json
    {
      "name": "Updated Startup Name",
      "description": "Updated description of the startup.",
      "sector": "Updated Sector",
      "fundingStage": "Updated Funding Stage",
      "location": "Updated Location",
      "foundedYear": 2023,
      "region": "Updated Region",
      "website": "http://example.com",
      "achievements": [],
      "status": "Active",
      "founders": ["Updated Founder Name"],
      "socialMedia": {}
    }
    ```
  - **Responses**:
    - **200**: Startup updated successfully
    - **400**: Bad request - Invalid data
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User does not have the required role
    - **404**: Startup not found

- **DELETE** `/api/startups/{id}` - Delete a specific startup by ID (Admin only)
  - **Responses**:
    - **200**: Startup deleted successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin
    - **404**: Startup not found

## Event Controller
- **POST** `/api/events/` - Create a new event (Admin only)
  - **Request Body**:
    ```json
    {
      "name": "Sample Event",
      "description": "Description of the event.",
      "date": "2023-10-01T10:00:00Z",
      "location": "Event Location"
    }
    ```
  - **Responses**:
    - **201**: Event created successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin

- **PUT** `/api/events/{id}` - Update an event (Admin only)
  - **Request Body**:
    ```json
    {
      "name": "Updated Event Name",
      "description": "Updated description of the event."
    }
    ```
  - **Responses**:
    - **200**: Event updated successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin
    - **404**: Event not found

- **DELETE** `/api/events/{id}` - Delete an event (Admin only)
  - **Responses**:
    - **200**: Event deleted successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin
    - **404**: Event not found

- **GET** `/api/events/` - Retrieve a list of events (Public access)
  - **Responses**:
    - **200**: List of events
    - **500**: Error retrieving events

- **POST** `/api/events/{id}/rsvp` - RSVP to an event (Registered users and Admins)
  - **Responses**:
    - **200**: RSVP successful
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not registered or admin
    - **404**: Event not found

## Resource Controller
- **GET** `/api/resources/` - Get all resources (Public access)
  - **Responses**:
    - **200**: List of resources
    - **500**: Error retrieving resources

- **POST** `/api/resources/` - Add a new resource (Admin only)
  - **Request Body**:
    ```json
    {
      "title": "Resource Title",
      "description": "Description of the resource.",
      "file": "http://example.com/resource-file"
    }
    ```
  - **Responses**:
    - **201**: Resource added successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin

- **POST** `/api/resources/upload` - Upload a file (Admin only)
  - **Request Body**: Multipart form-data with file
  - **Responses**:
    - **200**: File uploaded successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin

- **GET** `/api/resources/download/{id}` - Download a resource file (Registered users only)
  - **Responses**:
    - **200**: File downloaded successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not registered
    - **404**: Resource not found

- **GET** `/api/resources/search` - Search resources (Registered users only)
  - **Parameters**: 
    - `query`: Search term to filter resources
  - **Responses**:
    - **200**: Search results
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not registered

## Signup Controller
- **POST** `/api/signup/create` - Create a new signup (Public access)
  - **Request Body**:
    ```json
    {
      "userEmail": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "123-456-7890"
    }
    ```
  - **Responses**:
    - **201**: Signup created successfully
    - **400**: Bad request - Invalid data

- **GET** `/api/signup/` - Get all signups (Admin only)
  - **Responses**:
    - **200**: List of signups
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin
    - **500**: Error retrieving signups

- **GET** `/api/signup/{id}` - Get signup by ID (Admin only)
  - **Responses**:
    - **200**: Signup data retrieved successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin
    - **404**: Signup not found

- **DELETE** `/api/signup/{id}` - Delete signup by ID (Admin only)
  - **Responses**:
    - **200**: Signup deleted successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin
    - **404**: Signup not found

## Testimonial Controller
- **POST** `/api/testimonials` - Create a new testimonial (Admin only)
  - **Request Body**:
    ```json
    {
      "startupId": "startup-id",
      "content": "This is a testimonial."
    }
    ```
  - **Responses**:
    - **201**: Testimonial created successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin

- **GET** `/api/testimonials/:startupId` - Retrieve testimonials for a specific startup (Public access)
  - **Responses**:
    - **200**: List of testimonials
    - **404**: No testimonials found

- **GET** `/api/testimonials/:id` - Retrieve a testimonial by ID (Public access)
  - **Responses**:
    - **200**: The requested testimonial
    - **404**: Testimonial not found

- **PUT** `/api/testimonials/:id` - Update an existing testimonial (Admin only)
  - **Request Body**:
    ```json
    {
      "content": "Updated testimonial content."
    }
    ```
  - **Responses**:
    - **200**: Testimonial updated successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin
    - **404**: Testimonial not found

- **DELETE** `/api/testimonials/:id` - Delete a testimonial by ID (Admin only)
  - **Responses**:
    - **200**: Testimonial deleted successfully
    - **401**: Unauthorized - Invalid or missing token
    - **403**: Forbidden - User is not an admin
    - **404**: Testimonial not found


## Investment & Funding Management


- **POST** `/api/investors/create` - Create a new investor
  - **Request Body**:
    ```json
    {
      "name": "KIC",
      "location": "Accra",
      "supportRound": "Series A",
      "dealSize": "$500k - 1M",
      "totalSupport": 100000000,
      "numberOfSupportedStartups": "1000 - 2000",
      "topSupportedStartups": ["My Figtech", "Crop Capital"]
    }
    ```
  - **Responses**:
    - **201**: Investor created successfully
    - **400**: Bad request - Invalid data

- **GET** `/api/investors` - Retrieve all investors (with optional filters)
  - **Query Parameters**:
    - `location`: Filter by location
    - `supportRound`: Filter by round (e.g., Series A, B, etc.)
    - `dealSize`: Filter by deal size
    - `search`: Keyword search
    - `page`: Page number for pagination (default: 1)
    - `limit`: Number of items per page (default: 10)
  - **Responses**:
    - **200**: List of investors
    - **500**: Error retrieving investors

- **GET** `/api/investors/metrics` - Retrieve investment dashboard metrics
  - **Description**: Returns overall metrics (Total Funding, Number of Investors, etc.)
  - **Responses**:
    - **200**: Metrics data
    - **500**: Error retrieving metrics

- **GET** `/api/investors/export` - Export investors to Excel/CSV
  - **Description**: Exports filtered or all investors to an Excel/CSV file
  - **Query Parameters**:
    - Same as `/api/investors` for filters
  - **Responses**:
    - **200**: Excel/CSV file download
    - **500**: Error exporting investors

- **GET** `/api/investors/{id}` - Retrieve an investor by ID
  - **Responses**:
    - **200**: Investor details
    - **404**: Investor not found
    - **500**: Error retrieving investor

- **DELETE** `/api/investors/{id}` - Delete an investor by ID
  - **Responses**:
    - **200**: Investor deleted successfully
    - **404**: Investor not found
    - **500**: Error deleting investor
