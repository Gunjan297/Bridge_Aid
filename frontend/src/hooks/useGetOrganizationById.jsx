import { setSingleOrg } from '@/redux/orgSlice';
import { ORGANIZATION_API_END_POINT } from '@/utils/constants';

import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetOrganizationById = (orgId) => {
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchSingleOrganization = async () => {
        try {
          const res = await axios.get(
            `${ORGANIZATION_API_END_POINT}/get/${orgId}`,
            { withCredentials: true }
          );
          //console.log(res.data.organization);
          if (res.data.success) {
            dispatch(setSingleOrg(res.data.organization));
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSingleOrganization();
    }, [orgId, dispatch]);
}

export default useGetOrganizationById