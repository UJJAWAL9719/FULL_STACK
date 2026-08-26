function CheckoutForm({ cartItems, onOrderPlaced }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onOrderPlaced();
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <div className="checkout-summary">
        <h3>Order Summary</h3>

        {cartItems.map((item) => (
          <div className="summary-item" key={item.id}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <h3 className="checkout-total">Total: ₹{total}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          required
        />

        <textarea
          placeholder="Delivery Address"
          rows="4"
          required
        ></textarea>

        <select required defaultValue="">
          <option value="" disabled>
            Select Payment Method
          </option>
          <option value="cod">Cash on Delivery</option>
          <option value="upi">UPI</option>
          <option value="card">Credit / Debit Card</option>
        </select>

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;