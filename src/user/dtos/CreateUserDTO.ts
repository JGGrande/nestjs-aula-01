import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, max, min } from "class-validator";
import { Role } from "../../enums/Role.enum";

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minSymbols: 0,
    minNumbers: 0,
    minUppercase: 0
  })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role
}