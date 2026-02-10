import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks($page: Int, $limit: Int, $filter: BookFilterInput) {
    books(page: $page, limit: $limit, filter: $filter) {
      books {
        id
        title
        author
        publishedYear
        genre
        rating
        coverImage
        description
      }
      total
      page
      totalPages
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      isbn
      publishedYear
      genre
      description
      coverImage
      rating
      totalPages
      language
      publisher
      createdAt
      updatedAt
    }
  }
`;

export const SEARCH_BOOKS = gql`
  query SearchBooks($query: String!, $limit: Int) {
    searchBooks(query: $query, limit: $limit) {
      id
      title
      author
      publishedYear
      genre
      rating
      coverImage
    }
  }
`;

export const GET_BOOK_STATS = gql`
  query GetBookStats {
    bookStats {
      totalBooks
      averageRating
      genreDistribution {
        genre
        count
      }
      booksPerYear {
        year
        count
      }
    }
  }
`;

export const GET_GENRES = gql`
  query GetGenres {
    genres
  }
`;