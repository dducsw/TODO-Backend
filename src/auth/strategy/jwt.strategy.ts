import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_KEY"),
        })
    }

    async validate(payload : any) {
        return {
            userId: payload.userId,
            firstName : payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            role: payload.role,
        }
    }
}