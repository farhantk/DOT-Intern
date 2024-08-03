import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';


describe('UserController', () => {
  let token: string;
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

  describe("POST /api/users", ()=>{
    it("Should be success to signup",async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          name : 'test',
          email : 'test@gmail.com',
          street : 'test',
          city : 'test',
          province : 'test',
          country : 'test',
          postal_code : 'test',
          password : 'test',
        })
      logger.info(response.body)
      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('test')
    })
  })

  describe("POST /api/users/signin", ()=>{
    it("Should be rejected, req is invalid",async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/signin')
        .send({
          email : '',
          password : '',
        })
      logger.info(response.body)
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined()
    })

    it("Should be rejected, wrong email or password",async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/signin')
        .send({
          email : 'fdsfs@gmail.com',
          password : 'dsfsdgs',
        })
      logger.info(response.body)
      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined()
    })
    
    it("Should be success to signin",async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users/signin')
        .send({
          email : 'test@gmail.com',
          password : 'test',
        })
      logger.info(response.body)
      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe('test')
      expect(response.body.token).toBeDefined()
      token = response.body.token; 
    })
  })

  describe("Get /api/users/profile", () => {
    it("Should be rejected, token is invalid or null", async () => {
        const response = await request(app.getHttpServer())
            .get('/api/users/profile')
            .set('Authorization', 'wrong');

        logger.info(response.body);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it("Should be success, token is valid", async () => {
        const response = await request(app.getHttpServer())
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        logger.info(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    });
  });

  describe("Get /api/users/signout", () => {
    it("Should be success to signout", async () => {
        const response = await request(app.getHttpServer())
            .post('/api/users/signout')
            .set('Authorization', `Bearer ${token}`);

        logger.info(response.body);

        expect(response.status).toBe(200);
        expect(response.body.message).toBeDefined();
    });
  });

  describe("Get /api/users/profile", () => {
    it("Should be rejected if token is invalid or null after signout", async () => {
        const response = await request(app.getHttpServer())
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);

        logger.info(response.body);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
  });
});
