import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/CreateUserDTO";
import { UpdateUserDTO } from "./dtos/UpdateUserDTO";
import { UpdatePartialUserDTO } from "./dtos/UpdatePartialUserDTO";
import { hash } from "bcryptjs";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create({ email, name, password, role }: CreateUserDTO){

    const userAlreadryExits = await this.findByEmail(email);

    if(userAlreadryExits) throw new ConflictException("User already exists");

    const passwordHashed = await hash(password, 8)

    const user = await this.userRepository.save({
      email,
      name,
      password: passwordHashed,
      role
    })

    delete user.password
    delete user.role

    return user;
  }

  async findById(id: number){
    const user = await this.userRepository.findOneBy({ id });

    if(!user) return null;

    delete user.password
    delete user.role

    return user
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if(!user) return null;

    delete user.password
    delete user.role

    return user
  }

  async findAll(){
    const users = await this.userRepository.find()

    return users;
  }

  async update(id: number, { email, name, password, role }:UpdateUserDTO){

    if(!( await this.exitsId(id) ) ){
      throw new NotFoundException("ID não encontrado")
    }

    const passwordHashed = await hash(password, 8)

    const user = await this.userRepository.save({
      id,
      email,
      password: passwordHashed,
      name,
      role
    })

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

    const user = await this.userRepository.save({
      id,
      email,
      password,
      name,
      role
    })

    delete user.password
    delete user.role

    return user;
  }

  async delete(id: number){
    await this.userRepository.delete( id );
  }

  async exitsId(id: number){
    const userExits = await this.userRepository.exists({
      where: {
        id
      }
    });

    return userExits
  }

}