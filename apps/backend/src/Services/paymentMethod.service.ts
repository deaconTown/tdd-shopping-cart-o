import PaymentMethod from "../Entities/PaymentMethod";
import IPaymentMethodService from "../Interfaces/IPaymentMethod.interface";

class PaymentMethodService implements IPaymentMethodService {
    private paymentMethods: PaymentMethod[] = [];

    AddPaymentMethod(paymentMethod: PaymentMethod): PaymentMethod {
        this.paymentMethods.push(paymentMethod);

        return paymentMethod;
    }
    GetPaymentMethodById(id: number): PaymentMethod {
        var paymentMethod = this.paymentMethods.find(x => x.id === id);

        return paymentMethod;
    }
    GetPaymentMethodByName(name: string): PaymentMethod {
        var paymentMethod = this.paymentMethods.find(x => x.name === name);

        return paymentMethod;
    }
    GetAllPaymentMethods(): PaymentMethod[] {
        var allPaymentMethods = this.paymentMethods;

        return allPaymentMethods;
    }

}

export default PaymentMethodService;