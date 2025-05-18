
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
    name: "سلسلة ذهبية فاخرة",
    price: 199.99,
    description: "سلسلة ذهبية فاخرة مصنوعة من أجود أنواع المعادن، تتميز بتصميم أنيق وعصري يناسب مختلف الإطلالات.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1599643444514-298aa105115f?q=80&w=2670&auto=format&fit=crop",
    category: "سلاسل",
    tags: ["سلسلة", "ذهبية", "فاخرة"],
    createdAt: "2024-05-10T12:00:00Z",
  },
  {
    id: "2",
    name: "أقراط لؤلؤ أنيقة",
    price: 149.99,
    description: "أقراط مرصعة باللؤلؤ الطبيعي، تضيف لمسة من الأناقة والفخامة لإطلالتك اليومية والمناسبات.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1687284915098-2935607eaffc?q=80&w=2670&auto=format&fit=crop",
    category: "حلقان",
    tags: ["أقراط", "لؤلؤ", "فخمة"],
    createdAt: "2024-05-09T10:30:00Z",
  },
  {
    id: "3",
    name: "خاتم ألماس مميز",
    price: 299.99,
    description: "خاتم مرصّع بالألماس الفاخر، يتميز بتصميمه العصري والأنيق المناسب للمناسبات الخاصة.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2670&auto=format&fit=crop",
    category: "خواتم",
    tags: ["خاتم", "ألماس", "مميز"],
    createdAt: "2024-05-08T15:45:00Z",
  },
  {
    id: "4",
    name: "سوار فضي مزخرف",
    price: 129.99,
    description: "سوار فضي مزخرف بنقوش عربية أصيلة، مصنوع يدويًا من الفضة الخالصة لإطلالة متميزة.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1611591321451-a225f25d3864?q=80&w=2670&auto=format&fit=crop",
    category: "أساور",
    tags: ["سوار", "فضي", "مزخرف"],
    createdAt: "2024-05-07T09:15:00Z",
  },
  {
    id: "5",
    name: "طوق شعر مزين بالكريستال",
    price: 79.99,
    description: "طوق شعر فاخر مزين بالكريستال اللامع، يضفي لمسة من الأناقة والتألق على تسريحة شعرك.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1589736793547-375827a08192?q=80&w=2574&auto=format&fit=crop",
    category: "إكسسوارات شعر",
    tags: ["طوق شعر", "كريستال", "أنيق"],
    createdAt: "2024-05-06T14:20:00Z",
  },
  {
    id: "6",
    name: "خلخال فضي بتصميم عصري",
    price: 89.99,
    description: "خلخال فضي بتصميم عصري وأنيق، مناسب للإطلالات اليومية والمناسبات الخاصة.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2574&auto=format&fit=crop",
    category: "خلخال",
    tags: ["خلخال", "فضي", "عصري"],
    createdAt: "2024-05-05T11:50:00Z",
  },
  {
    id: "7",
    name: "تاج شعر للمناسبات",
    price: 199.99,
    description: "تاج شعر مرصع بالأحجار الكريمة، مثالي للعروس ومناسبات الزفاف والحفلات المميزة.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1611120333757-c96d0e9a1ecb?q=80&w=2670&auto=format&fit=crop",
    category: "إكسسوارات شعر",
    tags: ["تاج", "عروس", "مناسبات"],
    createdAt: "2024-05-04T16:30:00Z",
  },
  {
    id: "8",
    name: "سلسلة القدم بالخرز الملون",
    price: 59.99,
    description: "سلسلة قدم مزينة بالخرز الملون، خفيفة ومريحة وتضيف لمسة من الجمال والأناقة.",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=2670&auto=format&fit=crop",
    category: "خلخال",
    tags: ["سلسلة قدم", "خرز", "ملون"],
    createdAt: "2024-05-03T08:45:00Z",
  }
];

export const categories = [
  { id: "all", name: "جميع الفئات" },
  { id: "سلاسل", name: "سلاسل" },
  { id: "أساور", name: "أساور" },
  { id: "خواتم", name: "خواتم" },
  { id: "حلقان", name: "حلقان" },
  { id: "خلخال", name: "خلخال" },
  { id: "إكسسوارات شعر", name: "إكسسوارات شعر" },
];
