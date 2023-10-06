import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDTO } from "./dto/create-task.dto";
// import { GetTasksFilterDTO } from "./dto/get-tasks-fillter.dto";
// import { UpdateTaskDto } from "./dto/update-task-status.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { TaskStatus } from "./task.model";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  // private tasks: Task[] = [];
  async getAllTask(): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder("task");
    const tasks = await query.getMany();
    return tasks;
  }
  // getTaskWithFilters(filterDto: GetTasksFilterDTO): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTask();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  async createTask(data: CreateTaskDTO): Promise<CreateTaskDTO> {
    const task = this.taskRepository.create({
      ...data,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }
  async getTaskById(id: any): Promise<Task> {
    console.log("getTaskById");
    const found = await this.taskRepository.findOneById(id);
    if (!found) {
      throw new NotFoundException(`Tassk with ${id} not found!`);
    }
    return found;
  }
  async deleteTask(id: number): Promise<Task> {
    const found = await this.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Tassk with ${id} not found!`);
    }

    await this.taskRepository.delete(id);
    return found;
  }
  async updateTask(data: Task): Promise<Task> {
    let task = await this.getTaskById(data?.id);

    if (!task) {
      throw new NotFoundException(`Tassk with ${data?.id} not found!`);
    }
    task = data;
    await this.taskRepository.save(task);
    return task;
  }
}
