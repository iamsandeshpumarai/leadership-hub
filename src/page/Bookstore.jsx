import React from "react";
import { useQuery } from "@tanstack/react-query";
import PublishedWorks from "../Component/Bookstore/PublishedWork";
import BooksSection from "../Component/Bookstore/BookSection";
import AboutAuthor from "../Component/Bookstore/AboutAuthor";

import { fetchAuthorData, fetchBooks } from "../../utils/fetchData";



const Bookstore = () => {
  const { data: books = [], isLoading, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
    initialData: [], // optional: you can put placeholder/default data here
  });
  const { data: author = [], } = useQuery({
    queryKey: ["author"],
    queryFn: fetchAuthorData,
    initialData: [], // optional: you can put placeholder/default data here
  });



  if (isLoading)
    return <div className="text-center mt-[90px]">Loading books...</div>;

  if (isError)
    return (
      <div className="text-center mt-[90px] text-red-500">
        Error: {error?.message || "Something went wrong"}
      </div>
    );

  // Prepare author data (first book's author as example)


  return (
    <div className="w-[85%] mx-auto mt-[90px]">
      <PublishedWorks />
      <BooksSection books={books} />
      <AboutAuthor authorData={author} />
    </div>
  );
};

export default Bookstore;
