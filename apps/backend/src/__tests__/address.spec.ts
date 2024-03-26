import AddressService from "../Services/address.service";
import IAddressService from "../Interfaces/IAddressService";
import { Address } from "../Entities/Address";

describe('Address', () => {
    let address: Address;
    let addressService: IAddressService;

    beforeEach(async () => {
        address = new Address();
        addressService = new AddressService();
    });

    it('should add new address', () => {

        let newAddress: Address = {
            id: 1,
            userId: 1,
            street: "street 1",
            city: "city 1",
            country: "Jamaica"
        };
        //act
        var sut = addressService.AddAddress(newAddress);

        let result: string = sut.street;
        //assert
        expect(result).toEqual("street 1");
    });

    it('should get all addresses', () => {
        let newAddress: Address = {
            id: 1,
            userId: 1,
            street: "street 1",
            city: "city 1",
            country: "Jamaica"
        };
        let newAddress2: Address = {
            id: 1,
            userId: 1,
            street: "street 2",
            city: "city 2",
            country: "Jamaica"
        };
        //act
        addressService.AddAddress(newAddress);
        addressService.AddAddress(newAddress2);

        var sut = addressService.GetAddresses();

        let result = sut.length;
        //assert
        expect(result).toEqual(2);

    });

    it('should get all addresses by user id', () => {

        let newAddress: Address = {
            id: 1,
            userId: 2,
            street: "street 1",
            city: "city 1",
            country: "Jamaica"
        };
        let newAddress2: Address = {
            id: 2,
            userId: 1,
            street: "street 2",
            city: "city 2",
            country: "Jamaica"
        };
        let newAddress3: Address = {
            id: 2,
            userId: 1,
            street: "street 3",
            city: "city 3",
            country: "Jamaica"
        };
        let newAddress4: Address = {
            id: 2,
            userId: 1,
            street: "street 4",
            city: "city 4",
            country: "Jamaica"
        };
        //act
        addressService.AddAddress(newAddress);
        addressService.AddAddress(newAddress2);
        addressService.AddAddress(newAddress3);
        addressService.AddAddress(newAddress4);

        var sut = addressService.GetAddressByUserId(1);

        let result = sut.length;
        //assert
        expect(result).toEqual(3);
    });
});