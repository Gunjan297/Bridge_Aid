import React, { useState } from "react";
import { Label } from "../ui/label";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { ORGANIZATION_API_END_POINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { setSingleOrg } from "@/redux/orgSlice";

const OrganizationCreate = () => {
  const navigate = useNavigate();
  const dispath = useDispatch()
  const [orgName, setOrgName] = useState("");

  const regiterNewOrg = async () => {
    try {
      const res = await axios.post(
        `${ORGANIZATION_API_END_POINT}/register`,
        { orgName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if(res?.data?.success){
        dispath(setSingleOrg(res.data.organization))
        toast.success(res.data.message);
        const orgId = res?.data?.organization?._id;
        navigate(`/admin/organizations/${orgId}`);
      }
    } 
    catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4">
        <div className="my-12 space-y-2">
          <h1 className="font-bold text-3xl">Your Organization Name</h1>
          <p className="text-gray-600">
            What name would you like to give your organization? You can change
            this later.

          </p>
        </div>

        <div className="mb-8">
          <Label>Organization Name</Label>
          <Input
            type="text"
            className="mt-2"
            placeholder="Enter the organization name"
            onChange={(e) => setOrgName(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 mb-12">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/organizations")}
          >
            Cancel
          </Button>
          <Button onClick={regiterNewOrg}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationCreate;