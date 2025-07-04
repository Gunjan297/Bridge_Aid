import React, { useEffect, useState } from 'react'
import { Label } from "./ui/label";
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { setSearchedQuery } from '@/redux/schemeSlice';
import { useDispatch } from 'react-redux';

const fitlerData = [
  {
    fitlerType: "Type",
    array: ["Government", "Private", "NGO"],
  },
  {
    fitlerType: "Location",
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
    fitlerType: "Category",
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
    fitlerType: "Sub-Category",
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

  // Use a Set to avoid duplicates
  const [selectedOptions, setSelectedOptions] = useState(new Set());

  // Toggle selection when checkbox changes
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

  useEffect(()=>{
    dispatch(setSearchedQuery(Array.from(selectedOptions)))
  },[selectedOptions])

  // const applyFilters = () => {
  //   dispatch(setSearchedQuery(Array.from(selectedOptions)));
  // };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <div>
        <h1 className="font-bold text-lg">Filter Schemes</h1>
        {/* <Button
          onClick={applyFilters}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white"
        >
          Apply Filters
        </Button> */}
      </div>
      <hr className="mt-3" />

      {fitlerData.map((data, index) => (
        <div key={index}>
          <h1 className="font-bold text-lg mt-4">{data.fitlerType}</h1>
          {data.array.map((item, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div key={itemId} className="flex items-center space-x-2 my-2">
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
      ))}
    </div>
  );
}

export default FilterCard