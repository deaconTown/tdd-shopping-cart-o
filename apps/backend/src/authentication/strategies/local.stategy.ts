import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import AuthenticationService from "../../Services/authentication.service";
import { authLoginDTO } from "../../DTO/authLogin.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
    constructor(private authenticationService: AuthenticationService) {
        super();
    }

    async validate(username: string ,password: string): Promise<any> {
        console.log('LocalStrategy || entered validate method')
        const user = await this.authenticationService.ValidateLogin({username, password});
        console.log('user', user)
        if (!user) {
            console.log('LocalStrategy || exiting validate method')
            throw new UnauthorizedException();
        }
        console.log('LocalStrategy || exiting validate method')
        return user;
    }
}