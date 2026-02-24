import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTrDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}
