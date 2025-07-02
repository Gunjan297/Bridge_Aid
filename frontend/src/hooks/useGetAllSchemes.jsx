import { useEffect } from 'react'
import { SCHEMES_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useDispatch} from "react-redux";
import { setAllSchemes } from '@/redux/schemeSlice';

function useGetAllSchemes() {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAllSchemes = async () => {
          try {
            const res = await axios.get(`${SCHEMES_API_END_POINT}/get`, {
              withCredentials: true,
            });
            if (res.data.success) {
              dispatch(setAllSchemes(res.data.schemes));
              console.log(res)
            }
          } 
          catch (error) {
            console.log(error);
          }
        };
        fetchAllSchemes();
    },[]) 
}

export default useGetAllSchemes