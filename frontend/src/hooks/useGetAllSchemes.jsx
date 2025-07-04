import { useEffect } from 'react'
import { SCHEMES_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import { setAllSchemes } from '@/redux/schemeSlice';

function useGetAllSchemes() {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.scheme)

    useEffect(() => {
      const fetchAllSchemes = async () => {
        try {
          let queryString = "";

          if (searchedQuery && searchedQuery.length > 0) {
            queryString = searchedQuery.join(",");
          }

          const res = await axios.get(
            `${SCHEMES_API_END_POINT}/get?keywords=${encodeURIComponent(
              queryString
            )}`,
            {
              withCredentials: true,
            }
          );
          if (res.data.success) {
            dispatch(setAllSchemes(res.data.schemes));
            console.log(res);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchAllSchemes();
    }, []); 
}

export default useGetAllSchemes