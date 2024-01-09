import { Role } from "src/enums/Role.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
  name: "user"
})
export class User {
  @PrimaryGeneratedColumn({
    unsigned: true
  })
  id: number;

  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: "enum",
    enum: Role,
    default: Role.User
  })
  role: Role;
}