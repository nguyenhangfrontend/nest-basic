import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  // Query,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDTO } from "./dto/create-task.dto";
// import { GetTasksFilterDTO } from "./dto/get-tasks-fillter.dto";
import { UpdateTaskDto } from "./dto/update-task-status.dto";
import { Task } from "./task.entity";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/auth/user.entity";
import { GetUser } from "src/auth/get-user.decorator";
import { GetTasksFilterDTO } from "./dto/get-tasks-fillter.dto";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private taskService: TaskService) {
    this.taskService = taskService;
  }

  @Get()
  async getTasks(
    @Query() filterDto: GetTasksFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }

  @Get("/:id")
  async getTaskById(@Param("id") id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(
    @Body() data: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(data, user);
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
