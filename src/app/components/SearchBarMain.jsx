"use client";

import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import MovieList from "./MovieList";
import Pagination from "./Pagination";
import { CgSpinner } from "react-icons/cg";
import Image from "next/image";

const SearchBarMain = () => {
  const [searchInput, setSearchInput] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [movieList, setMovieList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isClient, setIsClient] = useState(false)

  let storedMovieList;
  let storedSearchResult;
  let storedPageNumber;

  if (typeof window !== "undefined") {
    storedMovieList = localStorage.getItem("movieList");
    storedSearchResult = localStorage.getItem("searchResult");
    storedPageNumber = localStorage.getItem("pageNumber");
  }

  const movieListRef = useRef(storedMovieList ? storedMovieList : null);
  const pageRef = useRef(storedPageNumber ? storedPageNumber : 1);

  const fetchApi = async currentPage => {
    const error = JSON.parse(storedMovieList);

    // console.log("error.Error =  ", error.Error);

    if (error?.Error) {
      localStorage.removeItem("searchResult");
      localStorage.removeItem("movieList");
      localStorage.removeItem("pageNumber");
      localStorage.removeItem("totalResults");
      return;
    } else {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API}&s=${storedSearchResult}&type=movie&page=${currentPage}`
      );

      movieListRef.current = data;
      setMovieList(movieListRef.current);

      localStorage.setItem("movieList", JSON.stringify(data));
      localStorage.setItem("pageNumber", JSON.stringify(pageRef.current));
      localStorage.setItem("totalResults", JSON.stringify(~~data.totalResults));
    }
  };

  const handleSearchInput = e => {
    e.preventDefault();
    e.stopPropagation();
    setSearchInput(e.target.value);
  };

  const handleSearchClick = async e => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoading && searchInput?.length > 2 && searchInput !== searchResult) {
      pageRef.current = 1;
      pageNumber !== 1 && setPageNumber(1);
      setIsLoading(true);
      setMovieList(null);

      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API}&s=${searchInput}&type=movie&page=${pageNumber}`
      );

      movieListRef.current = data;
      setMovieList(movieListRef.current);

      //* console.log(movieList?.Error);

      setSearchResult(searchInput);
      localStorage.setItem("movieList", JSON.stringify(data));
      searchInput &&
        localStorage.setItem("searchResult", JSON.stringify(searchInput));
      localStorage.setItem("pageNumber", JSON.stringify(pageRef.current));
      localStorage.setItem("totalResults", JSON.stringify(~~data.totalResults));

      setIsLoading(false);
      return;
    } else if (searchInput?.length < 3) {
      setMovieList(null);
      movieListRef.current = null;
      localStorage.removeItem("searchResult");
      localStorage.removeItem("movieList");
      localStorage.removeItem("pageNumber");
      localStorage.removeItem("totalResults");
      setSearchResult(searchInput);
      return;
    } else if (searchInput === searchResult) {
    }
  };

  useEffect(() => {
    setIsClient(true)
    if (storedSearchResult) {
      pageRef.current = storedPageNumber ? JSON.parse(storedPageNumber) : null;
    }

    storedMovieList && fetchApi(storedPageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="mx-8">
        <div className="border flex justify-between max-w-2xl w-full p-1 m-auto rounded-full relative hover:shadow-lg">
          <input
            type="text"
            className=" w-full outline-none text-xl align-middle mb-1 mx-4 "
            onChange={e => handleSearchInput(e)}
            placeholder={`Movie title: "Superman"`}
            onKeyDown={e => {
              e.key === "Enter" && handleSearchClick(e);
            }}
          />

          <button
            className="bg-black rounded-full w-12 h-[48px] sm:w-full sm:max-w-[140px] flex items-center space-x-1 hover:bg-opacity-80"
            onClick={e => handleSearchClick(e)}
          >
            {isLoading ? (
              <CgSpinner className="animate-spin text-white text-3xl mx-2  sm:ml-2" />
            ) : (
              <AiOutlineSearch className="text-white text-3xl mx-2 sm:ml-2" />
            )}
            <div className="hidden sm:flex text-white text-xl mb-1">Search</div>
          </button>
        </div>
        <div className="mt-8 mb-6 italic text-center">
          {isLoading ? (
            <CgSpinner className="mt-20 animate-spin text-7xl m-auto" />
          ) : (
            <>
              {movieList ? (
                <>
                  <h3 className="flex justify-center text-2xl font-semibold mt-4">
                    Search Results for:{" "}
                    {`${
                      storedSearchResult
                        ? storedSearchResult
                        : "${searchResult}"
                    }`}
                  </h3>
                </>
              ) : movieList !== null ? (
                <h3 className="flex justify-center text-2xl font-semibold mt-4 mb-2">
                  Sorry, not search results for: {`"${searchResult}"`}
                </h3>
              ) : (
                searchResult?.length < 3 &&
                searchResult?.length >= 0 && (
                  <h3 className="flex justify-center text-2xl font-semibold mt-4 mb-2">
                    Search results require at least 3 characters!
                  </h3>
                )
              )}
            </>
          )}
        </div>
{
  
}
        { isClient && (searchResult === null &&
        !isLoading &&
        typeof window &&
        storedMovieList === null ? (

          <Image
            className="transition-all opacity-0  absolute right-1/2 translate-x-1/2 mt-8 duration-[1s] delay-500"
            src={`/popcorn-bear.gif`}
            alt="Popcorn Bear"
            width={300}
            height={300}
            onLoadingComplete={image => image.classList.remove("opacity-0")}
          />
        ) : (
          searchResult !== null &&
          !isLoading &&
          (!movieList || movieList.Error) && (
            <div>
              <Image
                className="transition-all absolute right-1/2 translate-x-1/2 mt-2 duration-300 w-[300px] h-[300px]"
                src={`/popcorn-crazy.gif`}
                alt="Popcorn Bear"
                width={300}
                height={300}
                onLoadingComplete={image => image.classList.remove("opacity-0")}
              />
            </div>
          )
        ))}
        
      </div>
      {movieList?.totalResults !== undefined &&
        movieList?.totalResults > 10 && (
          <Pagination
            totalResults={movieList.totalResults}
            fetchApi={fetchApi}
            pageRef={pageRef}
          />
        )}
      {!isLoading && <MovieList movieListRef={movieListRef?.current?.Search} />}
    </>
  );
};

export default SearchBarMain;
