import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS } from '../graphql/queries';
import { DELETE_BOOK, RATE_BOOK } from '../graphql/mutations';
import { BookCard } from './BookCard';
import { Loading } from './Loading';
import { ErrorMessage } from './ErrorMessage';
import type { Book, BookFilterInput } from '../types/book';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface BookListProps {
  filter?: BookFilterInput;
}

export const BookList: React.FC<BookListProps> = ({ filter }) => {
  const [page, setPage] = React.useState(1);
  const limit = 12;

  const { data, loading, error, refetch } = useQuery(GET_BOOKS, {
    variables: { page, limit, filter },
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS, variables: { page, limit, filter } }],
    onCompleted: () => {
      alert('Book deleted successfully!');
    },
    onError: (error: any) => {
      alert(`Error deleting book: ${error.message}`);
    },
  });

  const [rateBook] = useMutation(RATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS, variables: { page, limit, filter } }],
  });

  const handleDelete = (id: string) => {
    deleteBook({ variables: { id } });
  };

  const handleRate = (id: string, rating: number) => {
    rateBook({ variables: { id, rating } });
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} onRetry={() => refetch()} />;

  const books = data?.books?.books || [];
  const totalPages = data?.books?.totalPages || 1;

  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <AiOutlineLeft className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
        <p className="text-gray-500">Try adjusting your filters or add a new book</p>
      </div>
    );
  }

  return (
    <div>
      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book: Book) => (
          <BookCard
            key={book.id}
            book={book}
            onDelete={handleDelete}
            onRate={handleRate}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AiOutlineLeft />
            Previous
          </button>

          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <AiOutlineRight />
          </button>
        </div>
      )}
    </div>
  );
};