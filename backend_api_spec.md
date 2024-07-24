# Backend API Specification for Object Detection Application

## 1. Authentication

### 1.1 User Authentication
- Endpoint: `/api/auth/login`
- Method: POST
- Description: Authenticate user and return a JWT token
- Request Body:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- Response:
  ```json
  {
    "token": "string",
    "user_id": "string"
  }
  ```

### 1.2 User Registration
- Endpoint: `/api/auth/register`
- Method: POST
- Description: Register a new user
- Request Body:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- Response:
  ```json
  {
    "user_id": "string",
    "message": "User registered successfully"
  }
  ```

## 2. Image Upload and Detection

### 2.1 Upload Image for Detection
- Endpoint: `/api/detection/upload`
- Method: POST
- Description: Upload an image and initiate object detection
- Request:
  - Headers:
    - Authorization: Bearer {token}
  - Body: Form-data with 'image' file
- Response:
  ```json
  {
    "detection_id": "string",
    "message": "Image uploaded and detection initiated"
  }
  ```

### 2.2 Get Detection Results
- Endpoint: `/api/detection/results/{detection_id}`
- Method: GET
- Description: Retrieve the results of a specific detection
- Request:
  - Headers:
    - Authorization: Bearer {token}
- Response:
  ```json
  {
    "detection_id": "string",
    "status": "completed | processing | failed",
    "results": [
      {
        "class": "string",
        "confidence": "float",
        "bbox": [x, y, width, height]
      }
    ]
  }
  ```

### 2.3 List User's Detections
- Endpoint: `/api/detection/list`
- Method: GET
- Description: List all detections for the authenticated user
- Request:
  - Headers:
    - Authorization: Bearer {token}
  - Query Parameters:
    - page: int
    - limit: int
- Response:
  ```json
  {
    "detections": [
      {
        "detection_id": "string",
        "timestamp": "datetime",
        "status": "completed | processing | failed"
      }
    ],
    "total": "int",
    "page": "int",
    "limit": "int"
  }
  ```

## 3. User Settings

### 3.1 Get User Settings
- Endpoint: `/api/settings`
- Method: GET
- Description: Retrieve user settings
- Request:
  - Headers:
    - Authorization: Bearer {token}
- Response:
  ```json
  {
    "confidenceThreshold": "float",
    "useGPU": "boolean",
    "enableMultiThreading": "boolean"
  }
  ```

### 3.2 Update User Settings
- Endpoint: `/api/settings`
- Method: PUT
- Description: Update user settings
- Request:
  - Headers:
    - Authorization: Bearer {token}
  - Body:
    ```json
    {
      "confidenceThreshold": "float",
      "useGPU": "boolean",
      "enableMultiThreading": "boolean"
    }
    ```
- Response:
  ```json
  {
    "message": "Settings updated successfully"
  }
  ```

## 4. Detection History

### 4.1 Get Detection History
- Endpoint: `/api/history`
- Method: GET
- Description: Retrieve detection history for the user
- Request:
  - Headers:
    - Authorization: Bearer {token}
  - Query Parameters:
    - page: int
    - limit: int
    - start_date: date (optional)
    - end_date: date (optional)
- Response:
  ```json
  {
    "history": [
      {
        "detection_id": "string",
        "timestamp": "datetime",
        "detected_objects": [
          {
            "class": "string",
            "count": "int"
          }
        ]
      }
    ],
    "total": "int",
    "page": "int",
    "limit": "int"
  }
  ```

### 4.2 Export Detection History
- Endpoint: `/api/history/export`
- Method: GET
- Description: Export detection history as CSV
- Request:
  - Headers:
    - Authorization: Bearer {token}
  - Query Parameters:
    - start_date: date (optional)
    - end_date: date (optional)
- Response:
  - CSV file download

## 5. Model Management

### 5.1 Get Available Models
- Endpoint: `/api/models`
- Method: GET
- Description: Retrieve list of available detection models
- Request:
  - Headers:
    - Authorization: Bearer {token}
- Response:
  ```json
  {
    "models": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "version": "string"
      }
    ]
  }
  ```

### 5.2 Set Active Model
- Endpoint: `/api/models/active`
- Method: PUT
- Description: Set the active model for detections
- Request:
  - Headers:
    - Authorization: Bearer {token}
  - Body:
    ```json
    {
      "model_id": "string"
    }
    ```
- Response:
  ```json
  {
    "message": "Active model updated successfully"
  }
  ```

## 6. Real-time Detection (WebSocket)

### 6.1 Establish WebSocket Connection
- Endpoint: `/ws/detection`
- Description: Establish a WebSocket connection for real-time detection
- Authentication: Include JWT token in the connection request

### 6.2 Real-time Detection Messages
- Message format for sending frames:
  ```json
  {
    "type": "frame",
    "data": "base64_encoded_image"
  }
  ```
- Message format for receiving detection results:
  ```json
  {
    "type": "detection",
    "data": {
      "detected_objects": [
        {
          "class": "string",
          "confidence": "float",
          "bbox": [x, y, width, height]
        }
      ]
    }
  }
  ```

## 7. Error Handling

All endpoints should return appropriate HTTP status codes and error messages:

- 200 OK: Successful request
- 201 Created: Successful creation of a resource
- 400 Bad Request: Invalid input
- 401 Unauthorized: Authentication failure
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server-side error

Error response format:
```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

## 8. Rate Limiting

Implement rate limiting on all API endpoints to prevent abuse:
- Rate limit: 100 requests per minute per user
- Include rate limit information in response headers:
  - X-RateLimit-Limit: Maximum number of requests per minute
  - X-RateLimit-Remaining: Number of requests remaining in the current minute
  - X-RateLimit-Reset: Time at which the rate limit resets (Unix timestamp)

## 9. Versioning

Include API version in the URL path:
- Example: `/api/v1/detection/upload`

This allows for future updates and backwards compatibility.

## 10. Integration with enginelabs.ai

To ensure seamless integration with enginelabs.ai, consider the following:

1. Use enginelabs.ai API for model training and management.
2. Implement webhooks to receive notifications about model training status and updates.
3. Use enginelabs.ai's authentication system if available, or implement a compatible authentication mechanism.
4. Ensure that the data format for detection results is compatible with enginelabs.ai's expected format.
5. Implement proper error handling and logging to facilitate debugging and support when using enginelabs.ai services.

Additional endpoints may be required based on enginelabs.ai's specific features and capabilities. Consult the enginelabs.ai documentation for more detailed integration requirements.