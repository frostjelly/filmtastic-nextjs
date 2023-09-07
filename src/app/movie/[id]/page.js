import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import RecommendedMovies from "../../components/RecommendedMovies";

const MovieIdPage = async ({ params }) => {
  const fetchMovie = async () => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API}&i=${params.id}&plot=full`
    );
    return res.json();
  };
  const movie = await fetchMovie();

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

  const listToBubbleRenderer = list => {
    const arr = list.split(", ");
    const html = arr.map(word => {
      return (
        <div
          key={uuidv4()}
          className="my-1 py-2 px-4 rounded-full w-fit bg-black text-white font"
        >
          <p>{word}</p>
        </div>
      );
    });
    return html;
  };

  return (
    <>
      <div className="m-2">
        <div className="flex flex-col sm:flex-row items-center sm:place-items-start">
          <div></div>
          <div className="relative m-4 t w-[185px] h-[280px] sm:min-w-[280px] sm:h-[440px] rounded-md overflow-hidden shadow-lg hover:shadow-xl">
            <Image
              src={movie?.Poster !== "N/A" ? movie?.Poster : "/image/dummy.png"}
              fill="true"
              sizes="280px, 440px"
              alt={`${movie.Title} movie poster`}
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(280, 480)
              )}`}
              className="object-cover shadow-md "
            />
            {movie.Poster === "N/A" && (
              <h2 className="w-full text-center absolute top-1/2 -translate-y-1/2 z-10 text-white font-semibold underline underline-offset-2">
                Missing Poster
              </h2>
            )}
          </div>
          <div className="flex flex-col w-full p-2">
            <div className="flex self-center text-center sm:text-start sm:self-start  space-x-2">
              <h2 className="text-3xl sm:text-4xl font-bold">{movie?.Title}</h2>
            </div>
            {movie?.Rated && (
              <span className="my-4 flex justify-center  sm:justify-start">
                <div className="mt-1 sm:mt-1 flex justify-center items-center sm:self-start bg-black p-1 w-fit h-fit rounded-xl">
                  <span className="flex whitespace-nowrap justify-center items-center sm:self-start px-1 text-lg font-bold min-w-[48px] h-fit  border-2 bg-black text-white rounded-lg">
                    {movie?.Rated}
                  </span>
                </div>
              </span>
            )}

            <div className="flex justify-center sm:flex-col">
              <div className="sm:flex sm:justify-between">
                <div className="">
                  <h2>
                    <span className="font-semibold">Director</span>:{" "}
                    {movie?.Director}
                  </h2>
                  <h2>
                    <span className="font-semibold">Year</span>: {movie?.Year}
                  </h2>
                  <h2>
                    <span className="font-semibold">Runtime</span>:{" "}
                    {movie?.Runtime}.
                  </h2>
                </div>
                <div>
                  {movie?.Ratings &&
                    movie.Ratings.map(rating => {
                      return (
                        <h2 key={uuidv4()}>
                          <span className="font-semibold">
                            {rating?.Source}
                          </span>
                          : {rating?.Value}
                        </h2>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="self-center sm:self-start mt-5 mb-4 flex flex-wrap justify-center space-x-2">
              {listToBubbleRenderer(movie.Genre)}
            </div>
            <h2 className="mb-3 self-center sm:self-start ">
              <span className="font-bold">Actors</span>: {movie?.Actors}
            </h2>

            {movie?.Plot !== "N/A" && (
              <div className="flex flex-col mr-2 space-y-3 sm:space-y-2">
                <h2 className="self-center sm:self-start font-bold text-2xl">
                  Summary
                </h2>
                <p>{movie.Plot}</p>
              </div>
            )}

            <div className="mt-4 mr-2 space-y-2">
            </div>
          </div>
        </div>
      </div>
      <RecommendedMovies />
    </>
  );
};

export default MovieIdPage;
