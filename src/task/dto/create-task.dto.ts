import { TaskStatus } from '../task.model';

export class CreateTaskDTO {
  id?: string;
  title: string;
  description: string;
  status: TaskStatus;
}
