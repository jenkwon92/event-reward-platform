import { IsString } from 'class-validator';

export class CreateRewardRequestDto {
  @IsString()
  eventId: string;

  @IsString()
  rewardId: string;
}
