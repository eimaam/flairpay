import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { AppLoggerService } from '../logger/logger.service';
import { InjectConnection } from '@nestjs/mongoose';

export interface DbHealthDto {
    connected: boolean;
    host: string;
    database: string;
}

@Injectable()
export class DatabaseService implements OnModuleInit, OnApplicationShutdown {

    constructor(
        @InjectConnection()
        private readonly connection: Connection,
        private readonly logger: AppLoggerService
    ) { }

    onModuleInit() {
        const state = this.connection.readyState;
        if (state === 1) {
            this.logger.info(`MongoDB connected — host: ${this.connection.host}, db: ${this.connection.name}`);
        } else {
            this.logger.warn(`MongoDB not ready at init — readyState: ${state}`);
        }
    }




    isConnected(): boolean {
        return this.connection.readyState === 1
    }

    isHealthy(): boolean {
        return this.connection.readyState === 1
    }

    getHealth(): DbHealthDto {
        return {
            connected: this.isConnected(),
            host: this.connection.host,
            database: this.connection.name
        }
    }

    async onApplicationShutdown() {
        if (this.connection.readyState === 1) {
            await this.connection.close().then(() => {
                this.logger.info("Database connection closed successfully");
            }).catch((error) => {
                this.logger.error(`Failed to close database connection: ${error.message}`, "DatabaseService");
            });
        }

        this.logger.info(`MongoDB connection closed`);
    }



}
