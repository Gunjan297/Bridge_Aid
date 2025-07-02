import React, { useEffect, useState } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminSchemesTable = () => {
  const navigate = useNavigate();
  const { searchSchemeByText } = useSelector((store) => store.scheme);
  const { allAdminSchemes } = useSelector(store=> store.scheme);
  const [filterSchemes, setFilterSchemes] = useState(allAdminSchemes);

  useEffect(() => {
    const filteredScheme =
      allAdminSchemes.length >= 0 &&
      allAdminSchemes.filter((scheme) => {
        if (!searchSchemeByText) {
          return true;
        } //if searchOrgByText is empty then we'll return true i.e. display all the registered organizations as there's no filter applied by admin

        return (
          scheme?.title
            ?.toLowerCase()
            .includes(searchSchemeByText.toLowerCase()) ||
          scheme?.organization?.name
            ?.toLowerCase()
            .includes(searchSchemeByText.toLowerCase())
        );
      });
    setFilterSchemes(filteredScheme);
  }, [allAdminSchemes, searchSchemeByText]);

  return (
    <div>
      <Table>
        <TableCaption>List of your posted Schemes </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Organisation Name</TableHead>
            <TableHead>Scheme Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterSchemes?.map((scheme) => (
            <tr>
              <TableCell>{scheme?.organization?.name}</TableCell>
              <TableCell>{scheme?.title}</TableCell>
              <TableCell>{scheme?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(
                          `/admin/organizations/${scheme?.organization_id}`
                        )
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/schemes/${scheme._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
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

export default AdminSchemesTable;


// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Edit2, MoreHorizontal } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const AdminSchemesTable = () => {
//   const navigate = useNavigate();
//   const { allAdminSchemes } = useSelector((store) => store.scheme);
//   const { searchSchemeByText } = useSelector((store) => store.scheme);

//   const [filterSchemes, setFilterScheme] = useState([]);

// console.log("allAdminSchemes", allAdminSchemes);

//   useEffect(() => {
//     if (!Array.isArray(allAdminSchemes)) {
//       setFilterScheme([]);
//       return;
//     }

//     const filteredScheme =
//       allAdminSchemes?.length >= 0 &&
//       allAdminSchemes.filter((scheme) => {
//         if (!searchSchemeByText) {
//           return true;
//         } //if searchOrgByText is empty then we'll return true i.e. display all the registered companies as there's no filter applied by admin

//         return scheme?.title
//           ?.toLowerCase()
//           .includes(searchSchemeByText.toLowerCase());
//       });
//     setFilterScheme(filteredScheme);
//   }, [allAdminSchemes, searchSchemeByText]);

//   console.log("Filter Schemes are", filterSchemes);

//   return (
//     <div>
//       <Table>
//         <TableCaption>List of your posted Schemes</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Organization Name</TableHead>
//             <TableHead>Scheme Name</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filterSchemes?.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4}>
//                 You haven't registered any scheme yet
//               </TableCell>
//             </TableRow>
//           ) : (
//             filterSchemes?.map((scheme) => {
//               return (
//                 <TableRow key={scheme._id}>
//                   <TableCell>{scheme?.organization?.name}</TableCell>
//                   <TableCell>{scheme?.title}</TableCell>
//                   <TableCell>{scheme?.createdAt.split("T")[0]}</TableCell>
//                   <TableCell className="text-right cursor-pointer">
//                     <Popover>
//                       <PopoverTrigger>
//                         <MoreHorizontal />
//                       </PopoverTrigger>
//                       <PopoverContent className="w-32">
//                         <div
//                           onClick={() =>
//                             navigate(`/admin/organizations/${org._id}`)
//                           }
//                           className="flex items-center gap-2 w-fit cursor-pointer"
//                         >
//                           <Edit2 className="w-4" />
//                           <span>Edit</span>
//                         </div>
//                         {/* <div
//                           onClick={() =>
//                             navigate(`/admin/jobs/${job._id}/applicants`)
//                           }
//                           className="flex items-center w-fit gap-2 cursor-pointer mt-2"
//                         >
//                           <Eye className="w-4" />
//                           <span>Applicants</span>
//                         </div> */}
//                       </PopoverContent>
//                     </Popover>
//                   </TableCell>
//                 </TableRow>
//               );
//             })
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AdminSchemesTable;
