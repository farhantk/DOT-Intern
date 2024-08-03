import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { BankResponse, CreateBankRequest, UpdateBankRequest } from "../model/bank.model";
import { WebResponse } from "../model/web.model";
import { BankService } from "./bank.service";
import { Roles } from "../common/role.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/role.guard";

@Controller('/api/bank/')
export class BankController{
    constructor(private bankService: BankService){}

    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async get(@Param('id') id: string):Promise<WebResponse<BankResponse>>{
        const result = await this.bankService.get(id)

        return{
            data: result
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getAll():Promise<WebResponse<BankResponse[]>>{
        const result = await this.bankService.getAll()

        return{
            data: result
        }
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async create(@Body() request: CreateBankRequest): Promise<WebResponse<BankResponse>>{
        const result = await this.bankService.create(request)
        return {
            data: result
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async update(@Param('id') id:string, @Body() request: UpdateBankRequest): Promise<WebResponse<BankResponse>>{
        const result = await this.bankService.update(id, request)
        return {
            data: result
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async remove(@Param('id') id: string):Promise<WebResponse<BankResponse[]>>{
        const result = await this.bankService.remove(id)

        return{
            data: result
        }
    }
}