import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Res,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Prisma, User as UserModel } from '@prisma/client'
import { User } from 'src/users/users.decorator'
import { TasksGuard } from './tasks.guard'
import { SkipAuth } from 'src/auth/auth.decorator'
import { Response } from 'express'

@Controller('tasks')
@UseGuards(TasksGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async create(@User() user_id: string, @Body() task: Prisma.TaskCreateInput) {
        return await this.tasksService.create(+user_id, task)
    }

    @Get()
    async findAll(@User() user_id: string) {
        return await this.tasksService.findAll(+user_id)
    }

    @Get('done')
    @SkipAuth()
    async findCompleted() {
        return await this.tasksService.findCompleted()
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.tasksService.findOne(+id)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() task: Prisma.TaskUpdateInput) {
        return await this.tasksService.update(+id, task)
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        await this.tasksService.remove(+id)
        return res.status(204).json()
    }
}
