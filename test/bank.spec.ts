import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER)
  });

  describe("POST /api/bank", ()=>{
    it("Should be rejected if req is invalid",async () => {
      const response = await request(app.getHttpServer())
        .post('/api/bank')
        .send({
          name : '',
        })
      logger.info(response.body)
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined()
    })
    
    it("Should be success to create bank",async () => {
      const response = await request(app.getHttpServer())
        .post('/api/bank')
        .send({
          name : 'test'
        })
      logger.info(response.body)
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.name).toBe('test')
    })

    it("Should be success to get bank",async () => {
      const response = await request(app.getHttpServer())
        .get('/api/bank/16cf7155-4a28-4eb0-8204-c475bc31a92a')
      logger.info(response.body)
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.name).toBe('BCA')
    })
  })
});
