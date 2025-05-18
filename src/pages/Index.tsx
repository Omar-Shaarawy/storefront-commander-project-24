
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import ProductGrid from "@/components/ProductGrid";
import { useProducts } from "@/contexts/ProductContext";

const Index = () => {
  const { products, filteredProducts, setFilteredProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    // First filter by search and category
    let result = [...products];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    
    if (category !== "all") {
      result = result.filter((product) => product.category === category);
    }
    
    // Then sort
    switch (sort) {
      case "newest":
        result = result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result = result.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "priceAsc":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        result = result.sort((a, b) => b.price - a.price);
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, category, sort, products, setFilteredProducts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setCategory(category);
  };

  const handleSortChange = (sort: string) => {
    setSort(sort);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to ShopVista</h1>
          <p className="text-gray-600">Discover our latest products with the best quality and prices</p>
        </section>
        
        <SearchFilters
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
        />
        
        <ProductGrid products={filteredProducts} />
      </main>
      
      <footer className="border-t py-6 bg-gray-50">
        <div className="container text-center text-sm text-gray-500">
          <p>&copy; 2025 ShopVista. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
