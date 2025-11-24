import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('LightSensorsController (e2e)', () => {
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

  it('/light-sensors (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/light-sensors')
      .send({ name: 'Test Light', value: 123, unit: 'lux', timestamp: new Date() })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });

  it('/light-sensors (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/light-sensors')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/light-sensors/:id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get(`/light-sensors/${createdId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', createdId);
  });

  it('/light-sensors/:id (PATCH)', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/light-sensors/${createdId}`)
      .send({ value: 456 })
      .expect(200);
    expect(res.body).toHaveProperty('value', 456);
  });

  it('/light-sensors/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/light-sensors/${createdId}`)
      .expect(200);
  });
});
