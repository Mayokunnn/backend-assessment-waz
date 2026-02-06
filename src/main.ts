import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import helmet from 'helmet';
import express, { Express, Request, Response } from 'express';

let cachedServer: Express;

async function bootstrapServer(): Promise<Express> {
  if (!cachedServer) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    app.use(helmet());

    app.enableCors();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

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

    await app.init();
    cachedServer = expressApp;
  }
  return cachedServer;
}

// For local development
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

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

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`
  Server is running!
  API Documentation: http://localhost:${port}/api/docs
  API Endpoint: http://localhost:${port}
  `);
}

// Run locally
if (require.main === module) {
  bootstrap();
}

// Export for Vercel
export default async (req: Request, res: Response) => {
  const server = await bootstrapServer();
  return server(req, res);
};
