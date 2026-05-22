export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
  coverImage: string;
  metaTitle: string;
  metaDescription: string;
  readingTime: number;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
}
