import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import SchemeCard from './SchemeCard'
import FilterCard from './FilterCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { SCHEMES_API_END_POINT } from '@/utils/constants';
import { motion } from 'framer-motion'; 


function Schemes() {
  //declared custom (useGetAllSchemes) hook to get all schemes in Home.jsx

  const { allSchemes, searchedQuery } = useSelector((store) => store.scheme);

  const [filterSchemes, setFilterSchemes] = useState(allSchemes);

  useEffect(() => {
    const fetchFilteredSchemes = async () => {
      if (searchedQuery && searchedQuery.length > 0) {
        try {
          const queryString = searchedQuery.join(",");
          const res = await axios.get(
            `${SCHEMES_API_END_POINT}/get?keywords=${encodeURIComponent(
              queryString
            )}`,
            { withCredentials: true }
          );
          if (res.data.success) {
            setFilterSchemes(res.data.schemes);
            console.log(res);
          }
        } 
        catch (error) {
          console.log("Error while fetching filtered schemes",error);
        }
      } 
      else {
        setFilterSchemes(allSchemes);
      }
    };

    fetchFilteredSchemes();
  }, [allSchemes, searchedQuery]);
  
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="ml-1 w-1/5">
            <FilterCard />
          </div>
          {filterSchemes.length <= 0 ? (
            <span>Schemes not available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterSchemes.map((scheme) => (
                  <motion.div
                    key={scheme?._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SchemeCard scheme={scheme} />
                  </motion.div>
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