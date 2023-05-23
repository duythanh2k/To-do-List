import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Prisma, User as UserModel } from '@prisma/client';
import { User } from 'src/users/users.decorator';
import { TasksGuard } from './tasks.guard';

@Controller('tasks')
@UseGuards(TasksGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@User() user_id: string, @Body() task: Prisma.TaskCreateInput) {
    return this.tasksService.create(+user_id, task);
  }

  @Get()
  findAll(@User() user_id: string) {
    return this.tasksService.findAll(+user_id);
  }

  @Get('done')
  findCompleted(@User() user_id: string) {
    return this.tasksService.findCompleted(+user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() task: Prisma.TaskUpdateInput) {
    return this.tasksService.update(+id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
