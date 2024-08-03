# Transaction API Spec

## Create Transaction
Endpoint: POST /api/transaction/:id

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "buyer_id" : buyer_id, // from auth 
        "payment_method_id" : payment_method_id,
        "product_id" : id, // from params
        "shipment_id" : shipment_id, // from params
        "status" : "Dalam perjalanan",
        "amount" : 100000,
        "total" : 110000,
    }
```

Response Body (Success):
```
    json{
        "data" : {
            "id" : id
            "buyer_id" : buyer_id, // from auth 
            "payment_method_id" : payment_method_id,
            "product_id" : id, // from params
            "shipment_id" : shipment_id, // from params
            "status" : "Dalam perjalanan",
            "amount" : 100000,
            "total" : 110000,
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Update transaction
Endpoint: PATCH /api/transaction/:id

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "buyer_id" : buyer_id, // cant change
        "payment_method_id" : payment_method_id, // cant change
        "product_id" : product_id, // cant change
        "shipment_id" : shipment_id, // cant change
        "status" : "Selesai",
        "amount" : 100000, // cant change
        "total" : 110000,// cant change
    }
```

Response Body (Success):
```
    json{
        "data" : {
            "id" : id
            "buyer_id" : buyer_id,
            "payment_method_id" : payment_method_id, 
            "product_id" : product_id,
            "shipment_id" : shipment_id, 
            "status" : "Selesai",
            "amount" : 100000, 
            "total" : 110000,
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Get transaction
Endpoint: GET /api/transaction/:id

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : {
            "id" : id
            "buyer_id" : buyer_id,
            "payment_method_id" : payment_method_id, 
            "product_id" : product_id,
            "shipment_id" : shipment_id, 
            "status" : "Selesai",
            "amount" : 100000, 
            "total" : 110000,
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Get all transaction
Endpoint: GET /api/Transaction

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : 
        {
            "id" : id
            "buyer_id" : buyer_id,
            "payment_method_id" : payment_method_id, 
            "product_id" : product_id,
            "shipment_id" : shipment_id, 
            "status" : "Selesai",
            "amount" : 100000, 
            "total" : 110000,
        },
        {
            "id" : id
            "buyer_id" : buyer_id,
            "payment_method_id" : payment_method_id, 
            "product_id" : product_id,
            "shipment_id" : shipment_id, 
            "status" : "Selesai",
            "amount" : 100000, 
            "total" : 110000,
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```
