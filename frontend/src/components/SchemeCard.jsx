import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router-dom";

const SchemeCard = ({ scheme }) => {
  const navigate = useNavigate()
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {scheme?.createdAt?.split("T")[0]}

          {/*.split("T") splits the string
          into an array */}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={scheme?.organization?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{scheme?.organization?.name}</h1>
          <p className="text-sm text-gray-500">{scheme?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{scheme?.title}</h1>
        <p className="text-sm text-gray-600">{scheme?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {scheme?.type}
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {scheme?.category}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {scheme?.subCategory}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/details/${scheme?._id}`)}
        >
          Details
        </Button>
        <Button className="bg-green-500">Save For Later</Button>
      </div>
    </div>
  );
};


export default SchemeCard;
