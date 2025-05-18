
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
            placeholder="ابحث عن منتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-right"
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <Select onValueChange={onCategoryChange} defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={onSortChange} defaultValue="newest">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="الترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">الأحدث أولاً</SelectItem>
              <SelectItem value="oldest">الأقدم أولاً</SelectItem>
              <SelectItem value="priceAsc">السعر: من الأقل إلى الأعلى</SelectItem>
              <SelectItem value="priceDesc">السعر: من الأعلى إلى الأقل</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="bg-brand hover:bg-brand-dark">
            بحث
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
