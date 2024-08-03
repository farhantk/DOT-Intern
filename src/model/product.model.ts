
export class ProductResponse{
    id: string;
    name: string;
    price: number;
    desc: string;
    image: string;
    condition: string;
}

export class CreateProductRequest{
    name: string;
    price: number;
    desc: string;
    image: string;
    condition: string;
}
export class UpdateProductRequest{
    name: string;
    price: number;
    desc: string;
    image?: string;
    condition: string;
}