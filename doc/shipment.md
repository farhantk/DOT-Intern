# Shipment API Spec

## Create Bank
Endpoint: POST /api/shipment

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "name" : "JNE",
        "price" : 10000
    }
```

Response Body (Success):
```
    json{
        "data" : {
            "id" : id,
            "name" : "JNE",
            "price" : 10000
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Update Shipment
Endpoint: PUT /api/shipment/:id

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "name" : "JNE",
        "price" : 10000
    }
```

Response Body (Success):
```
    json{
        "data" : {
            "id" : id,
            "name" : "JNE",
            "price" : 10000
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Get Shipment
Endpoint: GET /api/shipment/:id

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : {
            "id" : id,
            "name" : "JNE",
            "price" : 10000
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Delete Shipment
Endpoint: DELETE /api/shipment/:id

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : true,
        "message" : "Shipment successfuly deleted"
    }
```