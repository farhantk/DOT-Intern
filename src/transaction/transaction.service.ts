import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { Logger } from "winston";
import { CreateTransactionRequest, TransactionResponse } from "../model/transaction.model";
import { TransactionValidation } from "./transaction.validation";
import { Transaction } from "@prisma/client";


@Injectable()
export class TransactionService{
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ){}
    
    async TransactionIsAvailable(id:string): Promise<Transaction>{
        const transaction = await this.prismaService.transaction.findFirst({
            where:{id:id},
            include: {
                user: true,
                payment: true,
                product:true,
                shipment: true
            },
        })
        if(!transaction){
            throw new HttpException('Transaction not found', 404);
        }
        return transaction
    }

    async create(request: CreateTransactionRequest): Promise<TransactionResponse>{
        this.logger.debug(`TransactionSevice.create(${JSON.stringify(request)})`)
        
        const createRequest: CreateTransactionRequest = this.validationService.validate(
            TransactionValidation.CREATE, request
        );
        console.log(">>>",createRequest)
        const payment = await this.prismaService.transaction.create({
            data: createRequest,
            include: {
                user: true,
                payment: true,
                product:true,
                shipment: true
            },
        });

        return payment
    }

    async get(id: string):Promise<TransactionResponse>{
        const transaction = await this.TransactionIsAvailable(id)
        return transaction
    }

    async getAll():Promise<TransactionResponse[]>{
        console.log("first")
        const transaction = await this.prismaService.transaction.findMany({
            include: {
                user: true,
                payment: true,
                product:true,
                shipment: true
            },
        })
        if(!transaction){
            throw new HttpException('Transaction not found', 404);
        }
        return transaction
    }
    
    async getByAuth(id: string):Promise<TransactionResponse[]>{
        const transaction = await this.prismaService.transaction.findMany({
            where:{buyer_id: id},
            include: {
                user: true,
                payment: true,
                product:true,
                shipment: true
            },
        })
        if(!transaction){
            throw new HttpException('Transaction not found', 404);
        }
        return transaction
    }

    async process(id: string): Promise<TransactionResponse>{
        let transaction = await this.TransactionIsAvailable(id)
        transaction.status = "Pesanan diproses"
        const updateRequest = this.validationService.validate(TransactionValidation.UPDATE, transaction)
        
        transaction = await this.prismaService.transaction.update({
            where:{id:id},
            data:updateRequest,
            include: {
                user: true,
                payment: true,
                product:true,
                shipment: true
            },
        })
        return transaction
    }

    async sending(id: string): Promise<TransactionResponse>{
        let transaction = await this.TransactionIsAvailable(id)
        transaction.status = "Pesanan dalam perjalanan"
        const updateRequest = this.validationService.validate(TransactionValidation.UPDATE, transaction)
        
        transaction = await this.prismaService.transaction.update({
            where:{id:id},
            data:updateRequest,
            include: {
                user: true,
                payment: true,
                product:true,
                shipment: true
            },
        })
        return transaction
    }
    async finish(id: string): Promise<TransactionResponse>{
        let transaction = await this.TransactionIsAvailable(id)
        transaction.status = "Pesanan telah sampai di tujuan"
        const updateRequest = this.validationService.validate(TransactionValidation.UPDATE, transaction)
        
        transaction = await this.prismaService.transaction.update({
            where:{id:id},
            data:updateRequest,
            include: {
                user: true,
                payment: true,
                product:true,
                shipment: true
            },
        })
        return transaction
    }

}