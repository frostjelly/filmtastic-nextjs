import SearchBarMain from "./components/SearchBarMain";

export default function Home() {
  return (
    <main className="">
      <div className="mb-16 flex flex-col justify-center items-center px-4">
        <h1 className="mt-28 mb-2 text-6xl font-bold  flex  flex-col justify-center items-center">
          Filmtastic
        </h1>
        <h2 className="text-2xl flex text-center max-w-2xl w-full justify-center">
          The Movie Search Engine that is Simply Filmtastic
        </h2>
      </div>
      <SearchBarMain />
    </main>
  );
}
