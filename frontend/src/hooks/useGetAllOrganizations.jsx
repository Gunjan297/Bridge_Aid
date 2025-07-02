import { useEffect } from "react";
import { ORGANIZATION_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllOrg } from "@/redux/orgSlice";

function useGetAllOrganizations() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllOrganizations = async () => {
      try {
        const res = await axios.get(`${ORGANIZATION_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllOrg(res.data.organizations));
          console.log("All the organizations: ",res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrganizations();
  }, []);
}

export default useGetAllOrganizations;
