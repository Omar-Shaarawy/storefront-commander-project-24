
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
  deleteCategory: (id: string) => void;
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
    
    // Update mock data file - for illustration purposes in a client-side only app
    const mockData = {
      products,
      categories
    };
    
    // In a real application with backend, you would save to a database
    // Here we're just simulating persistence with localStorage
    localStorage.setItem('shopvista-mockdata', JSON.stringify(mockData));
  }, [products, categories]);
  
  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shopvista-categories', JSON.stringify(categories));
    
    // Update mock data file again
    const mockData = {
      products,
      categories
    };
    localStorage.setItem('shopvista-mockdata', JSON.stringify(mockData));
  }, [categories, products]);

  const addProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    // If using blob URLs, store in localStorage to make them persistent
    if (newProduct.image.startsWith('blob:')) {
      // Store mapping between blob URL and product ID
      const imageMap = JSON.parse(localStorage.getItem('shopvista-image-map') || '{}');
      imageMap[newProduct.id] = newProduct.image;
      localStorage.setItem('shopvista-image-map', JSON.stringify(imageMap));
    }
    
    setProducts([newProduct, ...products]);
    toast({
      title: "تمت إضافة المنتج",
      description: `تم إضافة "${newProduct.name}" بنجاح`,
    });
  };

  const updateProduct = (id: string, productData: Omit<Product, "id" | "createdAt">) => {
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, ...productData }
        : product
    );
    
    // Update image mapping if it's a blob URL
    if (productData.image && productData.image.startsWith('blob:')) {
      const imageMap = JSON.parse(localStorage.getItem('shopvista-image-map') || '{}');
      imageMap[id] = productData.image;
      localStorage.setItem('shopvista-image-map', JSON.stringify(imageMap));
    }
    
    setProducts(updatedProducts);
    toast({
      title: "تم تحديث المنتج",
      description: `تم تحديث "${productData.name}" بنجاح`,
    });
  };

  const deleteProduct = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    
    if (!productToDelete) {
      return;
    }
    
    const productName = productToDelete.name || "المنتج";
    
    // If the image is a blob URL, remove it from our mapping
    if (productToDelete.image.startsWith('blob:')) {
      const imageMap = JSON.parse(localStorage.getItem('shopvista-image-map') || '{}');
      delete imageMap[id];
      localStorage.setItem('shopvista-image-map', JSON.stringify(imageMap));
    }
    
    setProducts(products.filter((product) => product.id !== id));
    
    toast({
      title: "تم حذف المنتج",
      description: `تم حذف "${productName}" بنجاح`,
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
    
    // Store the Blob URL for persistence
    const categoryImageMap = JSON.parse(localStorage.getItem('shopvista-category-image-map') || '{}');
    categoryImageMap[newCategory.id] = imageUrl;
    localStorage.setItem('shopvista-category-image-map', JSON.stringify(categoryImageMap));
    
    setCategories([...categories, newCategory]);
    
    toast({
      title: "تمت إضافة الفئة",
      description: `تم إضافة "${name}" بنجاح`,
    });
  };
  
  const deleteCategory = (id: string) => {
    const categoryToDelete = categories.find(cat => cat.id === id);
    
    if (!categoryToDelete) return;
    
    // Remove from our image mapping
    const categoryImageMap = JSON.parse(localStorage.getItem('shopvista-category-image-map') || '{}');
    delete categoryImageMap[id];
    localStorage.setItem('shopvista-category-image-map', JSON.stringify(categoryImageMap));
    
    setCategories(categories.filter(cat => cat.id !== id));
    
    toast({
      title: "تم حذف الفئة",
      description: `تم حذف "${categoryToDelete.name}" بنجاح`,
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
    addCategory,
    deleteCategory
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
