import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import OrganizationsTable from './OrganizationsTable';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import useGetAllOrganizations from "@/hooks/useGetAllOrganizations";
import { useDispatch } from 'react-redux';
import { setSearchOrgByText } from '@/redux/orgSlice';

function Organizations() {
  //custom hook to get all the registered org
  useGetAllOrganizations();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // taking input for filter
    const[input,setInput]= useState("")
    useEffect(() => {
      dispatch(setSearchOrgByText(input));
    }, 
    [input]
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />

          <Button onClick={() => navigate("/admin/organizations/create")}>
            New Organization
          </Button>
        </div>

        {/* all the organizations that this user(I) have registered */}
        <OrganizationsTable />
      </div>
    </div>
  );
}

export default Organizations

