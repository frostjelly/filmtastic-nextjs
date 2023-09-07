`use client`;
import { GrNext, GrPrevious } from "react-icons/gr";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { useState } from "react";

const Pagination = ({ fetchApi, pageRef, totalResults }) => {
  let storedPageNumber = localStorage.getItem("pageNumber");
  let storedTotalResults = localStorage.getItem("totalResults");

  const handleFirstClick = async e => {
    pageRef.current = 1;
    await fetchApi(pageRef.current);
  };

  const handlePreviousClick = async e => {
    pageRef.current = --pageRef.current;

    console.log("pageReg.current = ", pageRef.current);

    await fetchApi(pageRef.current);

    // handleSearchClick(e);
  };
  const handleNextClick = async e => {
    pageRef.current = ++pageRef.current;

    console.log("pageReg.current = ", pageRef.current);

    await fetchApi(pageRef.current);

    // await handleSearchClick(e);
  };

  const handleLastClick = async e => {
    pageRef.current = Math.ceil(storedTotalResults / 10);

    console.log("pageReg.current = ", pageRef.current);

    await fetchApi(pageRef.current);

    // await handleSearchClick(e);
  };

  useState(() => {
    storedPageNumber = localStorage.getItem("pageNumber");
    storedTotalResults = localStorage.getItem("totalResults");
  }, []);

  console.log(pageRef.current);

  return (
    <>
      <div className="flex justify-center items-center text-lg space-x-2 my-4">
        {/* {totalResults} */}
        {/* {pageNumber} */}
        <div
          className={`${
            pageRef.current === 1 && "invisible"
          }  rounded-full border hover:bg-black hover:bg-opacity-10 rounded-ful hover:cursor-pointer`}
          onClick={e => handleFirstClick(e)}
        >
          <LuChevronFirst className="text-xl m-2" />
        </div>
        <div
          className={`${
            pageRef.current === 1 && "invisible"
          }  rounded-full border hover:bg-black hover:bg-opacity-10 rounded-ful hover:cursor-pointer`}
          onClick={e => handlePreviousClick(e)}
        >
          <GrPrevious className="text-xl m-2" />
        </div>
        <h1>{`${pageRef.current} of ${Math.ceil(totalResults / 10)} pages`}</h1>
        {/* {totalResults} */}
        <div
          className={`${
            pageRef.current === Math.ceil(totalResults / 10) && "invisible"
          } rounded-full border  hover:bg-black hover:bg-opacity-10 rounded-ful hover:cursor-pointer`}
          onClick={e => handleNextClick(e)}
        >
          <GrNext className="text-xl m-2" />
        </div>
        <div
          className={`${
            pageRef.current === Math.ceil(totalResults / 10) && "invisible"
          } rounded-full border  hover:bg-black hover:bg-opacity-10 rounded-ful hover:cursor-pointer`}
          onClick={e => handleLastClick(e)}
        >
          <LuChevronLast className="text-xl m-2" />
        </div>
      </div>
    </>
  );
};

export default Pagination;
