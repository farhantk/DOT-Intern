# Bank API Spec

## Create Bank
Endpoint: POST /api/bank

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "name" : "BCA"
    }
```

Response Body (Success):
```
    json{
        "data" : {
            "id" : id,
            "name" : "BCA"
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Update Bank
Endpoint: PUT /api/bank/:id

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "name" : "BCA"
    }
```

Response Body (Success):
```
    json{
        "data" : {
            "id" : id,
            "name" : "BCA"
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Get Bank
Endpoint: GET /api/bank/:id

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : {
            "name" : "BCA"
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```


## Get all Bank
Endpoint: GET /api/bank/:id

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : 
        {
            "name" : "BCA"
        },
        {
            "name" : "Mandiri"
        },
        {
            "name" : "BNI"
        },
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Delete Bank
Endpoint: DELETE /api/bank/:id

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : true,
        "message" : "Bank successfuly deleted"
    }
```