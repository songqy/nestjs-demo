import { Module } from '@nestjs/common';
import { StatusModule } from '../status/status.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [StatusModule],
  providers: [TasksService],
})
export class TasksModule {}
