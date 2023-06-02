import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { TasksService } from './tasks.service'

@Injectable()
export abstract class TasksGuard implements CanActivate {
    constructor(private readonly tasksService: TasksService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        const { params, user } = req

        if (params?.id == null) {
            return true // this request isn't scoped to a single existing todo
        }

        const todo = await this.tasksService.findOne(+params?.id)
        if (!todo) {
            throw new NotFoundException()
        } else if (todo.user_id !== user.sub) {
            throw new ForbiddenException()
        }
        return true
    }
}
