import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import { UpdateUserDTO } from "./dtos/UpdateUserDTO";
import { UpdatePartialUserDTO } from "./dtos/UpdatePartialUserDTO";
import { hash } from "bcryptjs";

@Injectable()
export class UserService {

  constructor(

  ) { }

  async create({ email, name, password, role }: CreateUserDTO){

    const userAlreadryExits = await this.findByEmail(email);

    if(userAlreadryExits) throw new ConflictException("User already exists");

    const passwordHashed = await hash(password, 8)

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: passwordHashed,
        role
      }
    });

    delete user.password
    delete user.role

    return user;
  }

  async findById(id: number){
    const user = await this.prisma.user.findUnique({ where: { id } });

    if(!user) return null;

    delete user.password
    delete user.role

    return user
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if(!user) return null;

    delete user.password
    delete user.role

    return user
  }

  async findAll(){
    const users = (await this.prisma.user.findMany())
    .map( user => {
      delete user.password
      delete user.role
      return user
    })
    return users;
  }

  async update(id: number, { email, name, password, role }:UpdateUserDTO){

    if(!( await this.exitsId(id) ) ){
      throw new NotFoundException("ID não encontrado")
    }

    const passwordHashed = await hash(password, 8)

    const user = await this.prisma.user.update({
      data: {
        email,
        name,
        password: passwordHashed,
        role
      },
      where: {
        id
      }
    });

    delete user.password
    delete user.role

    return user;
  }

  async updatePartial(id: number, { email, name, password, role }: UpdatePartialUserDTO){
    if(!( await this.exitsId(id) ) ){
      throw new NotFoundException("ID não encontrado")
    }

    if(password){
      const passwordHashed = await hash(password, 8)
      password = passwordHashed
    }

    const user = await this.prisma.user.update({
      data: {
        email,
        name,
        password,
        role
      },
      where: {
        id
      }
    });

    delete user.password
    delete user.role

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