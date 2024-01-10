import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { userRepositoryMock } from "../mock/user-repository.mock";
import { Role } from "../enums/Role.enum";
import { User } from "./entity/user.entity";
import { userListMock } from "../mock/user-list.mock";
import {  compare, compareSync } from "bcryptjs";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";

describe('User Service', () => {

  let userService: UserService;
  let userRepository: Repository<User>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        userRepositoryMock
      ]
    }).compile();

    userService = module.get<UserService>(UserService)
    userRepository = module.get(getRepositoryToken(User))
  });

  it('should be create a user', async ()=> {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Crete',()=>{
    it("should be create a user", async ()=> {
      //altera o valor do metodo findOneBy para fazer o teste funcionar
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(null)

      const userMock = userListMock[0];

      const user = await userService.create({
        email: userMock.email,
        name: userMock.name,
        password: userMock.password,
        role: userMock.role
      });

      // expect(user.id).toEqual(1);
      // expect(user.name).toEqual(userMock.name);
      // expect(user.email).toEqual(userMock.email);
      // expect(user.role).toEqual(userMock.role);
      // const passwordIsValid = await compare(userMock.password, user.password)
      // expect(passwordIsValid).toBeTruthy()
      // expect(user.createdAt instanceof Date).toBeTruthy();
      // expect(user.updatedAt instanceof Date).toBeTruthy();

      expect(user).toEqual(userMock);

    });
  });

  describe('Read',()=>{
    it('should be able fin all users', async () => {
      const users = await userService.findAll()

      expect(users).toEqual(userListMock);

    });

    it("Should be able find user by id", async ()=> {
      const user = await userService.findById(1);
      expect(user).toEqual(userListMock[0]);
    });

  });

  describe('Update',()=>{
    it('should be able update user', async () => {
      const userMock = userListMock[0]

      userMock.password = "1234"

      const user = await userService.update(1, userMock )

      expect(user).toEqual(userListMock[0])
    });
  });

  describe('Delete', () => {
    it('should be able delete user', async () => {
      expect(
        userService.delete(1)
      ).resolves
    });
  })

});