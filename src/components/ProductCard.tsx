
import { Star } from "lucide-react";
import { Product } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, description, rating, image } = product;
  const navigate = useNavigate();
  
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
  
  const handleViewDetails = () => {
    navigate(`/product/${id}`);
  };
  
  return (
    <div className="product-card bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]" onClick={handleViewDetails}>
      <div className="h-52 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-lg">{name}</h3>
          <p className="font-bold text-brand-dark">{price.toFixed(2)} ريال</p>
        </div>
        <div className="flex text-yellow-400 mb-2">{renderStars(rating)}</div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">{description}</p>
        <button 
          className="w-full rounded-md bg-brand py-2 text-white hover:bg-brand-dark transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
        >
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
