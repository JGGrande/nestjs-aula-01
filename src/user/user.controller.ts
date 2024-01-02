import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { UpdatePartialUserDTO } from './dtos/UpdatePartialUserDTO';
import { UserService } from './user.service';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){}

  private user: IUser[] = []

  @Post()
  async create(@Body() { email, name, password }: CreateUserDTO ){
    return this.userService.create({ email, name, password });
  }

  @Get()
  async findAll(){
    return this.userService.findAll();
  }

  @Get(':id')
  async read(@Param("id", ParseIntPipe) id: number){
    return this.userService.findById(id);
  }

  @Put(":id")
  async update(@Body() { name, email, password }: UpdateUserDTO, @Param("id", ParseIntPipe) id: number){
    return this.userService.update(id, { name, email, password})
  }

  @Patch(":id")
  async updatePartial(@Body() { name, email, password }: UpdatePartialUserDTO, @Param("id", ParseIntPipe) id: number){
    return this.userService.updatePartial(id, { name, email, password });
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id: number ){
    return this.userService.delete(id);
  }

}
