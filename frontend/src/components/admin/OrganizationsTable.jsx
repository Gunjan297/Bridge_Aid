import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const OrganizationsTable = () => {
  const navigate =  useNavigate()
  const {allOrg} = useSelector(store=>store.org)
  const { searchOrgByText } = useSelector((store) => store.org);

  const [filterOrg, setFilterOrg] = useState(allOrg);

  useEffect(() => {
    const filteredOrg = allOrg?.length >= 0 && allOrg.filter((org)=>{
      if (!searchOrgByText) {
        return true;
      } //if searchOrgByText is empty then we'll return true i.e. display all the registered companies as there's no filter applied by admin

      return org?.name?.toLowerCase().includes(searchOrgByText.toLowerCase());
    })
    setFilterOrg(filteredOrg);
  }, [allOrg, searchOrgByText]);
  
  return (
    <div>
      <Table>
        <TableCaption>List of your registered Organizations</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterOrg?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                You haven't registered any organization yet
              </TableCell>
            </TableRow>
          ) : (
            filterOrg?.map((org) => {
              return (
                <TableRow key={org._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={org?.logo} />
                    </Avatar>
                  </TableCell>
                  <TableCell> {org?.name} </TableCell>
                  <TableCell>{org?.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div
                          onClick={() =>
                            navigate(`/admin/organizations/${org._id}`)
                          }
                          className="flex items-center gap-2 w-fit cursor-pointer"
                        >
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrganizationsTable