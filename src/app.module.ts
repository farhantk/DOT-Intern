import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { BankModule } from './bank/bank.module';
import { ShipmentModule } from './shipment/shipment.module';
import { ProductModule } from './product/product.module';
import { MulterModule } from '@nestjs/platform-express';
import { PaymentModule } from './payment/payment.module';
import { TransactionModule } from './transaction/transaction.module';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from './common/logger.service';

@Module({
  imports: [
    CommonModule, 
    MulterModule.register({dest: './uploads'}),
    WinstonModule.forRoot(loggerConfig),
    AuthModule, 
    BankModule,
    ShipmentModule,
    ProductModule,
    PaymentModule,
    TransactionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
