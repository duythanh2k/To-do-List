import { IsString, IsNotEmpty } from 'class-validator'

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}
