import { Address } from "../Entities/Address";

interface IAddressService {
    GetAddresses(): Address[];
    GetAddressByUserId(userId: number): Address[];
    AddAddress(address: Address): Address;
}

export default IAddressService;

