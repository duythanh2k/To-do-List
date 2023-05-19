import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
