
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProductDescriptionFieldProps {
  description: string;
  onDescriptionChange: (description: string) => void;
}

const ProductDescriptionField: React.FC<ProductDescriptionFieldProps> = ({
  description,
  onDescriptionChange,
}) => {
  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="description">الوصف</Label>
      <Textarea
        id="description"
        name="description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="وصف المنتج"
        rows={3}
        required
        className="text-right"
      />
    </div>
  );
};

export default ProductDescriptionField;
