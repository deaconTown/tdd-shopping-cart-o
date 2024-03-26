import { authLoginDTO } from "../DTO/authLogin.dto";
import { User } from "../Entities/User";
import IAuthenticationService from "../Interfaces/IAuthenticationService.interface";
import IUserService from "../Interfaces/IUserService.interface";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import UserService from "./user.service";

@Injectable()
class AuthenticationService implements IAuthenticationService {

    constructor(private userService: UserService) { }

    ValidateLogin(login: authLoginDTO) {

        console.log(`entered ValidateLogin method`);

        let loginValid = true;

        const user: User = this.userService.GetUserByEmail(login.username);

        if (user === null || user === undefined) {
            console.log(`No user found`);
            console.log(`exiting ValidateLogin method`);
            throw new UnauthorizedException('account not found');
        }


        if (user.isActive === false) {
            console.log(`user is inactive`);
            console.log(`exiting ValidateLogin method`);
            throw new UnauthorizedException('User inactive')
        }

        if (user.email && user.email.trim().toLowerCase() !== login.username.trim().toLowerCase()) {
            console.log(`no account found with email ${login.username}`);
            console.log(`exiting ValidateLogin method`);
            throw new UnauthorizedException(`no user found with email ${login.username}`)
        }

        // TODO: CREATE A METHOD TO HASH AND AND UNHASH WHEN NEEDED

        if (user.password && user.password.trim().toLowerCase() !== login.password.trim().toLowerCase()) {
            console.log(`exiting ValidateLogin method`);
            console.log(`username or password invalid`);
            throw new UnauthorizedException(`username or password invalid`)
        }

        console.log(`exiting ValidateLogin method`);
        return user; //SEEMS LIKE DEAD CODE
    }

}

export default AuthenticationService;