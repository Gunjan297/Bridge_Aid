import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { SCHEMES_API_END_POINT } from "@/utils/constants";

const PostScheme = () => {
    const [input, setInput] = useState({
      title: "",
      description: "",
      details: "",
      eligibility: "",
      applicationProcess: "",
      documentsRequired: "",
      location: "",
      type: "",
      category: "",
      subCategory: "",
      applyLink: "",
      organizationId:"",
    });
    const navigate = useNavigate();

    const {allOrg} = useSelector(store=>store.org)
    const [loading,setLoading] =useState(false);

    const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };
    const selectChangeHandler = (value)=>{
        const selectedOrg = allOrg.find((org)=>
            org?.name.toLowerCase() === value
        )
        setInput({...input, organizationId:selectedOrg._id});
    }

    const submitHandler = async (e)=>{
        e.preventDefault()
        try {
            setLoading(true);
            const res= await axios.post(`${SCHEMES_API_END_POINT}/post`,input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true,
            })

            if(res.data.success){
                toast.success(res.data.message)
                navigate("/admin/schemes");
            }

        } 
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
            onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Brief Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Details</Label>
              <Input
                type="text"
                name="details"
                value={input.details}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Eligibility</Label>
              <Input
                type="text"
                name="eligibility"
                value={input.eligibility}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Application Process</Label>
              <Input
                type="text"
                name="applicationProcess"
                value={input.applicationProcess}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Documents Required</Label>
              <Input
                type="text"
                name="documentsRequired"
                value={input.documentsRequired}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Type</Label>
              <select
                name="type"
                value={input.type}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 w-full border border-input bg-transparent px-3 py-2 text-sm shadow-sm rounded-md"
              >
                <option value="">Select Type</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="NGO">NGO</option>
              </select>
            </div>
            <div>
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                value={input.category}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Sub Category</Label>
              <Input
                type="text"
                name="subCategory"
                value={input.subCategory}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Apply Link(for govt schemes)</Label>
              <Input
                type="text"
                name="applyLink"
                value={input.applyLink}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              Organization Name
              {allOrg.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {allOrg.map((org) => {
                        return (
                          <SelectItem value={org?.name?.toLowerCase()}>
                            {org?.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Post New Scheme
            </Button>
          )}
          {allOrg.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *Please register an organization first, before posting a scheme
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostScheme