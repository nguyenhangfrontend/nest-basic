import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
