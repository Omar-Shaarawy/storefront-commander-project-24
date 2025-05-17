
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  category: string;
  tags: string[];
  createdAt: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "High-quality noise-cancelling wireless headphones with 30-hour battery life.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    category: "Electronics",
    tags: ["headphones", "wireless", "audio"],
    createdAt: "2024-05-10T12:00:00Z",
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    price: 249.99,
    description: "Comfortable ergonomic chair with lumbar support and adjustable features.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=2069&auto=format&fit=crop",
    category: "Furniture",
    tags: ["chair", "office", "ergonomic"],
    createdAt: "2024-05-09T10:30:00Z",
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    price: 129.99,
    description: "Track your fitness goals with this sleek smartwatch featuring heart rate monitoring.",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    category: "Electronics",
    tags: ["watch", "fitness", "smart"],
    createdAt: "2024-05-08T15:45:00Z",
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    description: "Soft and sustainable organic cotton t-shirt in various colors.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop",
    category: "Clothing",
    tags: ["t-shirt", "organic", "cotton"],
    createdAt: "2024-05-07T09:15:00Z",
  },
  {
    id: "5",
    name: "Professional DSLR Camera",
    price: 1299.99,
    description: "High-resolution professional camera for stunning photography.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1964&auto=format&fit=crop",
    category: "Electronics",
    tags: ["camera", "photography", "professional"],
    createdAt: "2024-05-06T14:20:00Z",
  },
  {
    id: "6",
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    description: "Eco-friendly insulated bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
    category: "Kitchen",
    tags: ["bottle", "eco-friendly", "insulated"],
    createdAt: "2024-05-05T11:50:00Z",
  },
  {
    id: "7",
    name: "Wireless Gaming Mouse",
    price: 79.99,
    description: "Precision gaming mouse with customizable RGB lighting and programmable buttons.",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1965&auto=format&fit=crop",
    category: "Electronics",
    tags: ["mouse", "gaming", "wireless"],
    createdAt: "2024-05-04T16:30:00Z",
  },
  {
    id: "8",
    name: "Premium Yoga Mat",
    price: 49.99,
    description: "Non-slip, eco-friendly yoga mat with perfect cushioning for comfort.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1592429907166-afb3d732c6af?q=80&w=1974&auto=format&fit=crop",
    category: "Sports",
    tags: ["yoga", "fitness", "mat"],
    createdAt: "2024-05-03T08:45:00Z",
  }
];

export const categories = [
  { id: "all", name: "All Categories" },
  { id: "Electronics", name: "Electronics" },
  { id: "Furniture", name: "Furniture" },
  { id: "Clothing", name: "Clothing" },
  { id: "Kitchen", name: "Kitchen" },
  { id: "Sports", name: "Sports" },
];
