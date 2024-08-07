import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';
import { AUTH_MODULE_CONSTANTS } from './constants';
import { JwtService } from './jwt.service';
import { User } from '@prisma/client';
import typia from 'typia';
import { Request } from "express"

function getProtocol(req: Request) {
  const isPostman = Boolean((req.headers)["postman-token"])
  if (isPostman) return "http"

  const origin = req.get('origin')
  if (typeof origin !== "string") return undefined

  const url = new URL(origin)
  const protocol = url.protocol.replace(/[^a-zA-Z0-9 ]/g, '')

  if (protocol === "https" || protocol === "http") return protocol;
}

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(async (data: User): Promise<User> => {
      const userDataIsValid = typia.validate<User>(data).success
      if (!userDataIsValid) throw new Error("class.AuthInterceptor user data invalid")

      const at = await this.jwtService.createAccessToken(data)
      if (!at) throw new Error("class.AuthInterceptor no access token")

      const res = context.switchToHttp().getResponse() as Response
      const req = context.switchToHttp().getRequest() as Request
      const protocol = getProtocol(req)

      if (protocol === "http") {
        res.cookie(AUTH_MODULE_CONSTANTS.ACCESS_TOKEN_KEY, at, { httpOnly: true })
      }

      if (protocol === "https") {
        res.cookie(AUTH_MODULE_CONSTANTS.ACCESS_TOKEN_KEY, at, { httpOnly: true, sameSite: "none", secure: true, })
      }

      return data
    }))
  }
}


