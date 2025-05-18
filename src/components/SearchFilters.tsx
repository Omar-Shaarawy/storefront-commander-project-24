
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/contexts/ProductContext";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

const SearchFilters = ({
  onSearch,
  onCategoryChange,
  onSortChange,
}: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { categories } = useProducts();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="w-full bg-white shadow rounded-lg p-4 mb-6">
      <form onSubmit={handleSearchSubmit} className="md:flex gap-4 space-y-3 md:space-y-0">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <Select onValueChange={onCategoryChange} defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={onSortChange} defaultValue="newest">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="priceAsc">Price: Low to High</SelectItem>
              <SelectItem value="priceDesc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="bg-brand hover:bg-brand-dark">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
