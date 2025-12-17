import React from "react";
import GalleryHead from "../Component/Gallery/GalleryHead";
import GalleryFilter from "../Component/Section/GalleryFilter";
import { useQuery } from "@tanstack/react-query";

import { fetchGallery } from "../../utils/fetchData";

const Gallery = () => {
  // Fetch API data using useQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["galleryData"],
    queryFn: fetchGallery
  });
console.log(data?.data.data,"is the data")
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error loading gallery data</p>;

  // Pass down the actual array to child component
  const galleryItems = data?.data.data || [];

  return (
    <div className="w-[85%] mt-[100px] mx-auto">
      <GalleryHead />
      <GalleryFilter galleryData={galleryItems} />
    </div>
  );
};

export default Gallery;
