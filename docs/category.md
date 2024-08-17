# Category API spec

## Create category

Enpoint : POST /api/category

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Request Body :

```json
{
  "id": 1,
  "name": "Meat",
  "image": "link" //optional
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

## Get Category

Enpoint : GET /api/category

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "name": "Meat",
      "image": "link"
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "error": "Unauthorized"
}
```

## Get Category Detail

Enpoint : GET /api/category/:id

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Response Body (Success) :

```json
{
  "id": 1,
  "name": "Pantry",
  "image": "link",
  "products": [
    {
      "id": 1,
      "name": "Masako",
      "description": "Masako Adalah Barang Berkulitas dari alam",
      "weight": 4,
      "unitWeight": "KG",
      "image": "link",
      "price": 200000,
      "categoryId": 1,
      "stock": 100
    }
  ]
}
```

Response Body (Failed) :

```json
{
  "error": "Server error"
}
```

## Update Category

Enpoint : PUT /api/category/:id

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Request Body :

```json
{
  "id": 1,
  "name": "Meat",
  "image": "link" //optional
}
```

Response Body (Success) :

```json
{
  "id": 1,
  "name": "Meat",
  "image": "link" //optional
}
```

Response Body (Failed) :

```json
{
  "error": "Id is not found"
}
```

## Delete Category

Enpoint : DELETE /api/category/:id

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
  "error": "Id is not found"
}
```
