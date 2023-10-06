import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";
import { CreateTaskDTO } from "./create-task.dto";

export class UpdateTaskDto extends CreateTaskDTO {
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
