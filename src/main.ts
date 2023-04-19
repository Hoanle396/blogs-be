import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const port = process.env.APP_PORT || 4000
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('App')
    .setDescription('The API description')
    .setVersion('1.0')
    .setContact('Lê Hữu Hoàn', 'https://hoanle.tk', 'hoanle396@gmail.com')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)
  await app.listen(port)
  Logger.verbose(`🚀 App running on port ${port}`, 'App')
  Logger.verbose(`🚀 Docs available at http://localhost:${port}/docs`, 'Swagger')
}
bootstrap()
