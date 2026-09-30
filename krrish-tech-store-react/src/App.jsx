import { useState } from "react";
import products from "./products";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const goToCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const orderPlaced = () => {
    alert("🎉 Order placed successfully!");
    setCartItems([]);
    setShowCheckout(false);
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span>⚡</span> Krrish Tech Store
        </div>

        <nav>
          <button
            className="nav-btn"
            onClick={() => {
              setShowCart(false);
              setShowCheckout(false);
            }}
          >
            Home
          </button>

          <button
            className="cart-btn"
            onClick={() => {
              setShowCart(true);
              setShowCheckout(false);
            }}
          >
            🛒 Cart ({cartCount})
          </button>
        </nav>
      </header>

      {!showCart && !showCheckout && (
        <>
          <section className="hero">
            <div>
              <p className="hero-small">WELCOME TO</p>
              <h1>Krrish Tech Store</h1>
              <p>
                Discover premium gadgets, accessories and
                technology at amazing prices.
              </p>

              <button
                className="shop-btn"
                onClick={() =>
                  document
                    .getElementById("products")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Shop Now →
              </button>
            </div>
          </section>

          <main id="products" className="products-section">
            <h2>Featured Products</h2>
            <p className="section-subtitle">
              Latest technology for your everyday needs
            </p>

            <ProductList
              products={products}
              onAddToCart={addToCart}
            />
          </main>
        </>
      )}

      {showCart && (
        <main className="page-section">
          <Cart
            cartItems={cartItems}
            onRemoveFromCart={removeFromCart}
            onCheckout={goToCheckout}
          />
        </main>
      )}

      {showCheckout && (
        <main className="page-section">
          {cartItems.length > 0 ? (
            <CheckoutForm
              cartItems={cartItems}
              onOrderPlaced={orderPlaced}
            />
          ) : (
            <div className="empty-checkout">
              <h2>Your cart is empty</h2>
              <button
                onClick={() => setShowCheckout(false)}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </main>
      )}

      <footer>
        <h3>⚡ Krrish Tech Store</h3>
        <p>Your trusted destination for modern technology.</p>
        <p>© 2026 Krrish Tech Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;