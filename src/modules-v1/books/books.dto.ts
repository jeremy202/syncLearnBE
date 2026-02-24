import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserIdDto } from '../../lib/validators/global';

export class AddBookDto extends UserIdDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  file: string;

  @IsString()
  @IsOptional()
  audio?: string;

  @IsString()
  @IsOptional()
  coverUrl?: string;
}

export class BookIdDto extends UserIdDto {
  @IsString()
  @IsNotEmpty()
  bookId: string;
}
