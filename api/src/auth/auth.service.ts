import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signUp(
        username: string,
        pass: string
    ): Promise<{ message: string; statusCode: number }> {
        const existedUser = await this.usersService.findByUsername(username)
        if (existedUser) {
            throw new BadRequestException()
        }

        const hashedPassword = await bcrypt.hash(pass, 10)
        await this.usersService.create({
            username,
            password: hashedPassword,
        })
        return {
            message: 'User has successfully created!',
            statusCode: HttpStatus.CREATED,
        }
    }

    async signIn(username: string, pass: string) {
        const user = await this.usersService.findOne({ username })
        if (!user || !user?.password) {
            throw new BadRequestException()
        }

        const isPasswordMatch = await bcrypt.compare(pass, user.password)
        if (!isPasswordMatch) {
            throw new BadRequestException()
        }
        const payload = { sub: user.user_id, username: user.username }
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }
}
