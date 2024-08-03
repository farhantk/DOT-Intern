export class TransactionResponse{
    id: string
    buyer_id: string
    payment_method_id: string
    product_id: string
    shipment_id: string
    status: string
    amount: number
    total: number
}

export class CreateTransactionRequest{
    buyer_id: string
    payment_method_id: string
    product_id: string
    shipment_id: string
    status: string
    amount: number
    total: number
}
export class UpdateTransactionRequest{
    status: string
}