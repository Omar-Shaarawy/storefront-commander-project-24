
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { Product } from "@/lib/mockData";
import { useProducts } from "@/contexts/ProductContext";
import AdminProductForm from "@/components/AdminProductForm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const handleAddProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    addProduct(productData);
    setIsAddingProduct(false);
  };

  const handleUpdateProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    if (!editingProduct) return;
    
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          {!isAddingProduct && !editingProduct && (
            <Button 
              onClick={() => setIsAddingProduct(true)}
              className="bg-brand hover:bg-brand-dark"
            >
              Add New Product
            </Button>
          )}
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
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.rating}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProduct(product)}
                          >
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                              >
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the product "{product.name}".
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => handleDeleteProduct(product.id)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <footer className="border-t py-6 bg-gray-50">
        <div className="container text-center text-sm text-gray-500">
          <p>&copy; 2025 ShopVista. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
