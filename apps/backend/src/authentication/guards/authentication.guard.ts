import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { Observable } from "rxjs";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        console.log('AuthenticatedGuard || entered canActivate method');
        const request = context.switchToHttp().getRequest();

        console.log('AuthenticatedGuard || exiting canActivate method')
        return request.isAuthenticated();
    }

}