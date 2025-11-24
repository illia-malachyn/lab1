import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const frontend = process.env.FRONTEND_URL;
  const corsOptions = frontend
    ? {
      origin: frontend, // restrict to frontend domain in production
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    }
    : {
      origin: '*', // convenient for local/dev
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    };
  app.enableCors(corsOptions);

  const port = process.env.PORT ?? 10000
  console.log(`Server running on port ${port}`);

  await app.listen(port);
}

bootstrap();
