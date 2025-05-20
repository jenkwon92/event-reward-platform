import { IsString, IsDateString, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsString()
  code: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsArray()
  conditionCodes?: string[];
}
