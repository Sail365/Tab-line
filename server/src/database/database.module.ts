import { databaseProviders } from './database.provider';
import { Module } from '@nestjs/common/decorators';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
