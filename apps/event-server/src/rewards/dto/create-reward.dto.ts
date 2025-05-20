import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  eventId: string;

  @IsString()
  type: string;

  @IsNumber()
  amount: number;

  @IsString()
  description?: string;

  @IsBoolean()
  isActive: boolean;
}
