import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { loggerConfig } from './common/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig)
  });
  
  await app.listen(3000);
}
bootstrap();
