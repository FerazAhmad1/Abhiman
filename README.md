## User Signup API

### Endpoint
`POST /api/v1/user/signup`

### Description
This endpoint allows a new user to register by providing necessary user information.

### Request Body
The request body should be a JSON object containing the following fields:

| Field     | Type   | Description                                |
|-----------|--------|--------------------------------------------|
| name      | String | User's full name.                          |
| userId    | String | Unique identifier for the user (e.g., email). |
| password  | String | Password for the user's account.           |
| phone     | String | User's contact number (must be exactly 10 digits). |
| deviceId  | String | Unique identifier for the user's device.   |

#### Example
```json
{
    "name": "Feraz Ahmad",
    "userId": "ferazahmad62@gmail.com",
    "password": "123456789",
    "phone": "6207571009",
    "deviceId": "gfhdcfdfdchchgchgchgg"
}

### Response

{
  "token":"jwt token"
}


***

## User Login API

### Endpoint
`POST /api/v1/user/login`

### Description
This endpoint allows an existing user to log in by providing their user credentials.

### Request Body
The request body should be a JSON object containing the following fields:

| Field     | Type   | Description                                |
|-----------|--------|--------------------------------------------|
| userId    | String | Unique identifier for the user (e.g., email). |
| password  | String | Password for the user's account.           |
| deviceId  | String | Unique identifier for the user's device.   |

#### Example
```json
{
    "userId": "ferazahmad62@gmail.com",
    "password": "123456789",
    "deviceId": "gfhdcfdfdchchgchgchgg"
}
















