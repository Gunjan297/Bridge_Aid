import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllapplicants } from "@/redux/applicationSlice";


const Applicants = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const { applicants } = useSelector((store) => store.application);
    console.log(applicants);
    //fetching all the applicants for given scheme
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                  `${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true}
                );
                if(res.data.success){
                    dispatch(setAllapplicants(res.data.scheme.applications)
                ) // in backend, application controller is returning scheme which matches with schemeId and this scheme is populated with applications
                }
            } 
            catch (error) {
                console.log(error)
            }
        }
        fetchAllApplicants();
    }, [])
    
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicants