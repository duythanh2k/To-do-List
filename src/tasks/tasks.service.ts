import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  create(user_id: number, todo: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data: {
        ...todo,
        user: {
          connect: {
            user_id,
          },
        },
      },
    });
  }

  findAll(user_id: number) {
    return this.prisma.task.findMany({ where: { user_id } });
  }

  findCompleted(user_id: number) {
    return this.prisma.task.findMany({ where: { user_id, is_done: true } });
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({ where: { task_id: id } });
  }

  update(id: number, task: Prisma.TaskUpdateInput) {
    return this.prisma.task.update({
      where: { task_id: id },
      data: task,
    });
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { task_id: id } });
  }
}
