import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../user/entity/user.entity";
import { userListMock } from "./user-list.mock";

export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    save: jest.fn().mockResolvedValue(userListMock[0]),
    findOneBy: jest.fn().mockResolvedValue(userListMock[0]),
    find: jest.fn().mockResolvedValue(userListMock),
    delete: jest.fn(),
    exists: jest.fn().mockResolvedValue(true),
  }
}