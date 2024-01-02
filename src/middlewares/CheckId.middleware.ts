import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CheckIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;

    if(isNaN(id) || id <= 0 ) {
      throw new BadRequestException("ID Inválido");
    }

    next();
  }
}