import { setAllAdminSchemes } from "@/redux/schemeSlice";
import { SCHEMES_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminSchemes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminSchemes = async () => {
      try {
        const res = await axios.get(
          `${SCHEMES_API_END_POINT}/getadminschemes`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllAdminSchemes(res.data.schemes));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllAdminSchemes();
  }, []);
};

export default useGetAllAdminSchemes;

// import { useEffect } from "react";
// import { SCHEMES_API_END_POINT } from "@/utils/constants";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setAllAdminSchemes } from "@/redux/schemeSlice";

// function useGetAllAdminSchemes() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchAllAdminSchemes = async () => {
//       try {
//         const res = await axios.get(
//           `${SCHEMES_API_END_POINT}/getadminschemes`,
//           {
//             withCredentials: true,
//           }
//         );
//         console.log("res.data.schemes are: ", res.data.schemes);
//         if (res.data.success) {
//           dispatch(setAllAdminSchemes(res.data.schemes));
//           console.log(res);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchAllAdminSchemes();
//   }, []);
// }

// export default useGetAllAdminSchemes;
