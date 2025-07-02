import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link as ExternalLink, FileText, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, SCHEMES_API_END_POINT } from "@/utils/constants";
import { setSingleScheme } from "@/redux/schemeSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Details() {
    const params = useParams()
    const schemeId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { singleScheme } = useSelector(store=> store.scheme)
    const { user } = useSelector((store) => store.auth);

     const [isApplied, setIsApplied] = useState(false);
    
    const applyJobHandler = async ()=>{
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/apply/${schemeId}`,
          { withCredentials: true }
        );
        
        if(res.data.success){
          setIsApplied(true);
          dispatch(setSingleScheme(res.data.scheme));
          toast.success(res.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }

    useEffect(() => {
      const fetchSingleScheme = async () => {
        try {
          setIsApplied(false); // reset while loading
          const res = await axios.get(
            `${SCHEMES_API_END_POINT}/get/${schemeId}`,
            {
              withCredentials: true,
            }
          );
          if (res.data.success) {
            dispatch(setSingleScheme(res.data.scheme));

            setIsApplied(
              user
                ? res.data.scheme.applications.some(
                    (application) => application.applicant === user?._id
                  )
                : false
            );
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSingleScheme();
    }, [schemeId, dispatch, user?._id]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            {/* Organization */}
            <p className="text-gray-500 mt-1">
              <span className="font-medium">
                {singleScheme?.organization?.name}
              </span>
            </p>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800">
              {singleScheme?.title}
            </h1>
          </div>

          {/* Apply Section */}
          <div>
            {!user ? (
              <Button
                variant="outline"
                className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                onClick={() => navigate("/login")}
              >
                <CheckCircle className="h-4 w-4" />
                Login to Apply
              </Button>
            ) : singleScheme?.type === "Government" &&
              singleScheme?.applyLink ? (
              <a
                href={singleScheme.applyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-green-600 border-green-600 hover:bg-green-50"
                >
                  <ExternalLink className="h-4 w-4" />
                  Go to Application Page
                </Button>
              </a>
            ) : !isApplied ? (
              <Button
                variant="outline"
                className="flex items-center gap-2 text-green-600 border-green-600 hover:bg-green-50"
                onClick={applyJobHandler}
              >
                <CheckCircle className="h-4 w-4" />
                Apply Now
              </Button>
            ) : (
              <Button
                variant="outline"
                className="flex items-center gap-2 text-gray-600 border-gray-600 hover:bg-gray-50 cursor-not-allowed"
              >
                <CheckCircle className="h-4 w-4" />
                Already Applied
              </Button>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge>{singleScheme?.type}</Badge>
          <Badge>{singleScheme?.category}</Badge>
          {singleScheme?.subCategory && (
            <Badge>{singleScheme?.subCategory}</Badge>
          )}
          <Badge>{singleScheme?.location}</Badge>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Brief Description
          </h2>
          <p className="text-gray-700">{singleScheme?.description}</p>
        </div>

        {/* Details */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Details</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {singleScheme?.details}
          </p>
        </div>

        {/* Eligibility */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Eligibility
          </h2>
          {singleScheme?.eligibility && singleScheme?.eligibility.length > 0 ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {singleScheme?.eligibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Not specified</p>
          )}
        </div>

        {/* Application Process */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Application Process
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {singleScheme?.applicationProcess}
          </p>
        </div>

        {/* Documents Required */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Documents Required
          </h2>
          <p className="text-gray-700">{singleScheme?.documentsRequired}</p>
        </div>
      </div>
    </div>
  );
};


export default Details