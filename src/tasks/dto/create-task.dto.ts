import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  due_date: string = new Date().toISOString();

  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  note?: string;

  @IsBoolean()
  is_done: boolean = false;

  user_id: number;
}
