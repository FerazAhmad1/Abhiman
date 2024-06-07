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
