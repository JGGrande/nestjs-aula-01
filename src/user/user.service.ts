import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import { PrismaService } from "src/database/prisma.service";
import { UpdateUserDTO } from "./dtos/UpdateUserDTO";
import { UpdatePartialUserDTO } from "./dtos/UpdatePartialUserDTO";

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService) { }

  async create({ email, name, password }: CreateUserDTO){

    const userAlreadryExits = await this.findByEmail(email);

    if(userAlreadryExits) throw new ConflictException("User already exists");


    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password
      }
    });

    return user;
  }

  async findById(id: number){
    const user = await this.prisma.user.findUnique({ where: { id } });

    if(!user) return null;

    return user
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if(!user) return null;

    return user
  }

  async findAll(){
    const users = await this.prisma.user.findMany();
    return users;
  }

  async update(id: number, { email, name, password }:UpdateUserDTO){

    if(!( await this.exitsId(id) ) ){
      throw new NotFoundException("ID não encontrado")
    }

    const user = await this.prisma.user.update({
      data: {
        email,
        name,
        password
      },
      where: {
        id
      }
    });

    return user;
  }

  async updatePartial(id: number, { email, name, password }: UpdatePartialUserDTO){
    if(!( await this.exitsId(id) ) ){
      throw new NotFoundException("ID não encontrado")
    }

    const user = await this.prisma.user.update({
      data: {
        email,
        name,
        password
      },
      where: {
        id
      }
    });

    return user;
  }

  async delete(id: number){
    await this.prisma.user.delete({ where: { id } });
  }

  async exitsId(id: number){
    const user = await this.prisma.user.count({ where: { id } });

    return !!user
  }

}