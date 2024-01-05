import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

export const User = createParamDecorator(( arg: string | undefined, context: ExecutionContext ) => {

  const request = context.switchToHttp().getRequest() as Request;

  if(request.user){
    if(arg){
      return request.user[arg]
    }
    return request.user;
  }

  throw new NotFoundException("User not found");
});