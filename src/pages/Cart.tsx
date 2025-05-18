
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate("/");
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16 flex flex-col items-center justify-center">
          <div className="text-center max-w-md">
            <div className="mb-6 flex justify-center">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button 
              className="bg-brand hover:bg-brand-dark"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </div>
        </main>
        
        <footer className="border-t py-6 bg-gray-50">
          <div className="container text-center text-sm text-gray-500">
            <p>&copy; 2025 ShopVista. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.product.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="w-full sm:w-24 h-24 bg-gray-50 flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <CardContent className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between p-4">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-brand-dark font-bold">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-500 hover:text-red-600"
              >
                Clear Cart
              </Button>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({totalItems})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-brand hover:bg-brand-dark"
                  disabled={isProcessing}
                  onClick={handleCheckout}
                >
                  {isProcessing ? "Processing..." : "Checkout"}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 bg-gray-50">
        <div className="container text-center text-sm text-gray-500">
          <p>&copy; 2025 ShopVista. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
