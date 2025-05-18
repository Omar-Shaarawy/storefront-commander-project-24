
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const handleNavigate = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-brand-dark">ShopVista</Link>
          
          <nav className="hidden md:flex ml-6 space-x-4">
            <Link to="/" className="nav-link">Home</Link>
            {isAdmin && (
              <>
                <Link to="/admin" className="nav-link">Admin</Link>
                <Link to="/admin/categories" className="nav-link">Categories</Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full relative h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="space-x-2">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Log In
              </Button>
              <Button onClick={() => navigate("/register")}>
                Register
              </Button>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Button variant="ghost" onClick={toggleMobileMenu} size="icon">
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-full shadow-md animate-in slide-in-from-top z-20">
          <div className="container py-4 space-y-3">
            <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("/")}>
              Home
            </Button>
            
            {isAdmin && (
              <>
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("/admin")}>
                  Admin
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("/admin/categories")}>
                  Categories
                </Button>
              </>
            )}
            
            <div className="border-t pt-2 mt-2">
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("/dashboard")}>
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600" onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}>
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigate("/login")}>
                    Log In
                  </Button>
                  <Button className="w-full" onClick={() => handleNavigate("/register")}>
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
