/* eslint-disable max-classes-per-file */
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

import { IsEmail, IsEmail as IsStrictEmail, TransformToLowerCase } from '../../lib/validators';
import { EmailPasswordDto, UserIdDto } from '../../lib/validators/global';

export class RegisterDto {
  @IsStrictEmail()
  @TransformToLowerCase()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @MinLength(6, {
    message: 'Password should contain at least 6 characters',
  })
  password: string;
}

export class ProfileDto extends UserIdDto {
}

export class ProfileUpdateDto extends UserIdDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

export class VerifyEmailDto {
  @IsEmail()
  @TransformToLowerCase()
  email: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class LoginDto extends EmailPasswordDto {}
