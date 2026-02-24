/* eslint-disable max-classes-per-file */
import { IsInt, IsOptional, IsString, IsUUID, Max, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { TransformToLowerCase, IsEmail as IsStrictEmail } from '.';

export class EmailDto {
  @IsStrictEmail()
  @TransformToLowerCase()
  email: string;
}

export class EmailPasswordDto {
  @IsStrictEmail()
  @TransformToLowerCase()
  email: string;

  @IsString()
  @MinLength(6, {
    message: 'Password should contain at least 6 characters',
  })
  password: string;
}

export class UserIdDto {
  @IsUUID()
  userId: string;
}

export class LevelIdDto {
  @IsUUID()
  levelId: string;
}

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(20)
  limit = 20;
}

export class LevelPaginationDto extends PaginationDto {
  @IsUUID()
  levelId: string;
}

export class StudentIdDto {
  @IsUUID()
  studentId: string;
}

export class IdDto {
  @IsUUID()
  id: string;
}

export class IdWithUserIdDto extends UserIdDto {
  @IsUUID()
  id: string;
}

export class SchoolSessionDto {
  @IsUUID()
  sessionId: string;
}

export class OrganizationWithUserIdDto extends UserIdDto {
  @IsUUID()
  organizationId: string;
}

export class OrganizationDto {
  @IsUUID()
  organizationId: string;
}

export class OrganizationWithIdDto extends IdDto {
  @IsUUID()
  organizationId: string;
}

export class EmptyDto {}
