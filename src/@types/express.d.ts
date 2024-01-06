import { Role } from "src/enums/Role.enum";

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