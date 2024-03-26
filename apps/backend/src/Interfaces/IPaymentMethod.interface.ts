import PaymentMethod from "../Entities/PaymentMethod";

interface IPaymentMethodService {
    AddPaymentMethod(paymentMethod: PaymentMethod): PaymentMethod;
    GetPaymentMethodById(id: number): PaymentMethod;
    GetPaymentMethodByName(name: string): PaymentMethod;
    GetAllPaymentMethods(): PaymentMethod[];
}

export default IPaymentMethodService;