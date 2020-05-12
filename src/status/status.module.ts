import { Module, HttpModule } from '@nestjs/common';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, LoggerModule, ConfigModule],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
