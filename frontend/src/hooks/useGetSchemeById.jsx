import { setSchemeById } from "@/redux/schemeSlice";
import { SCHEMES_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSchemeById = (schemeId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleScheme = async () => {
      try {
        const res = await axios.get(
          `${SCHEMES_API_END_POINT}/get/${schemeId}`,
          {
            withCredentials: true,
          }
        );
        //console.log(res.data.organization);
        if (res.data.success) {
          dispatch(setSchemeById(res.data.scheme));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleScheme();
  }, [schemeId, dispatch]);
};

export default useGetSchemeById;
