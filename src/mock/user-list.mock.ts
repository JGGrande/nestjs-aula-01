import { Role } from "../enums/Role.enum";
import { User } from "../user/entity/user.entity";

const userListMock: User[] = []

const user1 = new User();
user1.id = userListMock.length + 1;
user1.name = "Jhon Doe";
user1.email = "jhon.doe@gmail.com";
user1.password = '1234';
user1.role = Role.User;
user1.createdAt = new Date();
user1.updatedAt = new Date();

const user2 = new User();
user2.id = userListMock.length + 1;
user2.name = "Admin user";
user2.email = "Adimn@gmail.com";
user2.password = 'admin';
user2.role = Role.Admin;
user2.createdAt = new Date();
user2.updatedAt = new Date();

userListMock.push(user1);
userListMock.push(user2);

export { userListMock }