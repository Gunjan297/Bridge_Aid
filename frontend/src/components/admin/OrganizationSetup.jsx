import { ORGANIZATION_API_END_POINT } from '@/utils/constants';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import axios from 'axios';
import useGetOrganizationById from '@/hooks/useGetOrganizationById';

const OrganizationSetup = () => {
  const params = useParams();

  //calling custom hook to get org by Id
  useGetOrganizationById(params.id);

    const navigate = useNavigate()
    const { singleOrg } = useSelector((store) => store.org);
    const [loading,setLoading] = useState(false);
    

    const [input, setInput] = useState({
      name: "",
      description: "",
      website: "",
      location: "",
      file:null,
    });

    useEffect(()=>{
        setInput({
          name: singleOrg.name || "",
          description: singleOrg.description || "",
          website: singleOrg.website || "",
          location: singleOrg.location || "",
          file: singleOrg.logo || "",
        });

    },[singleOrg])

    const changeEventHandler = (e)=>{
        setInput({...input, [e.target.name]:e.target.value})
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]
      setInput({ ...input, file});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("name",input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            //console.log(input)
            const res = await axios.put(
              `${ORGANIZATION_API_END_POINT}/update/${params.id}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
              }
            );

            if(res.data.success){
                toast.success(res.data.message)
                navigate("/admin/organizations")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.resonse.data.message)
        }
        finally{
            setLoading(false)
        }
    }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/organizations")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Organization Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Organization Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default OrganizationSetup