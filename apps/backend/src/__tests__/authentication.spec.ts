import { Test, TestingModule } from "@nestjs/testing";
import IAuthenticationService from "../Interfaces/IAuthenticationService.interface";
import { authLoginDTO } from "../DTO/authLogin.dto";
import AuthenticationService from "../Services/authentication.service";
import { User } from "../Entities/User";
import UserService from "../Services/user.service";
import IUserService from "../Interfaces/IUserService.interface";

describe('Authentication', () => {
    let auth: authLoginDTO;
    let user: User;
    let userService: IUserService;
    let authService: IAuthenticationService;

    beforeEach(async () => {
        auth = new authLoginDTO();
        user = new User();

        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService]
        }).compile();

        userService = module.get<IUserService>(UserService);

        authService = new AuthenticationService(userService);
    });

    it('should login valid user', () => {

        // arrange

        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            email: 'Jane@email.com',
            isActive: true,
            password: 'testPasswordHash'
        };

        jest.spyOn(userService, 'AddUser')
            .mockImplementationOnce(() => newUsers)

        jest.spyOn(userService, 'GetUserByEmail')
            .mockImplementationOnce(() => newUsers)

        auth.username = 'Jane@email.com';
        auth.password = 'testPasswordHash';

        // act
        // var sut = authService.ValidateLogin(auth);

        // assert
        var result = expect(() => authService.ValidateLogin(auth)).not.toThrowError();

    });

    it('should not login inactive user', () => {

        // arrange

        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            email: 'Jane@email.com',
            isActive: false,
            password: 'testPasswordHash'
        };

        jest.spyOn(userService, 'AddUser')
            .mockImplementationOnce(() => newUsers)

        jest.spyOn(userService, 'GetUserByEmail')
            .mockImplementationOnce(() => newUsers)

        auth.username = 'Jane@email.com';
        auth.password = 'testPasswordHash';

        // act
        // var sut = authService.ValidateLogin(auth);

        // assert
        var result = expect(() => authService.ValidateLogin(auth)).toThrowError('User inactive');
    });


    it("should not login user when email don't match", () => {

        // arrange

        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            email: 'joker@email.com',
            isActive: true,
            password: 'testPasswordHash'
        };

        jest.spyOn(userService, 'AddUser')
            .mockImplementationOnce(() => newUsers)

        jest.spyOn(userService, 'GetUserByEmail')
            .mockImplementationOnce(() => newUsers)

        auth.username = 'Jane@email.com';
        auth.password = 'testPasswordHash';

        // act
        // var sut = authService.ValidateLogin(auth);

        // assert
        var result = expect(() => authService.ValidateLogin(auth)).toThrowError(`no user found with email ${auth.username}`);
    });


})