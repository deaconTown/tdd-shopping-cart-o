import { Module } from '@nestjs/common';
import { AuthenticationController } from '../Controllers/authentication.controller';
import AuthenticationService from '../Services/authentication.service';
import { UserModule } from '../user/user.module';
import UserService from '../Services/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStategy } from './strategies/local.stategy';
import { SessionSerializer } from './guards/session.serializer';

@Module({
    imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: 'local' })
    ],
    controllers: [AuthenticationController],
    providers: [AuthenticationService, LocalStategy, SessionSerializer]
})
export class AuthenticationModule { }
