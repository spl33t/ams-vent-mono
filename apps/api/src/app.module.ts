import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WorksModule } from './works/works.module';
import { FilesManagmentModule } from './file-managment/files.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthModule,
    WorksModule,
    FilesManagmentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
