import { Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {
    this.taskService = taskService;
  }

  @Get()
  getAllTask(): Task[] {
    return this.taskService.getAllTask();
  }

  @Post()
  createTask(data: Task): Task {
    const response = this.taskService.createTask(data)
    return response;
  }
}
