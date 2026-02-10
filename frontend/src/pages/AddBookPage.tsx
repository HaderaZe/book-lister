import { useNavigate, Link } from 'react-router-dom';
import { useMutation, ApolloError } from '@apollo/client';
import { CREATE_BOOK } from '../graphql/mutations';
import { GET_BOOKS } from '../graphql/queries';
import { BookForm } from '../components/BookForm';
import type { BookInput } from '../types/book';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const AddBookPage: React.FC = () => {
  const navigate = useNavigate();

  const [createBook, { loading }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS, variables: { page: 1, limit: 12 } }],
    onCompleted: () => {
      alert('Book added successfully!');
      navigate('/');
    },
    onError: (error: ApolloError) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (data: BookInput) => {
    createBook({ variables: { input: data } });
  };

  return (
    <div>
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
      >
        <AiOutlineArrowLeft />
        Back to Books
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Book</h1>
          <BookForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
            isLoading={loading}
            submitLabel="Add Book"
          />
        </div>
      </div>
    </div>
  );
};