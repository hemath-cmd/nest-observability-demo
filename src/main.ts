import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. ValidationPipe - DTO Validation Work ஆக
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,           // DTO-ல இல்லாத Property-அ Auto Remove பண்ணும்
    forbidNonWhitelisted: true, // Extra Property வந்தா Error Throw பண்ணும்
    transform: true,           // Type-அ Auto Convert பண்ணும்
  }));

  // 2. Swagger Setup - API Docs க்கு
  const config = new DocumentBuilder()
    .setTitle('Nest Demo API')
    .setDescription('Items CRUD API with Validation')
    .setVersion('1.0')
    .addTag('items')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`App running: http://localhost:3000`);
  console.log(`Swagger docs: http://localhost:3000/api`);
}
bootstrap();