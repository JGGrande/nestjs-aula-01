import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from './dtos/CreateUserDTO';
import { UpdateUserDTO } from './dtos/UpdateUserDTO';
import { UpdatePartialUserDTO } from './dtos/UpdatePartialUserDTO';
import { UserService } from './user.service';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from 'src/decorators/ParamId.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/User.decorator';
import { Role } from 'src/enums/Role.enum';
import { Roles } from 'src/decorators/Role.decorator';
import { RoleGuard } from 'src/guards/role.guard';

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){}


  @Post()
  async create(@Body() { email, name, password, role }: CreateUserDTO ){
    return this.userService.create({ email, name, password, role });
  }

  @Roles(Role.User, Role.Admin)
  @Get()
  async findAll(){
    return this.userService.findAll();
  }

  @Get(':id')
  async read(@User("id") id: number){

    return this.userService.findById(id);
  }

  @Put(":id")
  async update(@Body() { name, email, password, role }: UpdateUserDTO, @ParamId() id: number){
    return this.userService.update(id, { name, email, password, role });
  }

  @Patch(":id")
  async updatePartial(@Body() { name, email, password, role }: UpdatePartialUserDTO, @ParamId() id: number){
    return this.userService.updatePartial(id, { name, email, password, role });
  }

  @Delete(":id")
  async delete(@ParamId() id: number ){
    return this.userService.delete(id);
  }

}
