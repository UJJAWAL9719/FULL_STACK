function Cart({ cartItems, onRemoveFromCart, onCheckout }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>

                <button onClick={() => onRemoveFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ₹{total}</h3>
            <button onClick={onCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;