import React, { useEffect } from 'react'
import HeroSection from "@/components/HeroSection";
import Navbar from './shared/Navbar';
import CategorCaraousel from './CategorCaraousel';
import LatestScheme from "./LatestScheme";
import Footer from './shared/Footer';
import useGetAllSchemes from '@/hooks/useGetAllSchemes';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Home() {
  useGetAllSchemes();
  const {user} = useSelector(store =>store.auth)

  const navigate = useNavigate()

  useEffect(()=>{
    if (user?.role === "Organization") {
      navigate("/admin/organizations");
    }
  },[]
  )
  
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <CategorCaraousel /> // added in Hero Section*/}
      <LatestScheme />
      <Footer/>
    </div>
  );
}

export default Home

// 1.Component Mounts
// Home() runs.
// useGetAllSchemes() runs (probably fetching data).
// JSX is prepared to render.

//2. React renders the returned JSX
// At this moment, the content you returned (<Navbar>, <HeroSection>, etc.) is rendered on the page.

// 3.useEffect runs after render
// navigate('/admin/organizations') executes.
// React Router immediately changes the URL and loads the route that matches /admin/organizations.

// 4. React Router decides what component to show
// The Home component unmounts.
// The component mapped to /admin/organizations mounts and renders instead.