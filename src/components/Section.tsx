import React from 'react';

const Section: React.FC<{ header: string }> = ({ header, children }) => {
  return (
    <section className="flex flex-col w-full items-center justify-center">
      <div className="mt-20 bg-yellow-400 w-4 h-2" />
      <div className="mt-3 mb-10 uppercase font-bold text-sm">{header}</div>
      {children}
    </section>
  );
};

export default Section;
