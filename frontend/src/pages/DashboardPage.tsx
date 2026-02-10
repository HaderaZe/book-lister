import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK_STATS } from '../graphql/queries';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { AiOutlineBook, AiOutlineStar, AiOutlineBarChart } from 'react-icons/ai';

export const DashboardPage: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(GET_BOOK_STATS);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} onRetry={() => refetch()} />;

  const stats = data?.bookStats;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 mb-1">Total Books</p>
              <h3 className="text-4xl font-bold">{stats.totalBooks}</h3>
            </div>
            <AiOutlineBook className="w-16 h-16 text-primary-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-400 to-yellow-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 mb-1">Average Rating</p>
              <h3 className="text-4xl font-bold">{stats.averageRating.toFixed(1)}</h3>
            </div>
            <AiOutlineStar className="w-16 h-16 text-yellow-200" />
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 mb-1">Genres</p>
              <h3 className="text-4xl font-bold">{stats.genreDistribution.length}</h3>
            </div>
            <AiOutlineBarChart className="w-16 h-16 text-green-200" />
          </div>
        </div>
      </div>

      {/* Genre Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Books by Genre</h2>
          <div className="space-y-3">
            {stats.genreDistribution.map((item: any) => {
              const percentage = (item.count / stats.totalBooks) * 100;
              return (
                <div key={item.genre}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.genre}</span>
                    <span className="text-sm text-gray-600">{item.count} books</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Books Per Year */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Publication Years</h2>
          <div className="space-y-3">
            {stats.booksPerYear.map((item: any) => (
              <div
                key={item.year}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium text-gray-700">{item.year}</span>
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {item.count} books
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};