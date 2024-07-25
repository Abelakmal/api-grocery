# User API Spec

## Register

Enpoint : POST /api/users

Request Body :

```json
{
  "name": "Abel",
  "dob": "yyyy-mm-dd", // optional
  "email": "abel@mail.com",
  "phone": 085243364415,
  "address": "batam", // optional
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": "ok"
}
```

Response Body (Failed) :

```json
{
  "error": "User is already"
}
```

## Login User

Enpoint : POST api/auth/login-users

Request body :

```json
{
  "email": "abel@mail.com",
  "password": "rahasia"
}
```

Response Body (Success) :

```json
{
  "data": {
    "token": "eadiajdadjd292odj29d9d1hd91f2f2"
  }
}
```

Response Body (Failed) :

```json
{
  "error": "email / phone and pasword is wrong"
}
```

## Get User

Enpoint : GET /api/users/current


Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Response Body (Success) :

```json
{
  "data": {
    "name": "Abel",
    "dob": "yyyy-mm-dd",
    "email": "abel@mail.com",
    "phone": 085243364415,
    "address": "batam",
    "image": "url:img",
  }
}
```

Response Body (Failed) :

```json
{
  "error": "Unauthorized"
}
```

## Update User

Enpoint : PATCH /api/users

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Request Body :

```json
{
  "name": "Abel", // optional
  "dob": "yyyy-mm-dd", // optional
  "email": "abel@mail.com", //optional
  "phone": 085243364415, // optional
  "address": "batam", // optional
  "password": "rahasia", //optional
  "image": "url:img", //optional
}
```

Response Body (Success) :

```json
{
  "data": {
    "name": "Abel",
    "dob": "yyyy-mm-dd",
    "email": "abel@mail.com",
    "phone": 085243364415,
    "address": "batam",
    "image": "url:newimg",
  }
}
```

Response Body (Failed) :

```json
{
  "error": "Unauthorized"
}
```

## Logout User

Enpoint : DELETE /api/auth/logout


Request Header :

- `Authorization: Bearer <token>` (Mandatory)


Response Body (Success) :

```json
{
  "data": "ok"
}
```


Response Body (Failed) :

```json
{
  "error": "Unauthorized"
}
```
