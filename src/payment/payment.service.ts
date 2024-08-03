import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { Logger } from "winston";
import { CreatePaymentRequest, PaymentResponse, UpdatePaymentRequest } from "../model/payment.model";
import { PaymentValidation } from "./payment.validation";
import { Bank, Payment_method } from "@prisma/client";



@Injectable()
export class PaymentService{
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ){}
    async BankIsAvailable(id:string): Promise<Bank>{
        const bank = await this.prismaService.bank.findFirst({
            where:{id:id}
        })
        if(!bank){
            throw new HttpException('Bank not found', 404);
        }
        return bank
    }
    async PaymentIsAvailable(id:string): Promise<Payment_method>{
        const payment = await this.prismaService.payment_method.findFirst({
            where:{id:id},
            include: {
                bank: true,
            },
        })
        if(!payment){
            throw new HttpException('Payment not found', 404);
        }
        return payment
    }
    
    async get(id: string):Promise<PaymentResponse>{
        const payment = await this.PaymentIsAvailable(id)
        return payment
    }

    async getAll(): Promise<PaymentResponse[]> {
        const payment = await this.prismaService.payment_method.findMany({
            include: {
                bank: true, // Include the related bank data
              },
        });
        if (!payment) {
            throw new HttpException('Payment not found', 404);
        }
        return payment;
    }

    async create(request: CreatePaymentRequest): Promise<PaymentResponse>{
        await this.BankIsAvailable(request.bank_id)
        this.logger.debug(`PaymentSevice.create(${JSON.stringify(request)})`)
        const createRequest: CreatePaymentRequest = this.validationService.validate(
            PaymentValidation.CREATE, request
        );

        const payment = await this.prismaService.payment_method.create({
            data: createRequest,
            include: {
                bank: true,
            },
        });

        return payment
    }

    async update(id: string, request: UpdatePaymentRequest): Promise<PaymentResponse>{
        await this.BankIsAvailable(request.bank_id)
        const updateRequest = this.validationService.validate(PaymentValidation.UPDATE, request)
        console.log(updateRequest)
        let payment = await this.PaymentIsAvailable(id)
        
        payment = await this.prismaService.payment_method.update({
            where:{id:id},
            data:updateRequest
        })
        return payment
    }

    async remove(id: string):Promise<PaymentResponse[]>{
        await this.PaymentIsAvailable(id)
        const bank = await this.prismaService.payment_method.delete({
            where:{id:id}
        })
        return this.getAll()
    }
}