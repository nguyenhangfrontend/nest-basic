import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTask(): Task[] {
    return this.tasks;
  }

  createTask(data: Task) {
    const body: Task = {
      ...data,
      id: uuid(),
      status: TaskStatus.OPEN,
    };
    return body;
  }
}
