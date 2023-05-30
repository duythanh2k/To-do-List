import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserArgs: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data: createUserArgs })
    }

    async findOne(findUniqueUserArgs: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: findUniqueUserArgs,
        })
    }

    async findByUsername(username: string) {
        return this.prisma.user.findUnique({
            where: { username },
        })
    }
}
