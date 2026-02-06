"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('E-commerce Backend API')
        .setDescription('Comprehensive e-commerce backend API with user authentication, product management, cart, orders, and checkout functionality')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
    }, 'JWT-auth')
        .addTag('Authentication', 'User registration and login endpoints')
        .addTag('Products', 'Product management endpoints')
        .addTag('Cart', 'Shopping cart operations')
        .addTag('Orders', 'Order management')
        .addTag('Checkout', 'Payment and checkout flow')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
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
bootstrap();
//# sourceMappingURL=main.js.map