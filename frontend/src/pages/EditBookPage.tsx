import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOK } from '../graphql/queries';
import { UPDATE_BOOK } from '../graphql/mutations';
import { BookForm } from '../components/BookForm';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import type { BookInput } from '../types/book';
import { AiOutlineArrowLeft } from 'react-icons/ai';

export const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading: queryLoading, error } = useQuery(GET_BOOK, {
    variables: { id },
  });

  const [updateBook, { loading: mutationLoading }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOK, variables: { id } }],
    onCompleted: () => {
      alert('Book updated successfully!');
      navigate(`/books/${id}`);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (input: BookInput) => {
    updateBook({ variables: { id, input } });
  };

  if (queryLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data?.book) return <ErrorMessage message="Book not found" />;

  const book = data.book;

  return (
    <div>
      {/* Back Button */}
      <Link
        to={`/books/${id}`}
        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
      >
        <AiOutlineArrowLeft />
        Back to Book Details
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Book</h1>
          <BookForm
            initialData={book}
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/books/${id}`)}
            isLoading={mutationLoading}
            submitLabel="Update Book"
          />
        </div>
      </div>
    </div>
  );
};