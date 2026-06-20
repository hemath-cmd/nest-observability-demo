import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { CompanyContextGuard } from './common/guards/company-context.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalGuards(new CompanyContextGuard());

  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
}
bootstrap();