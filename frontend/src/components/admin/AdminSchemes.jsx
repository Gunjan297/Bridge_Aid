import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminSchemesTable from "./AdminSchemesTable";
import useGetAllAdminSchemes from "@/hooks/useGetAllAdminSchemes";
import { setSearchSchemeByText } from "@/redux/schemeSlice";

const AdminSchemes = () => {
  useGetAllAdminSchemes();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // taking input for filter
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchSchemeByText(input));
  }, [input]);

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

          <Button onClick={() => navigate("/admin/schemes/create")}>
            New Scheme
          </Button>
        </div>

        {/* all the schemes that this user(I) have registered */}
        <AdminSchemesTable />
      </div>
    </div>
  )
}
export default AdminSchemes;


