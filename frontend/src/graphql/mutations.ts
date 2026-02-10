import { gql } from '@apollo/client';

export const CREATE_BOOK = gql`
  mutation CreateBook($input: BookInput!) {
    createBook(input: $input) {
      id
      title
      author
      publishedYear
      genre
      rating
      coverImage
      description
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $input: UpdateBookInput!) {
    updateBook(id: $id, input: $input) {
      id
      title
      author
      publishedYear
      genre
      rating
      coverImage
      description
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;

export const RATE_BOOK = gql`
  mutation RateBook($id: ID!, $rating: Float!) {
    rateBook(id: $id, rating: $rating) {
      id
      rating
    }
  }
`;