
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
  categories: {id: string, name: string, imageUrl: string}[];
  setCategories: React.Dispatch<React.SetStateAction<{id: string, name: string, imageUrl: string}[]>>;
  addCategory: (name: string, imageFile: File) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage if available, otherwise use initial products
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem('shopvista-products');
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  // Load categories from localStorage
  const [categories, setCategories] = useState<{id: string, name: string, imageUrl: string}[]>(() => {
    const storedCategories = localStorage.getItem('shopvista-categories');
    return storedCategories ? JSON.parse(storedCategories) : [];
  });

  // Save products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shopvista-products', JSON.stringify(products));
  }, [products]);
  
  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shopvista-categories', JSON.stringify(categories));
  }, [categories]);

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
    const productToDelete = products.find(p => p.id === id);
    
    if (!productToDelete) {
      return;
    }
    
    const productName = productToDelete.name || "Product";
    
    // If the image is a blob URL, revoke it to free memory
    if (productToDelete.image.startsWith('blob:')) {
      URL.revokeObjectURL(productToDelete.image);
    }
    
    setProducts(products.filter((product) => product.id !== id));
    
    toast({
      title: "Product deleted",
      description: `"${productName}" has been removed successfully`,
    });
  };
  
  const addCategory = (name: string, imageFile: File) => {
    // Create object URL for storing the image
    const imageUrl = URL.createObjectURL(imageFile);
    
    const newCategory = {
      id: `cat_${Date.now()}`,
      name,
      imageUrl
    };
    
    setCategories([...categories, newCategory]);
    
    toast({
      title: "Category added",
      description: `"${name}" has been added successfully`,
    });
  };

  // Effect to update filtered products when products change
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    filteredProducts,
    setFilteredProducts,
    categories,
    setCategories,
    addCategory
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
