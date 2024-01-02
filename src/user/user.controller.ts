import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

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
  async create(@Body() body): Promise<unknown>{
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
  async read(@Param() params){
    const user = this.user.find(user  => user.id === +params.id)

    return user ? user : null
  }

  @Put(":id")
  async update(@Body() body, @Param() params){
    const id = params.id;

    const user = this.user.find(user => user.id === +id);

    if(!user) return { message: "User not found"}

    const indexOfUser = this.user.indexOf(user);

    const { name, email } = body;

    if(!name) return { message: "name is required" }

    if(!email) return { message: "email is required" }

    this.user[indexOfUser].name = name
    this.user[indexOfUser].email = email

    return this.user[indexOfUser]

  }

  @Patch(":id")
  async updatePartial(@Body() body, @Param() params){

    const id = params.id;

    const user = this.user.find(user => user.id === +id);

    if(!user) return { message: "User not found"}

    const indexOfUser = this.user.indexOf(user);

    const { name, email } = body;

    this.user[indexOfUser].name = name ?? this.user[indexOfUser].name;
    this.user[indexOfUser].email = email ?? this.user[indexOfUser].email;

    return this.user[indexOfUser]

  }

  @Delete(":id")
  async delete(@Param() { id } ){
    if(!id || typeof id !== "string") return { message: "ID is missing"}

    const user = this.user.find(user => user.id === +id);

    const indexOfUser = this.user.indexOf(user);

    this.user.splice(indexOfUser, 1);

    return { message: "User deleted"}
  }

}
