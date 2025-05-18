
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProducts } from "@/contexts/ProductContext";
import { FolderPlus, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import CategoryForm from "@/components/admin/forms/CategoryForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CategoryManagement = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { categories, addCategory } = useProducts();
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleAddCategory = (name: string, imageFile: File) => {
    addCategory(name, imageFile);
    setIsAddingCategory(false);
  };

  const handleDeleteCategory = (id: string) => {
    const categoryToDelete = categories.find(cat => cat.id === id);
    if (!categoryToDelete) return;
    
    const { categories: currentCategories, setCategories } = useProducts();
    const updatedCategories = currentCategories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    
    // Revoke the object URL to free memory
    if (categoryToDelete.imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(categoryToDelete.imageUrl);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null; // Will be redirected by the useEffect
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Category Management</h1>
        {!isAddingCategory && (
          <Button 
            onClick={() => setIsAddingCategory(true)}
            className="bg-brand hover:bg-brand-dark"
          >
            <FolderPlus className="mr-2" size={18} />
            Add New Category
          </Button>
        )}
      </div>
      
      {isAddingCategory && (
        <div className="mb-6 animate-fade-in">
          <CategoryForm
            onSubmit={handleAddCategory}
            onCancel={() => setIsAddingCategory(false)}
          />
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <FolderPlus className="mx-auto mb-4 text-gray-300" size={48} />
              <p className="text-lg text-gray-500">No categories yet</p>
              <p className="text-sm text-gray-400 mb-4">
                Add categories to organize your products
              </p>
              <Button 
                onClick={() => setIsAddingCategory(true)}
                className="bg-brand hover:bg-brand-dark"
              >
                Add Your First Category
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div 
                  key={category.id} 
                  className="border rounded-lg overflow-hidden flex flex-col"
                >
                  <div className="h-40 overflow-hidden bg-gray-100">
                    <img 
                      src={category.imageUrl} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <h3 className="font-medium">{category.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default CategoryManagement;
