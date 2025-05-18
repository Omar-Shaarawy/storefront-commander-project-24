
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Product } from "@/lib/mockData";
import { useProducts } from "@/contexts/ProductContext";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminProductForm from "@/components/admin/forms/AdminProductForm";
import AdminProductTable from "@/components/admin/AdminProductTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderPlus } from "lucide-react";

const Admin = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleAddProduct = (productData: Omit<Product, "id" | "createdAt">, imageFile?: File | null) => {
    // If we have an image file, create a blob URL for it
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      productData.image = imageUrl;
    }
    
    addProduct(productData);
    setIsAddingProduct(false);
  };

  const handleUpdateProduct = (productData: Omit<Product, "id" | "createdAt">, imageFile?: File | null) => {
    if (!editingProduct) return;
    
    // If we have an image file, create a blob URL for it
    if (imageFile) {
      // Revoke old object URL if it was one
      if (editingProduct.image.startsWith('blob:')) {
        URL.revokeObjectURL(editingProduct.image);
      }
      
      const imageUrl = URL.createObjectURL(imageFile);
      productData.image = imageUrl;
    }
    
    updateProduct(editingProduct.id, productData);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
  };

  if (!isAuthenticated || !isAdmin) {
    return null; // Will be redirected by the useEffect
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">لوحة إدارة المتجر</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={() => navigate("/admin/categories")}
            variant="outline"
            className="flex items-center mr-2"
          >
            <FolderPlus className="ml-2" size={18} />
            إدارة الفئات
          </Button>
          {!isAddingProduct && !editingProduct && (
            <Button 
              onClick={() => setIsAddingProduct(true)}
              className="bg-brand hover:bg-brand-dark"
            >
              إضافة منتج جديد
            </Button>
          )}
        </div>
      </div>
      
      {(isAddingProduct || editingProduct) && (
        <div className="mb-6 animate-fade-in">
          <AdminProductForm
            product={editingProduct || undefined}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onCancel={() => {
              setIsAddingProduct(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>المنتجات</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminProductTable 
            products={products}
            onEdit={setEditingProduct}
            onDelete={handleDeleteProduct}
          />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Admin;
