
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, products as initialProducts } from '@/lib/mockData';
import { toast } from '@/components/ui/use-toast';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: string, productData: Omit<Product, "id" | "createdAt">) => void;
  deleteProduct: (id: string) => void;
  filteredProducts: Product[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage if available, otherwise use initial products
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem('shopvista-products');
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shopvista-products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setProducts([newProduct, ...products]);
    toast({
      title: "Product added",
      description: `"${newProduct.name}" has been added successfully`,
    });
  };

  const updateProduct = (id: string, productData: Omit<Product, "id" | "createdAt">) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, ...productData }
        : product
    );
    
    setProducts(updatedProducts);
    toast({
      title: "Product updated",
      description: `"${productData.name}" has been updated successfully`,
    });
  };

  const deleteProduct = (id: string) => {
    const productName = products.find(p => p.id === id)?.name || "Product";
    setProducts(products.filter((product) => product.id !== id));
    
    toast({
      title: "Product deleted",
      description: `"${productName}" has been removed successfully`,
    });
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    filteredProducts,
    setFilteredProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
