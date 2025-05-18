
import { useState, useEffect } from "react";
import { Product } from "@/lib/mockData";
import { toast } from "@/components/ui/use-toast";
import ProductBasicFields from "./ProductBasicFields";
import ProductDescriptionField from "./ProductDescriptionField";
import TagInput from "./TagInput";
import ProductFormActions from "./ProductFormActions";

interface AdminProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, "id" | "createdAt">, imageFile?: File | null) => void;
  onCancel: () => void;
}

const defaultProduct = {
  name: "",
  price: 0,
  description: "",
  rating: 5,
  image: "",
  category: "",
  tags: [],
};

const AdminProductForm = ({
  product,
  onSubmit,
  onCancel,
}: AdminProductFormProps) => {
  const [formData, setFormData] = useState(product || defaultProduct);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(defaultProduct);
    }
  }, [product]);

  const handleFieldChange = (fieldName: string, value: string | number) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleDescriptionChange = (description: string) => {
    setFormData({ ...formData, description });
  };

  const handleCategoryChange = (category: string) => {
    setFormData({ ...formData, category });
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData({ ...formData, tags });
  };

  const handleImageFileChange = (file: File | null) => {
    setImageFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.description.trim()) {
      toast({
        title: "خطأ في التحقق",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }
    
    // Check if we have either an image URL or an uploaded file
    if (!formData.image && !imageFile) {
      toast({
        title: "خطأ في التحقق",
        description: "يرجى إضافة صورة للمنتج",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.category) {
      toast({
        title: "خطأ في التحقق",
        description: "يرجى اختيار فئة للمنتج",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData, imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? "تعديل المنتج" : "إضافة منتج جديد"}
      </h2>
      
      <ProductBasicFields 
        name={formData.name}
        price={formData.price}
        rating={formData.rating}
        category={formData.category}
        image={formData.image}
        onFieldChange={handleFieldChange}
        onCategoryChange={handleCategoryChange}
        onImageFileChange={handleImageFileChange}
        imageFile={imageFile}
      />
      
      <ProductDescriptionField
        description={formData.description}
        onDescriptionChange={handleDescriptionChange}
      />
      
      <TagInput 
        tags={formData.tags}
        onTagsChange={handleTagsChange}
      />
      
      <ProductFormActions 
        isEditing={isEditing} 
        onCancel={onCancel} 
      />
    </form>
  );
};

export default AdminProductForm;
