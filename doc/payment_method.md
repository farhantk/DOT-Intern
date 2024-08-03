# Paymen Method API Spec

## Create Payment
Endpoint: POST /api/payment

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "bank_id" : bank_id,
        "name" : "Bank Transfer",
        "acc_name" : "PT qwerty",
        "acc_number" : "4234325523523"
    }
```

Response Body (Success):
```
    json{
        "data" : {
            "id" : id
            "bank_id" : bank_id,
            "name" : "Bank Transfer",
            "acc_name" : "PT qwerty",
            "acc_number" : "4234325523523"
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Update Payment
Endpoint: PATCH /api/payment:id

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "bank_id" : bank_id,
        "name" : "Bank Transfer",
        "acc_name" : "PT qwerty",
        "acc_number" : "4234325523523"
    }
```

Response Body (Success):
```
    json{
        "data" : {
            "bank_id" : bank_id,
            "name" : "Bank Transfer",
            "acc_name" : "PT qwerty",
            "acc_number" : "4234325523523"
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Get Payment
Endpoint: GET /api/payment:id

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : {
            "bank_id" : bank_id,
            "name" : "Bank Transfer",
            "acc_name" : "PT qwerty",
            "acc_number" : "4234325523523"
        }
    }
```

Response Body (Failed):
```
    json{
        "errors" : "internal server error"
    }
```

## Delete Payment
Endpoint: DELETE /api/payment/:id

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : true,
        "message" : "Payment method successfuly deleted"
    }
```