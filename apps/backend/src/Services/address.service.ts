import { Injectable } from "@nestjs/common";
import IAddressService from "../Interfaces/IAddressService";
import { Address } from "../Entities/Address";

@Injectable()
class AddressService implements IAddressService {

    private addresses: Address[] = [];

    GetAddresses(): Address[] {
        const response: Address[] = this.addresses; 
        return response;
    }
    GetAddressByUserId(userId: number): Address[] {
        const response: Address[] = this.addresses.filter(x=> x.userId === userId); 
        return response;
    }
    AddAddress(address: Address): Address {
        this.addresses.push(address);

        return address;
    }

}

export default AddressService;