import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthLoginDTO } from "./dtos/AuthLoginDTO";
import { PrismaService } from "src/database/prisma.service";
import { compare, hash } from "bcryptjs";
import { AuthLoginForgetDTO } from "./dtos/AuthLoginForgetDTO";
import { AuthLoginResetDTO } from "./dtos/AuthLoginResetDTO";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {

  constructor(
    private readonly JWTService: JwtService,
    private readonly prisma: PrismaService
  ){}

  async createToken(user: User){
    return this.JWTService.sign({
      id: user.id,
      name: user.name,
      role: user.role
    }, {
      expiresIn: "7d",
      subject: String(user.id),
      issuer: "Login",
      audience: "Users"
    })

  }

  verifyToken(token: string) {
    try {
      const data = this.JWTService.verify(token, {
        audience: "Users",
      })
      return data
    }catch(err){
      throw new UnauthorizedException("Token invalid")
    }
  }


  async login({ email, password }: AuthLoginDTO){
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    });

    if(!user) throw new UnauthorizedException("Email or password invalid.");

    const passwordIsValid = await compare(password, user.password);

    if(!passwordIsValid) throw new UnauthorizedException("Email or password invalid.");


    delete user.password

    const token = await this.createToken(user);

    delete user.role

    return {
      user,
      token
    };
  }

  async forget({ email }: AuthLoginForgetDTO){
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    });

    if(!user) throw new UnauthorizedException("Email invalid.");

    return true;
  }

  async reset({ password, token }: AuthLoginResetDTO){

    const id = 1

    const passwordHashed = await hash(password, 8)

    const newUser = await this.prisma.user.update({
      where: {
        id
      },
      data : {
        password: passwordHashed
      }
    });

    delete newUser.password

    const newToken = await this.createToken(newUser);

    return {
      newUser,
      newToken
    };

  }

}