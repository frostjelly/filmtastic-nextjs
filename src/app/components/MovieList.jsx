import Image from "next/image";
import Link from "next/link";
import { VscCalendar } from "react-icons/vsc";

const MovieList = ({ movieListRef }) => {
  const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" opacity="0.30">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 = str =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  // useEffect(() => {
  //   localStorage.getItem("movieList");
  // }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {movieListRef?.map(movie => {
        {
          /* console.log(movie); */
        }
        return (
          <Link href={`/movie/${movie.imdbID}`} key={movie.imdbID}>
            <div className="m-4 w-[180px] h-[280px] relative rounded-md overflow-hidden group shadow-lg hover:shadow-2xl hover:scale-105 duration-75 group">
              <Image
                src={
                  movie?.Poster !== "N/A" ? movie?.Poster : "/image/dummy.png"
                }
                fill="true"
                sizes="185px, 280px"
                // width={180}
                // height={240}
                alt={`${movie.Title} movie poster`}
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(140, 220)
                )}`}
                className="object-cover w-full shadow-md relative"
              />
              {movie.Poster === "N/A" && (
                <h2 className="w-full text-center absolute top-1/5 translate-y-1/2 z-10 text-white font-semibold underline underline-offset-2">
                  Missing Poster
                </h2>
              )}
              <div
                className={`${
                  movie.Poster !== "N/A" ? "hidden" : "flex flex-col"
                } absolute bg-black bg-opacity-70 text-white group-hover:flex group-hover:flex-col justify-center items-center w-[180px] h-[280px] text-lg font-semibold text-center p-1`}
              >
                <h2 className="font-bold underline underline-offset-4">
                  {movie.Title}
                </h2>
                <div className="flex items-center space-x-2">
                  <VscCalendar />
                  <h2>{movie.Year}</h2>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default MovieList;
