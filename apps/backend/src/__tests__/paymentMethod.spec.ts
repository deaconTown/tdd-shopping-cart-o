import PaymentMethodService from "../Services/paymentMethod.service";
import PaymentMethod from "../Entities/PaymentMethod";
import IPaymentMethodService from "../Interfaces/IPaymentMethod.interface";

describe('PaymentMethod', () => {

    // let paymentMethod: PaymentMethod;
    let paymentMethodService: IPaymentMethodService;

    beforeEach(() => {
        // paymentMethod = new PaymentMethod();
        paymentMethodService = new PaymentMethodService();

    });


    it('should add a new payment method', () => {
        // arrange
        let newPaymentMethod: PaymentMethod = { id: 1, name: 'cash' };

        // act

        var sut = paymentMethodService.AddPaymentMethod(newPaymentMethod);

        var result = sut.name;

        // assert
        expect(result).toEqual('cash');
    });


    it('should get all payment methods', () => {
        // arrange
        let newPaymentMethod: PaymentMethod = { id: 1, name: 'cash' };
        let newPaymentMethod2: PaymentMethod = { id: 2, name: 'credit card' };
        let newPaymentMethod3: PaymentMethod = { id: 3, name: 'lynk' };

        // act

        paymentMethodService.AddPaymentMethod(newPaymentMethod);
        paymentMethodService.AddPaymentMethod(newPaymentMethod2);
        paymentMethodService.AddPaymentMethod(newPaymentMethod3);

        var sut = paymentMethodService.GetAllPaymentMethods();
        var result = sut.length;

        // assert
        expect(result).toEqual(3);
    });


    it('should get payment method by id', () => {
        // arrange
        let newPaymentMethod: PaymentMethod = { id: 1, name: 'cash' };
        let newPaymentMethod2: PaymentMethod = { id: 2, name: 'credit card' };
        let newPaymentMethod3: PaymentMethod = { id: 3, name: 'lynk' };

        // act

        paymentMethodService.AddPaymentMethod(newPaymentMethod);
        paymentMethodService.AddPaymentMethod(newPaymentMethod2);
        paymentMethodService.AddPaymentMethod(newPaymentMethod3);

        var sut = paymentMethodService.GetPaymentMethodById(3);
        var result = sut.name;

        // assert
        expect(result).toEqual('lynk');
    });


    it('should get payment method by name', () => {
        // arrange
        let newPaymentMethod: PaymentMethod = { id: 1, name: 'cash' };
        let newPaymentMethod2: PaymentMethod = { id: 2, name: 'credit card' };
        let newPaymentMethod3: PaymentMethod = { id: 3, name: 'lynk' };

        // act

        paymentMethodService.AddPaymentMethod(newPaymentMethod);
        paymentMethodService.AddPaymentMethod(newPaymentMethod2);
        paymentMethodService.AddPaymentMethod(newPaymentMethod3);

        var sut = paymentMethodService.GetPaymentMethodByName('credit card');
        var result = sut.id;

        // assert
        expect(result).toEqual(2);
    });

});