import { Address } from "./Address";
import PaymentMethod from "./PaymentMethod";

export class User {
    id: number;
    username: string;
    email: string;
    isActive: boolean;
    password: string;
    roles?: string[] = [];
    addresses?: Address[] = [];
    paymentMethods?: PaymentMethod[] = [];

    /**
     *
     */
    constructor() {

    }
}