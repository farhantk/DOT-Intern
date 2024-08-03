
import { Module } from "@nestjs/common";
import { ShipmentController } from "./shipment.controller";
import { ShipmentService } from "./shipment.service";

@Module({
    providers: [ShipmentService],
    controllers: [ShipmentController]
})
export class ShipmentModule{}