import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mongoConfig } from './config/mongo.config';

@Module({
  imports: [mongoConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
