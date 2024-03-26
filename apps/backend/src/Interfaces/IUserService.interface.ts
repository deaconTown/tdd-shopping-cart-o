import { User } from "src/Entities/User";

interface IUserService {
    GetUsers(): User[];
    GetUserById(userId: number): User;
    GetUserByUsername(username: string): User;
    GetUserByEmail(email: string): User;
    AddUser(user: User): User;
    ActivateUser(userId: number);
    DeactivateUser(userId: number);
}

export default IUserService;

