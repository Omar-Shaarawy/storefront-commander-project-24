
import React from "react";
import { Button } from "@/components/ui/button";

interface ProductFormActionsProps {
  isEditing: boolean;
  onCancel: () => void;
}

const ProductFormActions: React.FC<ProductFormActionsProps> = ({ 
  isEditing, 
  onCancel 
}) => {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" className="bg-brand hover:bg-brand-dark">
        {isEditing ? "Update Product" : "Add Product"}
      </Button>
    </div>
  );
};

export default ProductFormActions;
