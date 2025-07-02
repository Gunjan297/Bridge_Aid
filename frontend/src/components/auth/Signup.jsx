import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";

function Signup() {
    const [input, setInput] = useState({
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      file: "",
    });
    const changeEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };
    const changeFileHandler = (e) => {
      setInput({ ...input, file: e.target.files?.[0] });
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {loading} = useSelector(store => store.auth)

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
          formData.append("file", input.file);
        }
        try {
          dispatch(setLoading(true));
            const res = await axios.post(
              `${USER_API_END_POINT}/register`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true, //tells Axios to include cookies in the request
              }
            );
            console.log(res)
            if (res.data.success) {
              navigate("/login");
              toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        }
        finally {
              dispatch(setLoading(false));
        }
    }

  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <div className="flex items-center justify-center">
            <h1 className="font-bold text-2xl mb-5 text-green-500 ">SignUp</h1>
          </div>

          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              placeholder="Enter your name"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              placeholder="Enter your email"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              placeholder="Enter your phone number"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              placeholder="Enter your password"
              onChange={changeEventHandler}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="r1"
                  name="role"
                  value="Applicant"
                  className="cursor-pointer"
                  onChange={changeEventHandler}
                  checked={input.role === "Applicant"}
                />
                <Label htmlFor="r1">Applicant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="r2"
                  name="role"
                  value="Organization"
                  className="cursor-pointer"
                  onChange={changeEventHandler}
                  checked={input.role === "Organization"}
                />
                <Label htmlFor="r2">Organization</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center gap-2">
            <Label>Profile</Label>
            <Input
              accept="image/*" //what file types the input accepts
              type="file"
              className="cursor-pointer"
              onChange={changeFileHandler}
            />
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Sign Up
            </Button>
          )}

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
