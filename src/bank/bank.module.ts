import { Module } from "@nestjs/common";
import { BankController } from "./bank.controller";
import { BankService } from "./bank.service";


@Module({
    providers: [BankService],
    controllers: [BankController]
})

export class BankModule{}