import { IsString, IsNotEmpty } from 'class-validator'
import { PartialType } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  username: string;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) { }
