import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { setSearchedQuery } from "@/redux/schemeSlice";
import { useDispatch } from "react-redux";
import { ChevronDown, ChevronUp } from "lucide-react";

const filterData = [
  {
    filterType: "Type",
    array: ["Government", "Private", "NGO"],
  },
  {
    filterType: "Location",
    array: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Jammu and Kashmir",
      "Ladakh",
      "Lakshadweep",
      "Puducherry",
    ],
  },
  {
    filterType: "Category",
    array: [
      "Education & Learning",
      "Business & Entrepreneurship",
      "Banking & Insurance",
      "Health & Wellness",
      "Housing & Shelter",
      "Public Safety, Law & Justice",
      "Science, IT & Communications",
      "Environment & Rural",
      "Skills & Employment",
      "Social Welfare & Empowerment",
      "Sports & Culture",
      "Transport & Infrastructure",
      "Travel & Tourism",
      "Utility & Sanitation",
      "Women and Child",
    ],
  },
  {
    filterType: "Sub-Category",
    array: [
      "Women",
      "Children",
      "Youth",
      "Senior Citizens",
      "Persons with Disabilities",
      "Farmers",
      "Students",
      "Entrepreneurs",
      "Scheduled Castes",
      "Scheduled Tribes",
      "Other Backward Classes",
      "Minorities",
      "Transgender Persons",
      "Below Poverty Line (BPL) Families",
      "Urban Poor",
      "Rural Households",
      "Small and Marginal Farmers",
      "Artisans",
      "Self-Help Groups",
      "Widows",
      "Orphans",
      "Unemployed Individuals",
      "Startups",
      "Micro, Small and Medium Enterprises (MSMEs)",
    ],
  },
];

function FilterCard() {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [openSections, setOpenSections] = useState({});

  const handleCheckboxChange = (item) => {
    setSelectedOptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  };

  useEffect(() => {
    dispatch(setSearchedQuery(Array.from(selectedOptions)));
  }, [selectedOptions]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Schemes</h1>
      <hr className="mt-3" />

      {filterData.map((data, index) => (
        <div key={index} className="mt-4 border-b pb-2">
          <button
            onClick={() => toggleSection(data.filterType)}
            className="w-full flex justify-between items-center text-left font-semibold text-gray-800"
          >
            <span>{data.filterType}</span>
            {openSections[data.filterType] ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {openSections[data.filterType] && (
            <div className="mt-2 max-h-60 overflow-y-auto pr-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 my-2"
                  >
                    <Checkbox
                      id={itemId}
                      checked={selectedOptions.has(item)}
                      onCheckedChange={() => handleCheckboxChange(item)}
                    />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FilterCard;

