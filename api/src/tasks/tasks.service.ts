import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}

    async create(user_id: number, todo: Prisma.TaskCreateInput) {
        return await this.prisma.task.create({
            data: {
                ...todo,
                user: {
                    connect: {
                        user_id,
                    },
                },
            },
        })
    }

    async findAll(user_id: number) {
        return await this.prisma.task.findMany({ where: { user_id } })
    }

    async findCompleted() {
        return await this.prisma.task.findMany()
    }

    async findOne(id: number) {
        return await this.prisma.task.findUnique({ where: { task_id: id } })
    }

    async update(id: number, task: Prisma.TaskUpdateInput) {
        return await this.prisma.task.update({
            where: { task_id: id },
            data: task,
        })
    }

    async remove(id: number) {
        await this.prisma.task.delete({ where: { task_id: id } })
    }
}
