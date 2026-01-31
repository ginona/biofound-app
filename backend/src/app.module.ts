import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CreatorsModule } from './creators/creators.module';
import { DirectoryModule } from './directory/directory.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    PrismaModule,

    // Feature modules
    AuthModule,
    CreatorsModule,
    DirectoryModule,
  ],
})
export class AppModule {}
