import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('HumiditySensorsController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/humidity-sensors (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/humidity-sensors')
      .send({ name: 'Test Humidity', humidity: 55, unit: '%', timestamp: new Date() })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('/humidity-sensors (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/humidity-sensors')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/humidity-sensors/:id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/humidity-sensors/${createdId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('/humidity-sensors/:id (PATCH)', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/humidity-sensors/${createdId}`)
      .send({ humidity: 60 })
      .expect(200);
    expect(res.body).toHaveProperty('humidity', 60);
  });

  it('/humidity-sensors/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/humidity-sensors/${createdId}`)
      .expect(200);
  });
});
