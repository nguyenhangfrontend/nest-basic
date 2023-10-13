import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
// import { GetTasksFilterDTO } from "./dto/get-tasks-fillter.dto";
// import { UpdateTaskDto } from "./dto/update-task-status.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { TaskStatus } from "./task.model";
import { User } from "src/auth/user.entity";
import { GetTasksFilterDTO } from "./dto/get-tasks-fillter.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private configService: ConfigService,
  ) {
    console.log(this.configService.get("TEST_VALUE"));
  }
  // private tasks: Task[] = [];
  async getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.taskRepository.createQueryBuilder("task");
    query.where({ user });

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    if (search) {
      query.andWhere(
        "(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))",
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(data: CreateTaskDTO, user: User): Promise<Task> {
    const task = this.taskRepository.create({
      ...data,
      status: TaskStatus.OPEN,
      user,
    });
    console.log("task", task);
    await this.taskRepository.save(task);
    return task;
  }
  async getTaskById(id: any, user?: User): Promise<Task> {
    console.log("getTaskById");
    const found = await this.taskRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Tassk with ${id} not found!`);
    }
    return found;
  }
  async deleteTask(id: number, user: User): Promise<Task> {
    const found = await this.getTaskById(id, user);
    if (!found) {
      throw new NotFoundException(`Tassk with ${id} not found!`);
    }

    await this.taskRepository.delete(id);
    return found;
  }
  async updateTask(data: Task, user: User): Promise<Task> {
    let task = await this.getTaskById(data?.id, user);

    if (!task) {
      throw new NotFoundException(`Tassk with ${data?.id} not found!`);
    }
    task = data;
    await this.taskRepository.save(task);
    return task;
  }
}
