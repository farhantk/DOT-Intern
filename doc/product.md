# Product API Spec

## Create Product
Endpoint: POST /api/product

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "name" : "Samsung S22 Ultra",
        "price" : 10000,
        "desc" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "image" : "uploads/image/dhaskjhdakda.jpg",
        "condition" : "Baru"
    }
```

Response Body (Success):
```
    json{
        "data" : {
            "id" : id,
            "name" : "Samsung S22 Ultra",
            "price" : 10000,
            "desc" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "image" : "uploads/image/dhaskjhdakda.jpg",
            "condition" : "Baru"
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Update product
Endpoint: Patch /api/product/:id

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "name" : "Samsung S22 Ultra",
        "price" : 10000,
        "desc" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "image" : "uploads/image/dhaskjhdakda.jpg",
        "condition" : "Baru"
    }
```

Response Body (Success):
```
    json{
        "data" : {
            "id" : id,
            "name" : "Samsung S22 Ultra",
            "price" : 10000,
            "desc" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "image" : "uploads/image/dhaskjhdakda.jpg",
            "condition" : "Baru"
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Get Product
Endpoint: GET /api/product/:id

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : {
            "id" : id,
            "name" : "Samsung S22 Ultra",
            "price" : 10000,
            "desc" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "image" : "uploads/image/dhaskjhdakda.jpg",
            "condition" : "Baru"
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Get all Product
Endpoint: GET /api/product

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : 
        {
            "id" : id,
            "name" : "Samsung S22 Ultra",
            "price" : 10000,
            "desc" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "image" : "uploads/image/dhaskjhdakda.jpg",
            "condition" : "Baru"
        },
        {
            "id" : id,
            "name" : "Samsung S22 Ultra",
            "price" : 10000,
            "desc" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "image" : "uploads/image/dhaskjhdakda.jpg",
            "condition" : "Baru"
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Delete Product
Endpoint: DELETE /api/product/:id

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : true,
        "message" : "Product successfuly deleted"
    }
```