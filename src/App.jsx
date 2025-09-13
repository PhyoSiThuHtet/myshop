import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    fetch("https://your-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product) => setCart([...cart, product]);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const checkout = () => setShowPayment(true);

  const processPayment = async () => {
    alert("Payment Successful! 🎉");
    setCart([]);
    setShowPayment(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Products</h1>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <Card key={product._id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart */}
      <h2 className="text-2xl font-semibold mb-4">🛍️ Shopping Cart</h2>
      <Card className="mb-6">
        <CardContent>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <p>{item.name}</p>
                <div className="flex items-center gap-3">
                  <p>${item.price.toFixed(2)}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {cart.length > 0 && (
        <Button className="bg-blue-600" onClick={checkout}>
          Checkout
        </Button>
      )}

      {/* Payment Form */}
      {showPayment && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>💳 Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              placeholder="CVC"
              className="w-full p-2 border rounded mb-3"
            />
            <Button className="bg-green-600 w-full" onClick={processPayment}>
              Pay Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default App;
