import { IsOptional, IsString, IsBoolean, IsNumber, IsObject } from 'class-validator';

export class UpdateRewardDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  config?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  amount?: number;
}
