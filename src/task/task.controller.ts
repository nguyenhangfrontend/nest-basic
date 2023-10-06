import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // Query,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDTO } from "./dto/create-task.dto";
// import { GetTasksFilterDTO } from "./dto/get-tasks-fillter.dto";
import { UpdateTaskDto } from "./dto/update-task-status.dto";
import { Task } from "./task.entity";

@Controller("tasks")
export class TaskController {
  constructor(private taskService: TaskService) {
    this.taskService = taskService;
  }

  @Get()
  async getAllTask(): Promise<Task[]> {
    return this.taskService.getAllTask();
  }
  @Get("/:id")
  async getTaskById(@Param("id") id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() data: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(data);
  }
  @Put()
  async updateTask(@Body() data: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateTask(data);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: number) {
    return this.taskService.deleteTask(id);
  }
}
