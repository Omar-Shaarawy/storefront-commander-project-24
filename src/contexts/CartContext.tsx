
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/lib/mockData';
import { toast } from '@/components/ui/use-toast';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkoutViaWhatsApp: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Get a unique user identifier or create one if it doesn't exist
const getUserId = () => {
  let userId = localStorage.getItem('shopvista-user-id');
  if (!userId) {
    userId = 'user_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
    localStorage.setItem('shopvista-user-id', userId);
  }
  return userId;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userId = getUserId();
  const storageKey = `shopvista-cart-${userId}`;

  const [items, setItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem(storageKey);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Phone number for WhatsApp checkout - replace with your actual number
  const whatsappNumber = '966500000000'; // Example: Saudi Arabia number

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  const addItem = (product: Product, quantity: number) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex > -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast({ 
          title: "تم تحديث السلة", 
          description: `تم تحديث كمية ${product.name} في السلة` 
        });
        return updatedItems;
      } else {
        toast({ 
          title: "تمت الإضافة إلى السلة", 
          description: `تم إضافة ${product.name} إلى سلة التسوق` 
        });
        return [...currentItems, { product, quantity }];
      }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems => 
      currentItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.product.id === productId);
      if (itemToRemove) {
        toast({ 
          title: "تمت إزالة المنتج", 
          description: `تم إزالة ${itemToRemove.product.name} من السلة` 
        });
      }
      return currentItems.filter(item => item.product.id !== productId);
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({ title: "تم تفريغ السلة", description: "تمت إزالة جميع المنتجات من السلة" });
  };

  const checkoutViaWhatsApp = () => {
    if (items.length === 0) {
      toast({ 
        title: "السلة فارغة", 
        description: "أضف بعض المنتجات إلى سلة التسوق أولاً", 
        variant: "destructive" 
      });
      return;
    }

    // Create order message
    let message = "*طلب جديد من متجر ياقوت*\n\n";
    message += "*تفاصيل المنتجات:*\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} - ${item.quantity} قطعة - ${(item.product.price * item.quantity).toFixed(2)} ريال\n`;
    });
    
    message += `\n*المجموع:* ${totalPrice.toFixed(2)} ريال`;
    message += "\n\n*معلومات التوصيل:*";
    message += "\nالاسم: ";
    message += "\nالعنوان: ";
    message += "\nرقم الهاتف: ";

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');
    
    toast({ 
      title: "جاري الانتقال إلى واتساب", 
      description: "سيتم فتح واتساب لإكمال الطلب" 
    });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalItems,
      totalPrice,
      checkoutViaWhatsApp
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
