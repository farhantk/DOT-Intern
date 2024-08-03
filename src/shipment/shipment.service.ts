import { HttpException, Inject, Injectable, Logger } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { CreateShipmentRequest, ShipmentResponse, UpdateShipmentRequest } from "../model/shipment.model";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { ShipmentValidation } from "./shipment.validation";
import { Shipment } from "@prisma/client";


@Injectable()
export class ShipmentService{
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
        private validationService: ValidationService
    ){}
    
    async ShipmentIsAvailable(id:string): Promise<Shipment>{
        const shipment = await this.prismaService.shipment.findFirst({
            where:{id:id}
        })
        if(!shipment){
            throw new HttpException('Shipment not found', 404);
        }
        return shipment
    }
    
    async create(request: CreateShipmentRequest): Promise<ShipmentResponse>{
        this.logger.debug(`ShipmentSevice.create(${JSON.stringify(request)})`)
        const createRequest: CreateShipmentRequest = this.validationService.validate(
            ShipmentValidation.CREATE, request
        );

        const shipment = await this.prismaService.shipment.create({
            data: createRequest
        });

        return shipment
    }

    async get(id: string):Promise<ShipmentResponse>{
        const shipment = await this.ShipmentIsAvailable(id)
        return shipment
    }

    async getAll(): Promise<ShipmentResponse[]> {
        const shipment = await this.prismaService.shipment.findMany({
            select: {
                id: true,
                name: true,
                price: true,
            },
        });
        if (!shipment) {
            throw new HttpException('Shipment not found', 404);
        }
        return shipment;
    }

    async update(id: string, request: UpdateShipmentRequest): Promise<ShipmentResponse>{
        const updateRequest = this.validationService.validate(ShipmentValidation.UPDATE, request)
        console.log(updateRequest)
        let shipment = await this.ShipmentIsAvailable(id)
        
        shipment = await this.prismaService.shipment.update({
            where:{id:id},
            data:updateRequest
        })
        return {
            id: shipment.id,
            name: shipment.name,
            price: shipment.price
        }
    }

    async remove(id: string):Promise<ShipmentResponse[]>{
        await this.ShipmentIsAvailable(id)
        const shipment = await this.prismaService.shipment.delete({
            where:{id:id}
        })
        return this.getAll()
    }
}