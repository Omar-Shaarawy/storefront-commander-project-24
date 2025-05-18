
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ProductDetail = () => {
  const { productId } = useParams();
  const { products } = useProducts();
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you are looking for does not exist.</p>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </main>
      </div>
    );
  }

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-current" size={16} />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <Star
          key="half-star"
          size={16}
          className="fill-current [mask:linear-gradient(90deg,#000_50%,transparent_50%)]"
        />
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} size={16} className="text-gray-300" />);
    }
    
    return stars;
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            &larr; Back
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden bg-white p-4 flex items-center justify-center">
            <img 
              src={product.image}
              alt={product.name}
              className="max-h-[500px] w-auto object-contain"
            />
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-600">({product.rating.toFixed(1)})</span>
              </div>
              <p className="text-2xl font-bold text-brand-dark">${product.price.toFixed(2)}</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {product.tags && product.tags.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <Card className="p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Quantity</h2>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={decrementQuantity}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={incrementQuantity}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              <Button 
                className="w-full bg-brand hover:bg-brand-dark"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2" size={18} />
                Add to Cart
              </Button>
            </Card>
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

export default ProductDetail;
