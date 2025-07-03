import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/schemeSlice';

const category = [
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
];
  

function CategorCaraousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const searchSchemeHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse")
    }

  return (
    <div>
      <Carousel className="w-full max-w-6xl mx-auto my-20 px-4">
        <CarouselContent className="flex gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-2/3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 flex justify-center"
            >
              <Button
                variant="outline"
                onClick = {()=> searchSchemeHandler(cat)}
                className="rounded-full px-6 py-3 text-sm md:text-base font-medium text-gray-700 hover:bg-green-100 hover:text-green-700 transition-all"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}

export default CategorCaraousel