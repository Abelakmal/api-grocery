# Address API Spec

## Create Address

Enpoint : POST /api/address

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Request Body :

```json
{
  "label": "Abel",
  "address": "Baloi Permai, Batam City, Riau Islands, Sumatra, 29463, Indonesia",
  "name": "abel",
  "number": "085243364415",
  "latitude": "12.004034",
  "longitude": "12.0095155",
  "main": true
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
  "error": "Unauthorized"
}
```

## Get Address

Enpoint : GET /api/address

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Response Body (Success) :

```json
{
  "data": [
    {
      "label": "Abel",
      "details": "Baloi Permai, Batam City, Riau Islands, Sumatra, 29463, Indonesia",
      "recipient_name": "abel",
      "recipient number": "085243364415",
      "latitude": "12.004034",
      "longitude": "12.0095155",
      "main": true,
      "userId": 1
    },
  ]
}
```

Response Body (Failed) :

```json
{
  "error": "Unauthorized"
}
```

## Update Address
Enpoint : PUT /api/address

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Request Body :

```json
{
  "label": "Abel",
  "details": "Baloi Permai, Batam City, Riau Islands, Sumatra, 29463, Indonesia",
  "recipient_name": "abel",
  "recipient number": "085243364415",
  "latitude": "12.004034",
  "longitude": "12.0095155",
  "main": true
}
```

Response Body (Success) :

```json
{
  "data": {
  "label": "rumah",
  "details": "Baloi Permai, Batam City, Riau Islands, Sumatra, 29463, Indonesia",
  "recipient_name": "abel",
  "recipient number": "085243364415",
  "latitude": "12.004034",
  "longitude": "12.0095155",
  "main": true
}
}
```

Response Body (Failed) :

```json
{
  "error": "Unauthorized"
}
```


## Update Main Address

Enpoint : POST /api/address/:id/main

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

## Delete Address

Enpoint : DELETE /api/address/:id

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
