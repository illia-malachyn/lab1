import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TemperatureSensorsController (e2e)', () => {
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

  it('/temperature-sensors (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/temperature-sensors')
      .send({ name: 'Test Temp', value: 22.5, unit: 'C', timestamp: new Date() })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('/temperature-sensors (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/temperature-sensors')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/temperature-sensors/:id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/temperature-sensors/${createdId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('/temperature-sensors/:id (PATCH)', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/temperature-sensors/${createdId}`)
      .send({ value: 25 })
      .expect(200);
    expect(res.body).toHaveProperty('value', 25);
  });

  it('/temperature-sensors/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/temperature-sensors/${createdId}`)
      .expect(200);
  });
});
