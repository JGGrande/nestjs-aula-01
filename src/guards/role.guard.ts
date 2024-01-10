import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/Role.decorator";
import { Role } from "../enums/Role.enum";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ){ }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

    if(!requiredRoles){
      return true;
    }

    const { user } = context.switchToHttp().getRequest() as Request;

    if(!user){
      return false;
    }

    if(!requiredRoles.includes(user.role)){
      return false;
    }

    return true
  }
}