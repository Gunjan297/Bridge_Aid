import React from 'react'
import Navbar from './shared/Navbar'
import SchemeCard from './SchemeCard'
import FilterCard from './FilterCard';
import { useSelector } from 'react-redux';


function Schemes() {
  //declared custom hook to get all schemes in Home.jsx
  const {allSchemes} = useSelector(store => store.scheme)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="ml-1 w-1/5">
            <FilterCard />
          </div>
          {allSchemes.length <= 0 ? (
            <span>Schemes not available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {allSchemes.map((scheme) => (
                  <SchemeCard key={scheme._id} scheme={scheme} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Schemes

//overflow-y-auto : a vertical scrollbar will appear automatically so the user can scroll.