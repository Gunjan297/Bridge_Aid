import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import SchemeCard from './SchemeCard';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/schemeSlice';
import useGetAllSchemes from '@/hooks/useGetAllSchemes';

function Browse() {
    useGetAllSchemes();
    const {allSchemes} = useSelector((store) => store.scheme);
    const dispatch = useDispatch();

// When the Browse page goes away, clear the search.This effect:
// This useEffect Does nothing when the component mounts.
// But when the component unmounts, it sets the query back to empty ("").
    useEffect (()=>{
      return ()=>{
        dispatch(setSearchedQuery(""))
      }
    },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allSchemes.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {allSchemes.map((scheme) => {
            return <SchemeCard key={scheme._id} scheme={scheme} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Browse