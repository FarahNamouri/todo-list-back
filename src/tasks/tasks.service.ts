import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDto } from 'src/dto/tasks.dto';
import { Task, TaskDocument } from 'src/models/tasks.models';
@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}
  Add(body: TaskDto) {
    return this.taskModel.create(body);
  }

  FindAll() {
    return this.taskModel.find();
  }

  FindOne(id: string) {
    return this.taskModel.findById({ _id: id });
  }

  Update(id: string, body: TaskDto) {
    return this.taskModel.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true },
    );
  }

  Delete(id: string) {
    return this.taskModel.findOneAndRemove({ _id: id });
  }

  Search(key: string) {
    const keyword = key
      ? {
          $or: [
            { taskname: { $regex: key, $options: 'i' } },
            { description: { $regex: key, $options: 'i' } },
          ],
        }
      : {};
    return this.taskModel.find(keyword);
  }
}
