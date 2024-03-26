import { Module } from '@nestjs/common';
import UserService from '../Services/user.service';

@Module({
    imports:[],
    controllers:[],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule {}
