import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/role.guard";
import { Roles } from "../common/role.decorator";
import { CreateShipmentRequest, ShipmentResponse, UpdateShipmentRequest } from "../model/shipment.model";
import { WebResponse } from "../model/web.model";
import { ShipmentService } from "./shipment.service";



@Controller('/api/shipment')
export class ShipmentController{
    constructor(private shipmentService: ShipmentService){}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async create(@Body() request: CreateShipmentRequest): Promise<WebResponse<ShipmentResponse>>{
        const result = await this.shipmentService.create(request)
        return {
            data: result
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async get(@Param('id') id: string):Promise<WebResponse<ShipmentResponse>>{
        const result = await this.shipmentService.get(id)

        return{
            data: result
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getAll():Promise<WebResponse<ShipmentResponse[]>>{
        const result = await this.shipmentService.getAll()
        return{
            data: result
        }
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async update(@Param('id') id:string, @Body() request: UpdateShipmentRequest): Promise<WebResponse<ShipmentResponse>>{
        const result = await this.shipmentService.update(id, request)
        return {
            data: result
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('Admin')
    @HttpCode(200)
    async remove(@Param('id') id: string):Promise<WebResponse<ShipmentResponse[]>>{
        const result = await this.shipmentService.remove(id)

        return{
            data: result
        }
    }
}