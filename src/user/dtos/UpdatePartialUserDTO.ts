import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./CreateUserDTO";

export class UpdatePartialUserDTO extends PartialType(CreateUserDTO){  }