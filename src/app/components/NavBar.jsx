import Link from "next/link";
import { FaFilm } from "react-icons/fa";

const NavBar = () => {
  return (
    <>
      <nav className="p-4">
        <div className="max-w-7xl flex justify-between m-auto">
          <Link href={`/`}>
            <div className="flex items-center space-x-2">
              <FaFilm className="text-4xl" />
              <h2 className="hidden sm:flex text-xl font-bold">Filmtastic</h2>
            </div>
          </Link>
          <div className="flex items-center space-x-4 font-medium">
            <h2 className="hover:cursor-pointer hover:underline hover:underline-offset-4">
              <Link href={`/`}>Home</Link>
            </h2>
            <Link href={`/`}>
              <h2 className="hover:cursor-pointer hover:underline hover:underline-offset-4">
                Movies
              </h2>
            </Link>
            <h2 className="py-3 px-6 bg-black text-white rounded-full hover:bg-opacity-80 hover:cursor-not-allowed ">
              Contact
            </h2>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
