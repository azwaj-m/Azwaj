import React from 'react';

const VerifiedBadge = ({ status }) => {
  if (status !== 'verified') return null;

  return (
    <span className="inline-flex items-center justify-center w-4 h-4 mr-1 text-white bg-blue-500 rounded-full" title="تصدیق شدہ یوزر">
      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
};

export default VerifiedBadge;
