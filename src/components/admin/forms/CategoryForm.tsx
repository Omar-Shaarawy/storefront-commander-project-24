
import React, { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

interface CategoryFormProps {
  onSubmit: (name: string, imageFile: File) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create URL for preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a category name",
        variant: "destructive",
      });
      return;
    }

    if (!imageFile) {
      toast({
        title: "Missing information",
        description: "Please upload a category image",
        variant: "destructive",
      });
      return;
    }

    onSubmit(name, imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Add New Category</h2>
      
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter category name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="image">Category Image</Label>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        
        {/* Image preview or upload button */}
        {previewUrl ? (
          <div className="relative w-full h-48 border rounded-md overflow-hidden">
            <img 
              src={previewUrl} 
              alt="Category preview" 
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div
            onClick={triggerFileInput}
            className="border-2 border-dashed rounded-md p-8 cursor-pointer hover:bg-gray-50 flex flex-col items-center justify-center"
          >
            <Upload size={32} className="mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 text-center">
              Click to upload an image or drag and drop
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 5MB</p>
          </div>
        )}
      </div>
      
      {/* Live preview of the category */}
      {(name || previewUrl) && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="font-medium text-sm text-gray-500 mb-2">Preview</h3>
          <div className="border rounded-lg overflow-hidden flex flex-col">
            <div className="h-32 overflow-hidden bg-gray-100">
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <Upload size={32} />
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium">
                {name || "Category Name"}
              </h3>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-brand hover:bg-brand-dark"
        >
          Add Category
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
