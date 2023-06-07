import { Controller, Get } from '@nestjs/common'
import { SkipAuth } from '../auth/auth.decorator'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('users')
    @SkipAuth()
    signUp() {
        return this.usersService.findAll()
    }
}
