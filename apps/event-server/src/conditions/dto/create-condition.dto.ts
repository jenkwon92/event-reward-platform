import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateConditionDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  description: string;

  @IsOptional()
  config?: Record<string, any>;

  @IsBoolean()
  isActive: boolean;
}
