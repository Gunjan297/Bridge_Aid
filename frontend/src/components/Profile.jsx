import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedSchemeTable from "./AppliedSchemeTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

function Profile() {
    const [open,setOpen] = useState(false)
    const {user} = useSelector(store => store.auth)

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-sm">
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 ring-2 ring-gray-200">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-semibold text-2xl text-gray-800">
                {user?.fullname}
              </h1>
              {user?.profile?.bio ? (
                user?.profile?.bio
              ) : (
                <span className="text-gray-500">N/A</span>
              )}
            </div>
          </div>
          <Button size="icon" variant="outline" onClick={() => setOpen(true)}>
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact Details */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="h-5 w-5 text-gray-500" />
            <span className="text-sm">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="h-5 w-5 text-gray-500" />
            <span className="text-sm">{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Interests */}
        <div className="mt-6">
          <h2 className="font-medium text-gray-800 mb-2">
            Categories of Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.interests.length !== 0 ? (
              user?.profile?.interests.map((item, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-700">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="mt-6">
          <Label className="text-md font-semibold text-gray-800">
            Documents:
          </Label>{" "}
          {user?.profile?.documents ? (
            <a
              target="blank"
              href={user?.profile?.documents}
              className="block mt-1 text-blue-600 hover:underline"
            >
              {user?.profile?.documentsOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>

        {/* Age */}
        <div className="mt-6">
          <Label className="text-md font-semibold text-gray-800">Age:</Label>{" "}
          {user?.profile?.age ? (
            user?.profile?.age
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>

        {/* Gender */}
        <div className="mt-6">
          <Label className="text-md font-semibold text-gray-800">Gender:</Label>{" "}
          {user?.profile?.gender ? (
            user?.profile?.gender
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>

        {/* Income */}
        <div className="mt-6">
          <Label className="text-md font-semibold text-gray-800">Income:</Label>{" "}
          {user?.profile?.income ? (
            user?.profile?.income
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>

        {/* Location */}
        <div className="mt-6">
          <Label className="text-md font-semibold text-gray-800">
            Location:
          </Label>{" "}
          {user?.profile?.location ? (
            user?.profile?.location
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>
      </div>

      {/* Applied Schemes */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h1 className="font-bold text-lg text-gray-800 mb-4">
          Applied Schemes
        </h1>
        {/* Applied Scheme Table */}
        <AppliedSchemeTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
