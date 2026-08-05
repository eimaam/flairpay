import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // configure global prefix and version
  app.setGlobalPrefix("api")
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });


  // 
  
  
  await app.listen(process.env.PORT ?? 8000);
  console.log(`Server Running on ${process.env.PORT ?? 8000}`)
}
bootstrap();
