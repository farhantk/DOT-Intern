import { Body, Controller, HttpCode, Param, Post, UseGuards, Request, Get, Put } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/role.guard";
import { PrismaService } from "../common/prisma.service";
import { Roles } from "../common/role.decorator";
import { CreateTransactionRequest, TransactionResponse } from "../model/transaction.model";
import { WebResponse } from "../model/web.model";
import { TransactionService } from "./transaction.service";


@Controller('/api/transaction')
export class TransactionController{
    constructor(
        private transactionService: TransactionService,
        private prismaService: PrismaService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    @HttpCode(200)
    async create(
        @Param('id') product_id: string,
        @Body() request: any,
        @Request() req: any
    ):Promise<WebResponse<TransactionResponse>>{
        const product = await this.prismaService.product.findFirst({
            where:{id:product_id}
        })
        const shipment = await this.prismaService.shipment.findFirst({
            where:{id:request.shipment_id}
        })
        const createTransactionRequest: CreateTransactionRequest = {
            buyer_id: req.user.id, // saya mau ambil dari authorization
            payment_method_id: request.payment_method_id,
            product_id: product_id,
            shipment_id: request.shipment_id,
            status: "Menunggu Konfirmasi",
            amount: product.price,
            total: product.price + shipment.price
        }
        
        const result = await this.transactionService.create(createTransactionRequest)
        return {
            data: result
        }
    }
    
    @Get('all')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async getAll():Promise<WebResponse<TransactionResponse[]>>{
        const result = await this.transactionService.getAll()
        return{
            data: result
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async get(@Param('id') id: string):Promise<WebResponse<TransactionResponse>>{
        console.log("dasda")
        const result = await this.transactionService.get(id)
        return{
            data: result
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(200)
    async getByAuth(@Request() req: any):Promise<WebResponse<TransactionResponse[]>>{
        const result = await this.transactionService.getByAuth(req.user.id)
        return{
            data: result
        }
    }

    @Put(':id/process')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async process(@Param('id') id: string):Promise<WebResponse<TransactionResponse>>{
        const result = await this.transactionService.process(id)
        return{
            data: result
        }
    }

    @Put(':id/send')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async sending(@Param('id') id: string):Promise<WebResponse<TransactionResponse>>{
        const result = await this.transactionService.sending(id)
        return{
            data: result
        }
    }

    @Put(':id/finish')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async finish(@Param('id') id: string):Promise<WebResponse<TransactionResponse>>{
        const result = await this.transactionService.finish(id)
        return{
            data: result
        }
    }



}