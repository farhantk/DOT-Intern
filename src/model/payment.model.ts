export class PaymentResponse{
    id: string;
    bank_id: string;
    name: string;
    acc_name: string;
    acc_number: string;
}

export class CreatePaymentRequest{
    bank_id: string;
    name: string;
    acc_name: string;
    acc_number: string;
}
export class UpdatePaymentRequest{
    bank_id: string;
    name: string;
    acc_name: string;
    acc_number: string;
}