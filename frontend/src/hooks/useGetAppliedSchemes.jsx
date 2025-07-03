import { setAllAppliedSchemes } from '@/redux/schemeSlice'
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAppliedSchemes = () => {
  const dispatch = useDispatch()
  return (
    useEffect(() => {
      const fetchAppliedSchemes = async () => {
        try {
          const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,
          {
          withCredentials:true
          } )

          
          if(res.data.success){
            dispatch(setAllAppliedSchemes(res.data.application));
            console.log(res.data.application);
          }
        } 
        catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
        }
      }
      fetchAppliedSchemes();
    }, [])
    
  )
}

export default useGetAppliedSchemes