

export class SignUpUserRequest{
    name : string;
    email : string;
    street : string;
    city : string;
    province : string;
    country : string;
    postal_code : string;
    password : string;
}

export class UpdateUserRequest{
    name : string;
    street : string;
    city : string;
    province : string;
    country : string;
    postal_code : string;
}
export class UserResponse{
    name : string;
    email : string;
    street : string;
    city : string;
    province : string;
    country : string;
    postal_code : string;
}

export class SignInUserRequest{
    email : string;
    password : string;
}