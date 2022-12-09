import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginRequestDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
