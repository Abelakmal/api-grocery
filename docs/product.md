# Product API spec

## Create product

Enpoint : POST /api/product

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Request Body :

```json
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

## Get Product

Enpoint : GET /api/product

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Response Body (Success) :

```json
{
  "data": [
    {
      "id": 1,
      "name": "Masako",
      "description": "Masako Adalah Barang Berkulitas dari alam",
      "weight": 4,
      "unitWeight": "KG",
      "image": "link",
      "price": 200000,
      "stock": 100
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

## Get Product Detail

Enpoint : GET /api/product/:id

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Response Body (Success) :

```json
{
  "id": 1,
  "name": "Masako",
  "description": "Masako Adalah Barang Berkulitas dari alam",
  "weight": 4,
  "unitWeight": "KG",
  "image": "link",
  "price": 200000,
  "stock": 100,
  "category": {
    "id": 1,
    "name": "Bumbu Masak",
    "image": "link:img"
  }
}
```

## Update Product

Enpoint : PUT /api/product/:id

Request Header :

- `Authorization: Bearer <token>` (Mandatory)

Request Body :

```json
{
  "name": "Masako Versi 2",
  "description": "Masako Adalah Barang Berkulitas dari alam",
  "weight": 4,
  "unitWeight": "KG",
  "image": "link",
  "price": 200000,
  "categoryId": 1,
  "stock": 100
}
```

Response Body (Success) :

```json
{
  "name": "Masako Versi 2",
  "description": "Masako Adalah Barang Berkulitas dari alam",
  "weight": 4,
  "unitWeight": "KG",
  "image": "link",
  "price": 200000,
  "categoryId": 1,
  "stock": 100
}
```

Response Body (Failed) :

```json
{
  "error": "Id is not found"
}
```

## Delete Product

Enpoint : DELETE /api/product/:id

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
