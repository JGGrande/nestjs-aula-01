import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthLoginResetDTO {
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minSymbols: 0,
    minNumbers: 0,
    minUppercase: 0
  })
  password: string;

  @IsJWT()
  token: string;

}