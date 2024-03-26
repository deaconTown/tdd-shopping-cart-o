import { Injectable } from "@nestjs/common";
import { User } from "../Entities/User";
import IUserService from "../Interfaces/IUserService.interface";

@Injectable()
class UserService implements IUserService {
    private users: User[] = [{id: 1, username: "user1", email: "email@email.com", isActive: true, password:"password123"}];

    GetUsers(): User[] {
        return this.users;
    }

    GetUserById(userId: number): User {

        return this.users.find(x => x.id == userId);
    }

    AddUser(user: User) {
        this.users.push(user);

        return user;
    }

    ActivateUser(userId: number) {
        var user: User = this.GetUserById(userId);

        user.isActive = true;

        //find the index of the user to update
        let foundIndex = this.users.findIndex(x => x.id == userId);

        //update the user based on the index found
        this.users[foundIndex] = user;
    }

    DeactivateUser(userId: number) {
        var user: User = this.GetUserById(userId);

        user.isActive = false;

        //find the index of the user to update
        let foundIndex = this.users.findIndex(x => x.id == userId);

        //update the user based on the index found
        this.users[foundIndex] = user;
    }

    GetUserByUsername(username: string): User {
        throw new Error("Method not implemented.");
    }
    
    GetUserByEmail(email: string): User {
        console.log('entered the GetUserByEmail method')
        return this.users.find(x => x.email.toLowerCase() == email.toLowerCase());
        console.log('exiting the GetUserByEmail method')
    }

}

export default UserService;