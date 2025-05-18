
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";
import { Star, ShoppingCart, Minus, Plus, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ProductDetail = () => {
  const { productId } = useParams();
  const { products } = useProducts();
  const { addItem, checkoutViaWhatsApp } = useCart();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
            <p className="mb-6">المنتج الذي تبحثين عنه غير موجود.</p>
            <Button onClick={() => navigate("/")}>العودة للرئيسية</Button>
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
  
  const handleBuyNow = () => {
    addItem(product, quantity);
    checkoutViaWhatsApp();
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            العودة &larr;
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
              <p className="text-2xl font-bold text-brand-dark">{product.price.toFixed(2)} ريال</p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">الوصف</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {product.tags && product.tags.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">الكلمات المفتاحية</h2>
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
                <h2 className="text-lg font-semibold mb-2">الكمية</h2>
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
              
              <div className="flex flex-col space-y-2">
                <Button 
                  className="w-full bg-brand hover:bg-brand-dark"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="ml-2" size={18} />
                  إضافة إلى السلة
                </Button>
                
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                  onClick={handleBuyNow}
                >
                  <ShoppingBag className="ml-2" size={18} />
                  شراء الآن عبر واتساب
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 bg-gray-50">
        <div className="container text-center text-sm text-gray-500">
          <p>جميع الحقوق محفوظة © 2025 ياقوت للإكسسوارات</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
