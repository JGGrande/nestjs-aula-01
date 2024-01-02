import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { UpdatePartialUserDTO } from './dtos/UpdatePartialUserDTO';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UserController {

  private user: IUser[] = []

  @Post()
  async create(@Body() body: CreateUserDTO ): Promise<unknown>{
    const user = body

    this.user.push({
      id: this.user.length + 1,
      ...user
    });

    return user
  }

  @Get()
  async findAll(){
    return this.user
  }

  @Get(':id')
  async read(@Param("id", ParseIntPipe) id: number){
    const user = this.user.find(user  => user.id === id)

    return user ? user : null
  }

  @Put(":id")
  async update(@Body() { name, email}: UpdateUserDTO, @Param("id", ParseIntPipe) id: number){
    const user = this.user.find(user => user.id === id);

    if(!user) return { message: "User not found"}

    const indexOfUser = this.user.indexOf(user);

    if(!name) return { message: "name is required" }

    if(!email) return { message: "email is required" }

    this.user[indexOfUser].name = name
    this.user[indexOfUser].email = email

    return this.user[indexOfUser]
  }

  @Patch(":id")
  async updatePartial(@Body() { name, email }: UpdatePartialUserDTO, @Param("id", ParseIntPipe) id: number){
    const user = this.user.find(user => user.id === +id);

    if(!user) return { message: "User not found"}

    const indexOfUser = this.user.indexOf(user);

    this.user[indexOfUser].name = name ?? this.user[indexOfUser].name;
    this.user[indexOfUser].email = email ?? this.user[indexOfUser].email;

    return this.user[indexOfUser]

  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number ){
    if(!id || typeof id !== "number") return { message: "ID is missing"}

    const user = this.user.find(user => user.id === id);

    const indexOfUser = this.user.indexOf(user);

    this.user.splice(indexOfUser, 1);

    return { message: "User deleted"}
  }

}
