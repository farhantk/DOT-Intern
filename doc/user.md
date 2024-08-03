# User Api Spec

## SignUp User

Endpoint: POST /api/users

Request Body:
```
    json{
        "name" : "fullname",
        "email" : "email@gmail.com",
        "street" : "Jl. qwerty",
        "city" : "Bandung",
        "province" : "Jawa Barat",
        "country" : "Indonesia",
        "Postal_code" : "42352",
        "password" : "12345678"
    }
```
Response Body (Success):
```
    json{
        "data" : {
            "name" : "fullname",
            "email" : "email@gmail.com"
        }
    }
```
Response Body (Failed):
```
    json{
        "errors" : "email already registered"
    }
```
## SignIn User
Endpoint: POST /api/users/signin

Request Body:
```
    json{
        "email" : "email@gmail.com",
        "password" : "12345678"
    }
```
Response Body (Success):
```
    json{
        "data" : {
            "name" : "fullname",
            "email" : "email@gmail.com",
            "token" : "token"
        }
    }
```
Response Body (Failed):
```
    json{
        "errors" : "email not registered"
    }
```
## Get User
Endpoint: GET /api/users

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : {
            "name" : "fullname",
            "email" : "email@gmail.com"
        }
    }
```
Response Body (Failed):
```
    json{
        "errors" : "Unautorized"
    }
```
## Update User
Endpoint: PATCH /api/users

Headers :
- Authorization: "token"

Request Body:
```
    json{
        "name" : "fullname",
        "email" : "email@gmail.com", //cant change email
        "street" : "Jl. qwerty",
        "city" : "Bandung",
        "province" : "Jawa Barat",
        "country" : "Indonesia",
        "Postal_code" : "42352",
        "password" : "12345678" //cant change password
    }
```
Response Body (Success):
```
    json{
        "data" : {
            "name" : "fullname",
            "email" : "email@gmail.com"
        }
    }
```
Response Body (Failed):
```
    json{
        "errors" : "Internal server error"
    }
```

## SignOut User
Endpoint: PATCH /api/users

Headers :
- Authorization: "token"

Response Body (Success):
```
    json{
        "data" : true
    }
```
