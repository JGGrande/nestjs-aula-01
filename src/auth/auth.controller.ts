import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./dtos/AuthLoginDTO";
import { AuthRegisterDTO } from "./dtos/AuthRegisterDTO";
import { AuthLoginForgetDTO } from "./dtos/AuthLoginForgetDTO";
import { AuthLoginResetDTO } from "./dtos/AuthLoginResetDTO";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async login(@Body() { email, password }: AuthLoginDTO){
    return this.authService.login({ email, password });
  }

  @Post("forget")
  async forget(@Body() { email }: AuthLoginForgetDTO){
    return this.authService.forget({ email });
  }

  @Post("reset")
  async reset(@Body() { password, token }: AuthLoginResetDTO){
    return this.authService.reset({ password, token });
  }

}