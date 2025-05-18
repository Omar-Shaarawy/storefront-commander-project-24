
import React, { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";

interface ProductBasicFieldsProps {
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  onFieldChange: (fieldName: string, value: string | number) => void;
  onCategoryChange: (category: string) => void;
  onImageFileChange?: (file: File | null) => void;
  imageFile?: File | null;
}

const ProductBasicFields: React.FC<ProductBasicFieldsProps> = ({
  name,
  price,
  rating,
  category,
  image,
  onFieldChange,
  onCategoryChange,
  onImageFileChange,
  imageFile,
}) => {
  const { categories } = useProducts();
  const [imagePreview, setImagePreview] = useState<string | null>(
    image && !imageFile ? image : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update image preview whenever the image or imageFile props change
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else if (image && !imageFile) {
      setImagePreview(image);
    }
  }, [image, imageFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    
    if (name === "price" || name === "rating") {
      parsedValue = parseFloat(value) || 0;
    }
    
    onFieldChange(name, parsedValue);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        // Update image URL field with placeholder to indicate file upload
        onFieldChange("image", "file-upload");
      };
      reader.readAsDataURL(file);
      
      if (onImageFileChange) {
        onImageFileChange(file);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview(null);
    onFieldChange("image", "");
    if (onImageFileChange) {
      onImageFileChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">اسم المنتج</Label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="اسم المنتج"
          required
          className="text-right"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">السعر</Label>
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
          className="text-right"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">الفئة</Label>
        <Select 
          name="category"
          value={category} 
          onValueChange={onCategoryChange}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="اختر الفئة" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="rating">التقييم (1-5)</Label>
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
          className="text-right"
        />
      </div>
      
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="productImage">صورة المنتج</Label>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          id="productImage"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {imagePreview ? (
          <div className="relative w-full h-64 border rounded-md overflow-hidden">
            <img 
              src={imagePreview} 
              alt="معاينة المنتج" 
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div
            onClick={triggerFileInput}
            className="border-2 border-dashed rounded-md p-8 cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <Upload size={32} className="mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 text-center">
              انقر لرفع صورة المنتج
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG، JPG، GIF حتى 5MB</p>
          </div>
        )}
        
        <p className="text-xs text-gray-500 mt-1">
          قم برفع صورة من جهازك أو أدخل رابط الصورة أدناه.
        </p>
        
        {/* Keep the URL input for backwards compatibility and external images */}
        <Input
          id="image"
          name="image"
          value={image && image !== "file-upload" ? image : ""}
          onChange={handleChange}
          placeholder="أو أدخل رابط الصورة (https://...)"
          className="mt-2 text-right"
          disabled={!!imagePreview && image === "file-upload"}
        />
      </div>
    </div>
  );
};

export default ProductBasicFields;
