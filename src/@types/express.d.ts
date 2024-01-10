import { Role } from "../enums/Role.enum";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        role: Role;
      }
    }
  }
}