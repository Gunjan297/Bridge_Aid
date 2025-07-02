import React from 'react'
import Navbar from './shared/Navbar'
import SchemeCard from './SchemeCard';

function Browse() {
    const allSchemes =[1,2,3,4,5,6]
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allSchemes.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allSchemes.map((scheme) => {
            return <SchemeCard />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Browse