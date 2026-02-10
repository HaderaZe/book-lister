// Book entity interface
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  publishedYear: number;
  genre: string;
  description?: string;
  coverImage?: string;
  rating?: number;
  totalPages?: number;
  language: string;
  publisher?: string;
  createdAt: string;
  updatedAt: string;
}

// Books response with pagination
export interface BooksResponse {
  books: Book[];
  total: number;
  page: number;
  totalPages: number;
}

// Book statistics
export interface BookStats {
  totalBooks: number;
  averageRating: number;
  genreDistribution: GenreCount[];
  booksPerYear: YearCount[];
}

export interface GenreCount {
  genre: string;
  count: number;
}

export interface YearCount {
  year: number;
  count: number;
}

// Input for creating a book
export interface BookInput {
  title: string;
  author: string;
  isbn?: string;
  publishedYear: number;
  genre: string;
  description?: string;
  coverImage?: string;
  rating?: number;
  totalPages?: number;
  language?: string;
  publisher?: string;
}

// Input for updating a book
export interface UpdateBookInput {
  title?: string;
  author?: string;
  isbn?: string;
  publishedYear?: number;
  genre?: string;
  description?: string;
  coverImage?: string;
  rating?: number;
  totalPages?: number;
  language?: string;
  publisher?: string;
}

// Filter input for querying books
export interface BookFilterInput {
  genre?: string;
  minYear?: number;
  maxYear?: number;
  minRating?: number;
  maxRating?: number;
  language?: string;
  search?: string;
}