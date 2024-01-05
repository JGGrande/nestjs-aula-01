import { IsEmail } from "class-validator";

export class AuthLoginForgetDTO{
  @IsEmail()
  email:string;
}