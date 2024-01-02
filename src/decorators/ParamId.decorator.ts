import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ParamId = createParamDecorator((_data: unknown, contex: ExecutionContext ) => {
  return +contex.switchToHttp().getRequest().params.id;
});