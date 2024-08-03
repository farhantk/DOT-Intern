import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/role.guard";
import { Roles } from "../common/role.decorator";
import { CreatePaymentRequest, PaymentResponse, UpdatePaymentRequest } from "../model/payment.model";
import { WebResponse } from "../model/web.model";
import { PaymentService } from "./payment.service";


@Controller('/api/payment/')
export class PaymentController{
    constructor(private paymentService: PaymentService){}


    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async get(@Param('id') id: string):Promise<WebResponse<PaymentResponse>>{
        const result = await this.paymentService.get(id)

        return{
            data: result
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getAll():Promise<WebResponse<PaymentResponse[]>>{
        const result = await this.paymentService.getAll()
        return{
            data: result
        }
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async create(@Body() request: CreatePaymentRequest): Promise<WebResponse<PaymentResponse>>{
        const result = await this.paymentService.create(request)
        return {
            data: result
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async update(@Param('id') id:string, @Body() request: UpdatePaymentRequest): Promise<WebResponse<PaymentResponse>>{
        const result = await this.paymentService.update(id, request)
        return {
            data: result
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async remove(@Param('id') id: string):Promise<WebResponse<PaymentResponse[]>>{
        const result = await this.paymentService.remove(id)
        return{
            data: result
        }
    }
}