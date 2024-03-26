import IUserService from "../Interfaces/IUserService.interface";
import { User } from "../Entities/User";
import UserService from "../Services/user.service";
import IAddressService from "../Interfaces/IAddressService";
import { Test, TestingModule } from "@nestjs/testing";
import AddressService from "../Services/address.service";
import { Address } from "../Entities/Address";


describe('Users', () => {
    let user: User;
    let userService: IUserService;
    let addressService: IAddressService;

    beforeEach(async () => {
        user = new User();
        userService = new UserService();

        const module: TestingModule = await Test.createTestingModule({
            providers: [AddressService]
        }).compile();

        addressService = module.get<IAddressService>(AddressService);
        // userService = new UserService(addressService);

    });

    it('should get all users', () => {
        let newUsers: User[] = [
            {
                id: 1,
                username: 'Jane',
                isActive: false,
                email: 'Jane@email.com',
                password: ''
            },
            {
                id: 2,
                username: 'Henry',
                isActive: false,
                email: 'Henry@email.com',
                password: ''
            }
        ]

        //act
        userService.AddUser(newUsers[0]);
        userService.AddUser(newUsers[1]);

        let result = userService.GetUsers();

        //assert
        expect(result.length).toEqual(2);
    });

    it('should add a new user', () => {
        //arrange

        let newUsers: User =
        {
            id: 45,
            username: 'Jane',
            email: 'Jane@email.com',
            isActive: false,
            password: ''
        };

        //act
        userService.AddUser(newUsers);

        let result = userService.GetUserById(newUsers.id);

        //assert
        expect(result.username).toEqual('Jane')
    });

    it('should get user by id', () => {
        //arrange

        let newUsers: User =
        {
            id: 45,
            username: 'Jane',
            email: 'Jane@email.com',
            isActive: false,
            password: ''
        };

        //act
        userService.AddUser(newUsers);

        let result = userService.GetUserById(newUsers.id);

        //assert
        expect(result.username).toEqual('Jane')
    });

    it('should make user inActive', () => {
        //arrange
        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            email: 'Jane@email.com',
            isActive: false,
            password: ''
        };

        //act
        userService.AddUser(newUsers);
        userService.DeactivateUser(newUsers.id);

        let result = userService.GetUserById(newUsers.id);

        //assert
        expect(result.isActive).toEqual(false);
    });

    it('should make user active', () => {
        //arrange
        let newUsers: User =
        {
            id: 1,
            username: 'Jane',
            email: 'Jane@email.com',
            isActive: false,
            password: ''
        };

        //act
        userService.AddUser(newUsers);
        userService.ActivateUser(newUsers.id);

        let result = userService.GetUserById(newUsers.id);

        //assert
        expect(result.isActive).toEqual(true);
    });

    // it('should get all addresses for a specific user', () => {
    //     // arrange
    //     let newAddress: Address = {
    //         id: 1,
    //         userId: 1,
    //         street: "street 1",
    //         city: "city 1",
    //         country: "Jamaica"
    //     };
    //     let newAddress2: Address = {
    //         id: 2,
    //         userId: 1,
    //         street: "street 2",
    //         city: "city 2",
    //         country: "Jamaica"
    //     };

    //     // act
    //     addressService.AddAddress(newAddress);
    //     addressService.AddAddress(newAddress2);

    //     // assert
    //     expect.assertions(1);
    // });

    // it('should get all payment methods for a specific user', () => {
    //     expect.assertions(1);
    // });


})