import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-fillter.dto';
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {
    this.taskService = taskService;
  }

  @Get()
  getAllTask(@Query() filterData: GetTasksFilterDTO): Task[] {
    if (Object.keys(filterData).length) {
      return this.taskService.getTaskWithFilters(filterData);
    } else {
      return this.taskService.getAllTask();
    }
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() data: CreateTaskDTO): Task {
    return this.taskService.createTask(data);
  }
  @Put()
  updateTask(@Body() data: CreateTaskDTO): Task {
    return this.taskService.updateTask(data);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
