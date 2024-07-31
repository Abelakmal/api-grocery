# Address API Spec

## Create Address

Enpoint : POST /api/address

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Request Body :

```json
{
  "address_label": "Abel",
  "detailed_address": "Baloi Permai, Batam City, Riau Islands, Sumatra, 29463, Indonesia",
  "recipient_name": "abel",
  "recipient_number": "085243364415",
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
      "address_label": "Abel",
      "detailed address": "Baloi Permai, Batam City, Riau Islands, Sumatra, 29463, Indonesia",
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
  "address_label": "Abel",
  "detailed address": "Baloi Permai, Batam City, Riau Islands, Sumatra, 29463, Indonesia",
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
  "address_label": "rumah",
  "detailed address": "Baloi Permai, Batam City, Riau Islands, Sumatra, 29463, Indonesia",
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