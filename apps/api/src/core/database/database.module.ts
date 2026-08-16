import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigEnum, AppConfigModule, AppConfigService } from '../config';
import { DATABASE_CONNECTION } from './database.constants';
import { AppLoggerService } from '../logger/logger.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (
        config: AppConfigService
      ) => ({
        uri: config.database.uri,
        dbName: config.database.name,
        autoIndex: config.database.autoIndex,
        serverSelectionTimeoutMS: 5000,

        connectTimeoutMS: 10000,

        socketTimeoutMS: 45000,
      }),
    }),
    AppConfigModule
  ],
  providers: [DatabaseService, AppLoggerService, AppConfigService],
  exports: [DatabaseService, DatabaseModule],
})
export class DatabaseModule {}
