import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';

const server = express();
let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    // All your middleware / pipes
    app.use(helmet());
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    // Swagger setup
    const config = new DocumentBuilder()
      .setTitle('E-commerce Backend API')
      .setDescription(
        'Comprehensive e-commerce backend API with user authentication, product management, cart, orders, and checkout functionality',
      )
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
        },
        'JWT-auth',
      )
      .addTag('Authentication', 'User registration and login endpoints')
      .addTag('Products', 'Product management endpoints')
      .addTag('Cart', 'Shopping cart operations')
      .addTag('Orders', 'Order management')
      .addTag('Checkout', 'Payment and checkout flow')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      customSiteTitle: 'E-commerce API Documentation',
      customfavIcon: 'https://nestjs.com/img/logo_text.svg',
      customCss: '.swagger-ui .topbar { display: none }',
    });

    await app.init(); // VERY important for serverless
    cachedApp = app;
  }
}

// The function Vercel calls
export default async function handler(req: any, res: any) {
  await bootstrap();
  server(req, res);
}
