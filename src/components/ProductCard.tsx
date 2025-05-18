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
    <div className="product-card hover-scale cursor-pointer" onClick={handleViewDetails}>
      <img
        src={image}
        alt={name}
        className="product-card-image"
      />
      <div className="product-card-body">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium">{name}</h3>
          <p className="font-bold text-brand-dark">${price.toFixed(2)}</p>
        </div>
        <div className="star-rating mb-2">{renderStars(rating)}</div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">{description}</p>
        <button className="w-full rounded-md bg-brand py-2 text-white hover:bg-brand-dark transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
