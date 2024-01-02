import { Body, Controller, Delete, Get, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { UpdatePartialUserDTO } from './dtos/UpdatePartialUserDTO';
import { UserService } from './user.service';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from 'src/decorators/ParamId.decorator';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){}

  @UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() { email, name, password }: CreateUserDTO ){
    return this.userService.create({ email, name, password });
  }

  @Get()
  async findAll(){
    return this.userService.findAll();
  }

  @Get(':id')
  async read(@ParamId() id: number){
    return this.userService.findById(id);
  }

  @Put(":id")
  async update(@Body() { name, email, password }: UpdateUserDTO, @ParamId() id: number){
    return this.userService.update(id, { name, email, password})
  }

  @Patch(":id")
  async updatePartial(@Body() { name, email, password }: UpdatePartialUserDTO, @ParamId() id: number){
    return this.userService.updatePartial(id, { name, email, password });
  }

  @Delete(":id")
  async delete(@ParamId() id: number ){
    return this.userService.delete(id);
  }

}
