import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Bank } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { BankResponse, CreateBankRequest, UpdateBankRequest } from "../model/bank.model";
import { BankValidation } from "./bank.validation";

@Injectable()
export class BankService{
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
    
    async get(id: string):Promise<BankResponse>{
        const bank = await this.BankIsAvailable(id)
        return bank
    }

    async getAll(): Promise<BankResponse[]> {
        const bank = await this.prismaService.bank.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        if (!bank) {
            throw new HttpException('Bank not found', 404);
        }
        return bank;
    }

    async create(request: CreateBankRequest): Promise<BankResponse>{
        this.logger.debug(`BankSevice.create(${JSON.stringify(request)})`)
        const createRequest: CreateBankRequest = this.validationService.validate(
            BankValidation.CREATE, request
        );

        const bank = await this.prismaService.bank.create({
            data: createRequest
        });

        return bank
    }

    async update(id: string, request: UpdateBankRequest): Promise<BankResponse>{
        const updateRequest = this.validationService.validate(BankValidation.UPDATE, request)
        console.log(updateRequest)
        let bank = await this.BankIsAvailable(id)
        
        bank = await this.prismaService.bank.update({
            where:{id:id},
            data:updateRequest
        })
        return {
            id: bank.id,
            name: bank.name
        }
    }

    async remove(id: string):Promise<BankResponse[]>{
        await this.BankIsAvailable(id)
        const bank = await this.prismaService.bank.delete({
            where:{id:id}
        })
        return this.getAll()
    }
}