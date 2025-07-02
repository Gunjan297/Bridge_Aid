import React from 'react'
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

function LatestSchemeCard({scheme}) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/details/${scheme?._id}`)} className="p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white border border-gray-200 cursor-pointer">
      <div>
        <h1 className="font-semibold text-gray-800 text-base">
          {scheme?.organization?.name}
        </h1>
        <p className="text-xs text-gray-500">{scheme?.location}</p>
      </div>
      <div className="mt-2">
        <h1 className="font-bold text-xl text-gray-900 mb-1">
          {scheme?.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {scheme?.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-semibold px-3 py-1 rounded-full bg-blue-50">
          {scheme?.type}
        </Badge>
        <Badge className="text-[#F83002] font-semibold px-3 py-1 rounded-full bg-red-50">
          {scheme?.category}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold px-3 py-1 rounded-full bg-purple-50">
          {scheme?.subCategory}
        </Badge>
      </div>
    </div>
  );
}

export default LatestSchemeCard