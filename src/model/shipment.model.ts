
export class ShipmentResponse{
    id: string;
    name: string;
    price: number;
}

export class CreateShipmentRequest{
    name: string;
    price: number;
}
export class UpdateShipmentRequest{
    id: string;
    name: string;
    price: number;
}