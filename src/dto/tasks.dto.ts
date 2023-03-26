/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  taskname: string;

  @IsNotEmpty()
  description: string;
}
