import { ICartItem, ShoppingCart } from "./Entities/ShoppingCart";

describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });



  it('should get all items from cart', () => {
    let cartItem = cart.getCartItems();
    expect(cartItem[0].name).toEqual('item 1');
  });


  // must be able to add a cart
  it('should add new items to the cart', () => {
    let cart1: ICartItem = { id: 2, name: 'item 2', qty: 1 }
    cart.addItem(cart1);

    let cartItem = cart.getCartItems();
    expect(cartItem[1].id).toEqual(2);
  });

  it('should not create a new item when item already exists in the cart', () => {
    let cart1: ICartItem = { id: 1, name: 'item 2', qty: 1 }
    cart.addItem(cart1);

    let cartItems = cart.getCartItems();

    //assert that length of cart stays the same
    expect(cartItems.length).toEqual(1);
  });

  it('should update existing item in the cart', () => {

    //add new item to cart
    let cart1: ICartItem = { id: 2, name: 'item 2', qty: 1 }
    cart.addItem(cart1);

    //attempt to add item with the same id with new property values
    cart1 = { id: 2, name: 'red shoes', qty: 1 }
    cart.addItem(cart1); //

    //add the item twice, each with same id, but different qty/name then assert that the cart item has the same id and latest change
    let cartResult = cart.getCartItemsById(2);
    expect(cartResult.name).toEqual('red shoes');
  });

  it('should return false when when cart item does not exists', () => {
    let cart1: ICartItem = { id: 2, name: 'item 2', qty: 1 }

    let cartItemExist = cart.checkExists(cart1);
    expect(cartItemExist).toEqual(false);
  });

  it('should return true when cart item does exists', () => {
    let cart1: ICartItem = { id: 2, name: 'item 2', qty: 1 }
    cart.addItem(cart1);

    let cartItemExist = cart.checkExists(cart1);
    expect(cartItemExist).toEqual(true);
  });

  it('should get cart item by id', () => {
    let cart1: ICartItem = { id: 2, name: 'item 2' }
    let cart2: ICartItem = { id: 3, name: 'red shoes' }
    cart.addItem(cart1);
    cart.addItem(cart2);

    let cartItem = cart.getCartItemsById(3);
    expect(cartItem.name).toEqual('red shoes');
  });

  //TODO: NOT SURE ABOUT THIS ONE
  it('cart item qty should only increase by 1 when qty value is not specified when adding item to cart', () => {
    let cart1: ICartItem = { id: 2, name: 'item 2' }
    cart.addItem(cart1);

    let cartItem = cart.getCartItemsById(2);

    console.log('cartItem ~~', cartItem)
    expect(cartItem.qty).toEqual(1);
  });

  it('should remove items from the cart by id', () => {
    let cart1: ICartItem = { id: 2, name: 'item 2', qty: 1 }
    let cart2: ICartItem = { id: 3, name: 'item 3', qty: 1 }
    cart.addItem(cart1);
    cart.addItem(cart2);
    cart.removeItem(1);

    let cartItem = cart.getCartItems();
    expect(cartItem[0].id).toEqual(2);

    // assert.deepEqual(cartItem[0].id, 2);
  });

  it('should remove all items in the cart', () => {

    cart.clearCart();

    let cartItems = cart.getCartItems();

    expect(cartItems.length).toEqual(0);
  });

  // total amount of unique items should increase by 1
  it('should increase cart item qty by 1', () => {

    //arrange 
    let cart1: ICartItem = { id: 2, name: 'item 2', qty: 1 }
    cart.addItem(cart1);

    //act

    let cartItem = cart.increaseCartItemQty(2, 1);

    //assert
    expect(cartItem.qty).toEqual(2);
  });

  // must be able to increase the qty of the products in the cart

  // when same item is added to the cart, the qty should increase in the cart
  it('should increase cart item qty by specified amount when already exists in cart', () => {
    let cart1: ICartItem = { id: 22, name: 'increasing', qty: 3 }
    // let cart2: ICartItem = { id: 3, name: 'item 3', qty: 1 }
    cart.addItem(cart1);
    // cart.addItem(cart2);

    let cartItem = cart.increaseCartItemQty(cart1.id, 4);

    console.log('cartItem', cartItem)

    expect(cartItem.qty).toEqual(7);

  });


  // must be able to decrease the qty of the products in the cart
  it('should decrease cart item qty by 1', () => {

    //arrange 
    let cart1: ICartItem = { id: 2, name: 'item 2', qty: 2 }
    cart.addItem(cart1);

    //act

    let cartItem = cart.decreaseCartItemQty(2);

    //assert
    expect(cartItem.qty).toEqual(1);
  });

  // items in the cart below 1 should be removed form the cart automatically
  it('should remove item from cart when qty is zero', () => {
    //arrange 
    let cart1: ICartItem = { id: 2, name: 'item 2' }
    cart.addItem(cart1);

    cart.decreaseCartItemQty(cart1.id);

    let result = cart.checkExists(cart1);

    expect(result).toEqual(false);
  });


  // (cost per item) subtotal should be calculated by the qty * unit price
  it('should return correct cost for a single item in cart', () => {
    expect.assertions(1)
  });

  it('should return correct total cost for all the items in cart', () => {
    expect.assertions(1)
  });

  // each customer should have a unique cart, one to one



  it('should update product availableAmount when added to cart', () => {
    expect.assertions(1)
  });

  it('should not be able to add an inActive product to cart', () => {
    expect.assertions(1)
  });

  it('should not be able to add an inActive catelog to cart', () => {
    expect.assertions(1)
  });




});


