# API Documentation

## Base URL
```
http://localhost:3001
```

## Endpoints

### 1. Get All Products

**Endpoint:** `GET /products`

**Description:** Returns a list of all products in the database.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Classic White T-Shirt",
    "price": 29.99,
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "category": "Apparel",
    "variants": ["S", "M", "L", "XL"],
    "stock": 50,
    "createdAt": "2026-02-12T10:00:00.000Z",
    "updatedAt": "2026-02-12T10:00:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### 2. Get Product by ID

**Endpoint:** `GET /products/:id`

**Description:** Returns a single product by its ID.

**Parameters:**
- `id` (path parameter) - Product ID (integer)

**Example Request:**
```
GET /products/1
```

**Response:**
```json
{
  "id": 1,
  "name": "Classic White T-Shirt",
  "price": 29.99,
  "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "category": "Apparel",
  "variants": ["S", "M", "L", "XL"],
  "stock": 50,
  "createdAt": "2026-02-12T10:00:00.000Z",
  "updatedAt": "2026-02-12T10:00:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Product not found
- `500 Internal Server Error` - Server error

---

### 3. Filter Products by Category

**Endpoint:** `GET /products?category={category}`

**Description:** Returns products filtered by category.

**Query Parameters:**
- `category` (string) - Category name (e.g., "Apparel", "Footwear", "Accessories")

**Example Request:**
```
GET /products?category=Apparel
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Classic White T-Shirt",
    "price": 29.99,
    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "category": "Apparel",
    "variants": ["S", "M", "L", "XL"],
    "stock": 50,
    "createdAt": "2026-02-12T10:00:00.000Z",
    "updatedAt": "2026-02-12T10:00:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### 4. Create New Product (Bonus)

**Endpoint:** `POST /products`

**Description:** Creates a new product with data validation.

**Request Body:**
```json
{
  "name": "New Product Name",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Apparel",
  "variants": ["S", "M", "L"],
  "stock": 50
}
```

**Validation Rules:**
- `name` (required): Non-empty string
- `price` (required): Positive number
- `image` (required): Valid HTTP/HTTPS URL
- `category` (required): String
- `variants` (optional): Array of strings
- `stock` (optional): Non-negative integer (default: 0)

**Response:**
```json
{
  "id": 9,
  "name": "New Product Name",
  "price": 99.99,
  "image": "https://example.com/image.jpg",
  "category": "Apparel",
  "variants": ["S", "M", "L"],
  "stock": 50,
  "createdAt": "2026-02-12T10:30:00.000Z",
  "updatedAt": "2026-02-12T10:30:00.000Z"
}
```

**Status Codes:**
- `201 Created` - Product created successfully
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Server error

**Error Response Example:**
```json
{
  "error": "Product name is required and must be a non-empty string"
}
```

---

## Testing with cURL

### Get all products
```bash
curl http://localhost:3001/products
```

### Get product by ID
```bash
curl http://localhost:3001/products/1
```

### Filter by category
```bash
curl http://localhost:3001/products?category=Apparel
```

### Create new product
```bash
curl -X POST http://localhost:3001/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Leather Wallet",
    "price": 79.99,
    "image": "https://images.unsplash.com/photo-1627123424574-724758594e93",
    "category": "Accessories",
    "variants": ["Brown", "Black"],
    "stock": 25
  }'
```

## Postman Collection

Import this JSON into Postman to test all endpoints:

```json
{
  "info": {
    "name": "E-Commerce API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Products",
      "request": {
        "method": "GET",
        "url": "http://localhost:3001/products"
      }
    },
    {
      "name": "Get Product by ID",
      "request": {
        "method": "GET",
        "url": "http://localhost:3001/products/1"
      }
    },
    {
      "name": "Filter by Category",
      "request": {
        "method": "GET",
        "url": "http://localhost:3001/products?category=Apparel"
      }
    },
    {
      "name": "Create Product",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Test Product\",\n  \"price\": 49.99,\n  \"image\": \"https://images.unsplash.com/photo-1523381210434-271e8be1f52b\",\n  \"category\": \"Accessories\",\n  \"variants\": [\"One Size\"],\n  \"stock\": 100\n}"
        },
        "url": "http://localhost:3001/products"
      }
    }
  ]
}
```
