import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-fillter.dto';
import { title } from 'process';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTask();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  createTask(data: CreateTaskDTO) {
    console.log('data', data);
    const body: Task = {
      ...data,
      id: uuid(),
      status: TaskStatus.OPEN,
    };
    this.tasks.push(body);
    return body;
  }
  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  deleteTask(id: string): string {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return 'delete success';
  }

  updateTask(data: CreateTaskDTO): Task {
    const index = this.tasks.findIndex((task) => task.id === data.id);
    this.tasks[index] = data;
    return data;
  }
}
