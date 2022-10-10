// import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { AuthenticationService } from "../authentication.service";
// import { Request } from 'express';

// @Injectable()
// export class RefreshTokenStrategy  extends PassportStrategy(
//     Strategy,
//     'refresh-jwt',
// ){
//     constructor(
//       private readonly config: ConfigService,
//       private readonly authenticationService: AuthenticationService,
//     ) {
//       super({
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET_KEY'),
//         passReqToCallback: true,
//       });
//     }

//     validate(req: Request, payload: any) {
//         const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
//         console.log("payload refresh",payload);
//         return { ...payload, refreshToken };
//       }
// }