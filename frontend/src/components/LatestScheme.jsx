import React from 'react'
import LatestSchemeCard from './LatestSchemeCard';
import { useSelector } from 'react-redux';

function LatestScheme() {
  const {allSchemes} = useSelector(store=> store.scheme)

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-black-500">Latest</span> Schemes
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allSchemes.length <= 0 ? (
          <span>No Schemes Available</span>
        ) : (
          allSchemes
            ?.slice(0, 6)
            .map((scheme) => (
              <LatestSchemeCard key={scheme._id} scheme={scheme} />
            ))
        )}
      </div>
    </div>
  );
}


export default LatestScheme