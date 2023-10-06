import { IsNotEmpty } from "class-validator";
import { TaskStatus } from "../task.model";

export class CreateTaskDTO {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  status?: TaskStatus;
}
