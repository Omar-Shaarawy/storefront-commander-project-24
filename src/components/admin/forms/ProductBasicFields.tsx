
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/mockData";

interface ProductBasicFieldsProps {
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  onFieldChange: (fieldName: string, value: string | number) => void;
  onCategoryChange: (category: string) => void;
}

const ProductBasicFields: React.FC<ProductBasicFieldsProps> = ({
  name,
  price,
  rating,
  category,
  image,
  onFieldChange,
  onCategoryChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    
    if (name === "price" || name === "rating") {
      parsedValue = parseFloat(value) || 0;
    }
    
    onFieldChange(name, parsedValue);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Product name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select 
          name="category"
          value={category} 
          onValueChange={onCategoryChange}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.slice(1).map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="rating">Rating (1-5)</Label>
        <Input
          id="rating"
          name="rating"
          type="number"
          min="1"
          max="5"
          step="0.1"
          value={rating}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>
    </div>
  );
};

export default ProductBasicFields;
