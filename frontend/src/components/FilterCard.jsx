import React, { useState } from 'react'
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Checkbox } from './ui/checkbox';

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

  const [selected, setSelected] = useState({});

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Schemes</h1>
      <hr className="mt-3" />

      {/* Remove this wrapper or move it inside if needed per group */}
      {fitlerData.map((data, index) => (
        <div key={index}>
          <h1 className="font-bold text-lg mt-4">{data.fitlerType}</h1>
          {data.array.map((item, idx) => {
            const itemId = `id${index}-${idx}`;
            return (
              <div key={itemId} className="flex items-center space-x-2 my-2">
                <Checkbox id={itemId} />
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