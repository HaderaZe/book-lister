import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600"></div>
    </div>
  );
};