# User API Spec

## Register

Enpoint : POST /api/users

Request Body :

```json
{
  "firstName": "Abel",
  "lastName": "Akmal", // optional
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

## Login

Enpoint : POST api/auth

Request body :

```json
{
  "email": "abel@mail.com", // "phone" : 085243364415
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

- X-API-TOKEN : Token (Mandatory)

Response Body (Success) :

```json
{
  "data": {
    "firstName": "Abel",
    "lastName": "Akmal",
    "dob": "yyyy-mm-dd",
    "email": "abel@mail.com",
    "phone": 085243364415,
    "address": "batam"
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

- X-API-TOKEN : Token (Mandatory)

Request Body :

```json
{
  "firstName": "Abel", // optional
  "lastName": "Akmal", // optional
  "dob": "yyyy-mm-dd", // optional
  "email": "abel@mail.com", //optional
  "phone": 085243364415, // optional
  "address": "batam", // optional
  "password": "rahasia" //optional
}
```

Response Body (Success) :

```json
{
  "data": {
    "firstName": "Abel",
    "lastName": "Akmal",
    "dob": "yyyy-mm-dd",
    "email": "abel@mail.com",
    "phone": 085243364415,
    "address": "batam"
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

- X-API-TOKEN : Token (Mandatory)


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
