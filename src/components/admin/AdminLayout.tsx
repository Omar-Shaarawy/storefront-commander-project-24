
import React, { ReactNode } from "react";
import Header from "@/components/Header";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        {children}
      </main>
      
      <footer className="border-t py-6 bg-gray-50">
        <div className="container text-center text-sm text-gray-500">
          <p>&copy; 2025 ShopVista. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
