import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, MoreHorizontal, X } from "lucide-react";
 import { useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"]
const ApplicantsTable = () => {

    const { applicants } = useSelector((store) => store.application);

    const statusHandler = async (status, applicationId)=>{
      try {
        const res =  await axios.post(`${APPLICATION_API_END_POINT}/status/${applicationId}/update`, {status}, {withCredentials:true})

        if(res.data.success){
          toast.success(res.data.message)
        }
      } 
      catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
  return (
    <div>
      <Table>
        <TableCaption>List of applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Documents</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Income</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.documents ? (
                    <a
                      className="text-blue-600 cursor-pointer"
                      href={item?.applicant?.profile?.documents}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.documentsOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.profile?.age ? (
                    item?.applicant?.profile?.age
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.profile?.gender ? (
                    item?.applicant?.profile?.gender
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.profile?.income ? (
                    item?.applicant?.profile?.income
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {item?.applicant?.profile?.location ? (
                    item?.applicant?.profile?.location
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="float-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className={`flex w-fit items-center my-2 cursor-pointer px-2 py-1 rounded 
                              ${
                                status === "Accepted"
                                  ? "bg-green-300 hover:bg-green-400"
                                  : status === "Rejected"
                                  ? "bg-red-300 hover:bg-red-400"
                                  : "bg-gray-200"
                              }`}
                          >
                            {status === "Accepted" && (
                              <>
                                <Check className="w-4 h-4 text-green-700" />
                                <span>Accept</span>
                              </>
                            )}

                            {status === "Rejected" && (
                              <>
                                <X className="w-4 h-4 text-red-700" />
                                <span>Reject</span>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
