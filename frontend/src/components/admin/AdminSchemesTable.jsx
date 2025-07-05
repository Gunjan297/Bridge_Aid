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
            <TableRow key={scheme._id}>
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
                      onClick={() => navigate(`/admin/scheme/${scheme._id}`)}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminSchemesTable;



